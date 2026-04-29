import { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Safe scroll handler with error checking
    const handleScroll = () => {
      try {
        setIsScrolled(window.scrollY > 20);
      } catch (error) {
        console.error('Scroll error:', error);
      }
    };
    
    // Check if window is available (SSR safety)
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Doctors', href: '#doctors' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-teal">
              Smile Care <span className="text-gray-800">DENTAL</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-teal transition-colors duration-200 font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+919014745988"
              className="flex items-center space-x-2 btn-primary"
            >
              <Phone size={18} />
              <span className="font-medium">9014745988</span>
            </a>
            <a
              href="#appointment"
              className="flex items-center space-x-2 btn-secondary"
            >
              <Calendar size={18} />
              <span className="font-medium">Book Now</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-teal transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block px-3 py-2 text-gray-700 hover:text-teal hover:bg-soft-mint rounded-md transition-all duration-200 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-4 pb-2 space-y-2">
                  <a
                    href="tel:+919014745988"
                    className="flex items-center justify-center space-x-2 btn-primary"
                  >
                    <Phone size={18} />
                    <span className="font-medium">9014745988</span>
                  </a>
                  <a
                    href="#appointment"
                    className="flex items-center justify-center space-x-2 btn-secondary"
                  >
                    <Calendar size={18} />
                    <span className="font-medium">Book Now</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
