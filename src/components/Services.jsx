import { motion } from 'framer-motion';
import { Sparkles, Heart, Activity, Zap, Star } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Sparkles,
      title: 'Teeth Cleaning',
      description: 'Professional dental cleaning to remove plaque, tartar, and stains for a brighter, healthier smile.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Heart,
      title: 'Braces',
      description: 'Orthodontic treatment to straighten teeth and correct bite issues for a perfect smile.',
      color: 'bg-pink-100 text-pink-600',
    },
    {
      icon: Activity,
      title: 'Root Canal',
      description: 'Pain-free root canal therapy to save infected teeth and relieve dental pain.',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: Zap,
      title: 'Implants',
      description: 'Permanent tooth replacement solution that looks, feels, and functions like natural teeth.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Star,
      title: 'Whitening',
      description: 'Advanced teeth whitening treatments to remove stains and achieve a dazzling white smile.',
      color: 'bg-yellow-100 text-yellow-600',
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
    <section id="services" className="py-20 bg-white">
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
            OUR <span className="text-teal">SERVICES</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive Dental Care for Every Smile. From routine check-ups to advanced procedures, 
            we offer complete dental solutions under one roof.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl shadow-lg p-8 card-hover group relative overflow-hidden"
            >
              {/* Icon */}
              <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6`}>
                <service.icon size={32} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>

              {/* Hover effect decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Services;
