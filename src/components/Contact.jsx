import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9014745988',
      action: 'tel:+919014745988',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@smilecaredental.com',
      action: 'mailto:info@smilecaredental.com',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Clock,
      label: 'Hours',
      value: 'Mon-Sat: 9AM-6PM',
      action: null,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Door No: 23-4-355, Basavanagudi, Bengaluru, 560004',
      action: null,
      color: 'bg-red-100 text-red-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            GET IN <span className="text-teal">TOUCH</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Visit our clinic or reach out to us. We're here to help you achieve your perfect smile.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Contact Information
            </h3>

            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className={`w-12 h-12 ${info.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <info.icon size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{info.label}</h4>
                  {info.action ? (
                    <a
                      href={info.action}
                      className="text-teal hover:underline transition-colors duration-300"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-gray-600">{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Quick Contact Buttons */}
            <div className="pt-6 space-y-3">
              <a
                href="tel:+919014745988"
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <Phone size={20} />
                <span>Call Us Now</span>
              </a>
              <a
                href="https://wa.me/919014745988?text=Hello,%20I%20would%20like%20to%20book%20a%20dental%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-secondary flex items-center justify-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Additional Info */}
            <div className="bg-soft-mint rounded-xl p-6 mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Emergency Care</h4>
              <p className="text-gray-600 mb-3">
                For dental emergencies, we offer same-day appointments. Call us immediately if you experience:
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  Severe tooth pain or swelling
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  Knocked out or broken tooth
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  Lost filling or crown
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  Bleeding gums or injury
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Find Us on Map
            </h3>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-96 lg:h-full min-h-[400px]">
                {/* Google Map Embed */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7353188584!2d77.5684!3d12.9385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU2JzE4LjYiTiA3N8KwMzQnMDguMiJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                  title="Smile Care Dental Location"
                />
                
                {/* Map Overlay with Clinic Info */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs">
                  <h4 className="font-semibold text-gray-900 mb-2">Smile Care Dental</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Door No: 23-4-355, Basavanagudi
                  </p>
                  <div className="flex items-center text-teal text-sm">
                    <MapPin size={14} className="mr-1" />
                    <span>Bengaluru, Karnataka 560004</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Directions */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-3">Getting Here</h4>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start">
                  <span className="text-teal mr-2 mt-1">🚗</span>
                  <div>
                    <strong>By Car:</strong> Parking available on premises. 
                    Located near Basavanagudi Main Road.
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-teal mr-2 mt-1">🚌</span>
                  <div>
                    <strong>By Bus:</strong> Nearest bus stop is Basavanagudi Bus Stand (5 min walk).
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-teal mr-2 mt-1">🚆</span>
                  <div>
                    <strong>By Metro:</strong> Nearest metro station is Jayanagar (10 min auto ride).
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
