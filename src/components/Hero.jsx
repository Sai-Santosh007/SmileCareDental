import { motion } from 'framer-motion';
import { Phone, MessageCircle, CheckCircle, Star, Heart } from 'lucide-react';
import heroImage from '../assets/hero.jpg';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
    <section id="home" className="relative min-h-screen flex items-center bg-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content — completely unchanged */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Healthy Smiles,
              <span className="text-teal block"> Happy Families</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Family-friendly and affordable dental care in Basavanagudi.
              Gentle care, modern technology, and beautiful smiles for your entire family.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <a
                href="#appointment"
                className="btn-primary flex items-center justify-center space-x-2 group"
              >
                <Phone size={20} />
                <span>Book Appointment</span>
              </a>
              <a
                href="https://wa.me/919014745988?text=Hello,%20I%20would%20like%20to%20book%20a%20dental%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center justify-center space-x-2 group"
              >
                <MessageCircle size={20} />
                <span>Chat on WhatsApp</span>
              </a>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              <div className="flex flex-col items-center lg:items-start space-y-2">
                <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center mb-2">
                  <Star className="text-teal" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900">Experienced Dentists</h3>
                <p className="text-sm text-gray-600">10+ years of expertise</p>
              </div>

              <div className="flex flex-col items-center lg:items-start space-y-2">
                <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center mb-2">
                  <Heart className="text-teal" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900">Advanced Technology</h3>
                <p className="text-sm text-gray-600">Modern dental equipment</p>
              </div>

              <div className="flex flex-col items-center lg:items-start space-y-2">
                <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="text-teal" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900">Affordable & Painless</h3>
                <p className="text-sm text-gray-600">Gentle care for all ages</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image — curved left edge matching the UI design, desktop only */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-end"
          >
            {/* Mint-coloured curved backdrop sitting behind the image */}
            <div
              className="absolute inset-0 bg-soft-mint"
              style={{ borderRadius: '55% 0 0 55% / 50% 0 0 50%', transform: 'scale(1.06)' }}
            />

            {/* Image clipped with the matching curve on the left side */}
            <div
              className="relative w-full overflow-hidden"
              style={{ borderRadius: '55% 0 0 55% / 50% 0 0 50%' }}
            >
              <img
                src={heroImage}
                alt="Dentist examining patient"
                className="w-full object-cover"
                style={{ height: '540px', objectPosition: 'center' }}
              />
            </div>
          </motion.div>

          {/* Mobile fallback — simple rounded card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="block lg:hidden"
          >
            <img
              src={heroImage}
              alt="Dentist examining patient"
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              style={{ maxHeight: '300px' }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;