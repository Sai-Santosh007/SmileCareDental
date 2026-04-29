import { motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

const WhatsAppButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsAppClick = () => {
    try {
      const phoneNumber = '919014745988';
      const message = encodeURIComponent('Hello, I would like to book a dental appointment.');
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      
      // Safe window open with fallback
      if (typeof window !== 'undefined') {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      console.error('WhatsApp link error:', error);
      // Fallback: copy phone number to clipboard
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText('+919014745988');
        alert('Phone number copied to clipboard: +919014745988');
      }
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Message */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="absolute bottom-20 right-0 bg-white rounded-lg shadow-xl p-4 mb-4 w-64"
        >
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle className="text-green-600" size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">Chat with us!</h4>
              <p className="text-sm text-gray-600 mb-3">
                Have questions? Need to book an appointment? We're here to help!
              </p>
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 text-sm font-medium"
              >
                Start Chat
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* WhatsApp Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative"
      >
        {/* Pulse Animation */}
        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
        
        {/* Main Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleExpanded}
          className="relative bg-green-500 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        >
          {isExpanded ? (
            <X size={24} />
          ) : (
            <>
              <MessageCircle size={24} />
              {/* Notification Dot */}
              <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
            </>
          )}
        </motion.button>

        {/* Hover Tooltip */}
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Chat on WhatsApp
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-800 border-y-4 border-y-transparent"></div>
          </motion.div>
        )}
      </motion.div>

      {/* Quick Actions (when expanded) */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-24 right-0 space-y-2"
        >
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleWhatsAppClick}
            className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-medium whitespace-nowrap flex items-center space-x-2"
          >
            <span>🦷</span>
            <span>Book Appointment</span>
          </motion.button>
          
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              const phoneNumber = '919014745988';
              const message = encodeURIComponent('Hello, I have a question about dental treatment.');
              const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
              window.open(whatsappUrl, '_blank');
            }}
            className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-medium whitespace-nowrap flex items-center space-x-2"
          >
            <span>❓</span>
            <span>Ask Question</span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default WhatsAppButton;
