import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Is teeth whitening safe?',
      answer: 'Yes, professional teeth whitening is completely safe when performed by qualified dentists. We use FDA-approved whitening agents and take all necessary precautions to protect your gums and enamel. The procedure is painless and provides immediate results.',
    },
    {
      question: 'Does root canal hurt?',
      answer: 'Modern root canal treatment is virtually painless thanks to advanced anesthesia and techniques. Most patients report feeling no more discomfort than getting a simple filling. We use gentle care methods and ensure you\'re comfortable throughout the procedure.',
    },
    {
      question: 'How often should I visit the dentist?',
      answer: 'We recommend visiting every 6 months for regular check-ups and cleanings. However, if you have specific dental issues or are undergoing treatment, we may suggest more frequent visits. Regular check-ups help prevent problems and maintain optimal oral health.',
    },
    {
      question: 'Do you accept walk-ins?',
      answer: 'While we welcome walk-in patients for emergency treatments, we highly recommend booking appointments in advance to ensure availability and minimize waiting time. For dental emergencies, we do our best to accommodate you on the same day.',
    },
    {
      question: 'How long do dental implants last?',
      answer: 'With proper care and maintenance, dental implants can last a lifetime. The success rate is over 95% when placed by experienced professionals. Regular dental visits, good oral hygiene, and avoiding harmful habits will ensure your implants last for decades.',
    },
    {
      question: 'What payment options do you offer?',
      answer: 'We accept cash, credit/debit cards, and offer flexible payment plans. We also work with various insurance providers to make quality dental care affordable for everyone. Our team will help you understand your coverage and payment options.',
    },
    {
      question: 'Is dental treatment safe for children?',
      answer: 'Absolutely! We specialize in pediatric dentistry and create a child-friendly environment. Our dentists are trained to handle children\'s dental needs with gentle care and patience, making dental visits a positive experience for kids.',
    },
    {
      question: 'How can I prevent dental problems?',
      answer: 'Prevention is key to good oral health. Brush twice daily, floss regularly, limit sugary foods, drink plenty of water, and visit us every 6 months for check-ups. We\'ll also provide personalized advice based on your specific dental needs.',
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 bg-soft-mint rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="text-teal" size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            FREQUENTLY ASKED <span className="text-teal">QUESTIONS</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about dental treatments and our services.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-soft-mint/50 transition-colors duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <div
                  className={`flex-shrink-0 w-8 h-8 bg-teal/10 rounded-full flex items-center justify-center transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  <ChevronDown className="text-teal" size={20} />
                </div>
              </button>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: activeIndex === index ? 'auto' : 0,
                  opacity: activeIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-soft-mint rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our friendly team is here to help. Feel free to reach out with any concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919014745988"
                className="btn-primary inline-flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call Us</span>
              </a>
              <a
                href="https://wa.me/919014745988?text=Hello,%20I%20have%20a%20question%20about%20dental%20treatment."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
