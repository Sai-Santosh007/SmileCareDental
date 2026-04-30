import { motion } from "framer-motion";
import { Calendar, Clock, User, Mail, Phone, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const AppointmentBooking = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    appointmentDate: "",
    timeSlot: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [tokenNumber, setTokenNumber] = useState("");

  // Initialize EmailJS once when the component mounts
  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!publicKey) {
      console.error("EmailJS public key is missing from .env");
      return;
    }
    emailjs.init(publicKey);
  }, []);

  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ""))) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    if (!formData.appointmentDate) {
      newErrors.appointmentDate = "Appointment date is required";
    } else {
      const selectedDate = new Date(formData.appointmentDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.appointmentDate = "Appointment date cannot be in the past";
      }
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = "Time slot is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // ── Step 1: Send booking to Google Sheet via Apps Script ──
    const scriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL;

    if (!scriptUrl) {
      console.error("Apps Script URL missing from .env");
    } else {
      try {
        const params = new URLSearchParams({
          action: "book",
          name: formData.fullName,
          email: formData.email,
          phone: formData.phoneNumber,
          date: formData.appointmentDate,
          timeSlot: formData.timeSlot,
          type: "Online",
        });

        const scriptResponse = await fetch(`${scriptUrl}?${params.toString()}`);
        const scriptResult = await scriptResponse.json();

        if (!scriptResult.success) {
          // Block submission — duplicate booking, past date, etc.
          alert(scriptResult.message);
          setIsSubmitting(false);
          return;
        }

        // Store token to show on success screen
        setTokenNumber(scriptResult.data?.tokenNumber || "");

      } catch (scriptError) {
        console.error("Apps Script error:", scriptError);
        // Don't block — fall through to EmailJS even if sheet write fails
      }
    }

    // ── Step 2: Send confirmation emails via EmailJS ──
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS credentials are not configured in .env");
      }

      const emailData = {
        to_name: formData.fullName,
        to_email: formData.email,
        phone: formData.phoneNumber,
        date: formData.appointmentDate,
        time: formData.timeSlot,
        from_name: "Smile Care Dental",
        clinic_phone: "+919014745988",
        clinic_address: "Door No: 23-4-355, Basavanagudi, Bengaluru, 560004",
      };

      // Send confirmation email to patient
      const patientResponse = await emailjs.send(
        serviceId,
        templateId,
        emailData,
        publicKey,
      );
      console.log("Patient email sent successfully:", patientResponse);

      // Send notification email to clinic
      const clinicTemplateId = import.meta.env.VITE_EMAILJS_CLINIC_TEMPLATE_ID;

      if (!clinicTemplateId) {
        console.error("Clinic template ID missing");
      } else {
        const clinicData = {
          patient_name: formData.fullName,
          patient_email: formData.email,
          patient_phone: formData.phoneNumber,
          appointment_date: formData.appointmentDate,
          appointment_time: formData.timeSlot,
        };

        try {
          const clinicResponse = await emailjs.send(
            serviceId,
            clinicTemplateId,
            clinicData,
            publicKey,
          );
          console.log("Clinic email sent:", clinicResponse);
        } catch (err) {
          console.error("Clinic email failed:", err);
        }
      }

      setIsSubmitted(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          appointmentDate: "",
          timeSlot: "",
        });
        setIsSubmitted(false);
        setTokenNumber("");
      }, 5000);

    } catch (error) {
      console.error("Error sending email:", error);

      if (error.status === 400) {
        alert(
          "Invalid email configuration. Please contact the clinic directly at +91 9014745988.",
        );
      } else if (error.status === 401 || error.status === 403) {
        alert(
          "Email service authentication failed. Please contact the clinic directly at +91 9014745988.",
        );
      } else {
        alert(
          "Unable to send confirmation email. Please call us at +91 9014745988 to confirm your appointment.",
        );
      }
      // Do NOT setIsSubmitted(true) here — only show success on real success
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  if (isSubmitted) {
    return (
      <section id="appointment" className="py-20 bg-soft-mint">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-500" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Appointment Booked Successfully!
            </h3>
            <p className="text-gray-600 mb-6">
              Thank you for booking with Smile Care Dental. We've sent a
              confirmation email to <strong>{formData.email}</strong>.
            </p>
            <div className="bg-soft-mint rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700 mb-3">
                <strong>Date:</strong> {formData.appointmentDate}
                <br />
                <strong>Time:</strong> {formData.timeSlot}
                <br />
                <strong>Phone:</strong> {formData.phoneNumber}
              </p>
              {tokenNumber && (
                <p className="text-sm font-bold text-teal mt-2">
                  Your Token Number: #{tokenNumber}
                </p>
              )}
              <p className="text-sm text-gray-600">
                Please arrive 10 minutes before your appointment time.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="appointment" className="py-20 bg-soft-mint">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            BOOK <span className="text-teal">APPOINTMENT</span>
          </h2>
          <p className="text-lg text-gray-600">We're Here to Help You Smile.</p>
        </motion.div>

        {/* Appointment Form */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300 ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your email address"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </motion.div>

            {/* Phone Number */}
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300 ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your 10-digit phone number"
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </motion.div>

            {/* Appointment Date */}
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 font-medium mb-2">
                Appointment Date *
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300 ${
                    errors.appointmentDate
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
              </div>
              {errors.appointmentDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.appointmentDate}
                </p>
              )}
            </motion.div>

            {/* Time Slot */}
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 font-medium mb-2">
                Preferred Time Slot *
              </label>
              <div className="relative">
                <Clock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-300 appearance-none ${
                    errors.timeSlot ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
              {errors.timeSlot && (
                <p className="text-red-500 text-sm mt-1">{errors.timeSlot}</p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Booking...</span>
                  </>
                ) : (
                  <>
                    <Calendar size={20} />
                    <span>Book Appointment</span>
                  </>
                )}
              </button>
            </motion.div>
          </form>

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="mt-8 p-4 bg-soft-mint rounded-lg"
          >
            <p className="text-sm text-gray-600 text-center">
              <strong>Need help?</strong> Call us at{" "}
              <a
                href="tel:+919014745988"
                className="text-teal-600 font-medium hover:underline"
              >
                +91 9014745988
              </a>{" "}
              or WhatsApp us for quick assistance.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppointmentBooking;