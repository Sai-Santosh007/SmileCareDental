import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  Clock,
  Heart,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Our Doctors', href: '#doctors' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    { name: 'Teeth Cleaning', href: '#services' },
    { name: 'Braces', href: '#services' },
    { name: 'Root Canal', href: '#services' },
    { name: 'Implants', href: '#services' },
    { name: 'Whitening', href: '#services' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: MessageCircle, href: 'https://wa.me/919014745988', label: 'WhatsApp' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* ABOUT */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl font-bold text-teal">
              Smile Care <span className="text-white">DENTAL</span>
            </h3>

            <p className="text-gray-300">
              Your trusted partner for beautiful smiles. We provide gentle,
              affordable, and professional dental care in Basavanagudi.
            </p>

            <div className="flex space-x-3 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal transition"
                >
                  <social.icon size={18} className="text-gray-300" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className="text-gray-300 hover:text-teal">
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-gray-300 hover:text-teal">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* SERVICES */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.name}>
                  <a href={s.href} className="text-gray-300 hover:text-teal">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CONTACT */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>

            <div className="space-y-3 text-gray-300">
              <div className="flex items-start space-x-2">
                <Phone size={16} className="text-teal mt-1" />
                <a href="tel:+919014745988">+91 9014745988</a>
              </div>

              <div className="flex items-start space-x-2">
                <Mail size={16} className="text-teal mt-1" />
                <a href="mailto:info@smilecaredental.com">
                  info@smilecaredental.com
                </a>
              </div>

              <div className="flex items-start space-x-2">
                <MapPin size={16} className="text-teal mt-1" />
                <span>
                  Basavanagudi, Bengaluru <br /> Karnataka 560004
                </span>
              </div>

              <div className="flex items-start space-x-2">
                <Clock size={16} className="text-teal mt-1" />
                <span>Mon-Sat: 9AM - 6PM</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* BOTTOM */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="text-gray-400">
            © {new Date().getFullYear()} Smile Care Dental
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            Made with <Heart size={14} className="text-red-500" /> in Bengaluru
          </div>

          <div className="flex gap-6">
            <Link to="/privacy" className="text-gray-400 hover:text-teal">
              Privacy Policy
            </Link>

            <Link to="/terms" className="text-gray-400 hover:text-teal">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;