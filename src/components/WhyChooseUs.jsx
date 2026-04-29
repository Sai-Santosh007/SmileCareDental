import { motion } from 'framer-motion';
import { Heart, Shield, DollarSign, Users, CheckCircle } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Heart,
      title: 'Patient Comfort First',
      description: 'We prioritize your comfort with gentle care techniques and a relaxing environment.',
      color: 'bg-pink-100 text-pink-600',
    },
    {
      icon: Shield,
      title: 'Hygienic & Safe Environment',
      description: 'Strict sterilization protocols and COVID-19 safety measures for your protection.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: DollarSign,
      title: 'Affordable Treatment',
      description: 'Transparent pricing and flexible payment options for quality dental care.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Users,
      title: 'Personalized Care',
      description: 'Customized treatment plans tailored to your unique dental needs.',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              WHY <span className="text-teal">CHOOSE US</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Care You Can Count On.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              At Smile Care Dental, we combine expertise with compassion to deliver exceptional dental care. 
              Our commitment to excellence and patient satisfaction has made us a trusted choice for families 
              in Basavanagudi and beyond.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-4 bg-soft-mint rounded-xl">
                <div className="text-3xl font-bold text-teal mb-1">5000+</div>
                <div className="text-sm text-gray-600">Happy Patients</div>
              </div>
              <div className="text-center p-4 bg-soft-mint rounded-xl">
                <div className="text-3xl font-bold text-teal mb-1">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-teal" size={20} />
                <span className="text-gray-700">ISO Certified Dental Clinic</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-teal" size={20} />
                <span className="text-gray-700">Digital X-Ray Technology</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-teal" size={20} />
                <span className="text-gray-700">Pain-Free Treatment Guarantee</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Reasons Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-2xl shadow-lg card-hover text-center group"
              >
                <div className={`w-16 h-16 ${reason.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <reason.icon size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
