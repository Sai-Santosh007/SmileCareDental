import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useRef } from 'react';

const Testimonials = () => {
  const scrollRef = useRef(null);

  const testimonials = [
    {
      name: 'Ramesh Kumar',
      rating: 5,
      text: 'Excellent dental care! Dr. Arjun Reddy is very professional and the staff is friendly. They made my root canal treatment completely painless.',
      treatment: 'Root Canal Treatment',
    },
    {
      name: 'Priya Nair',
      rating: 5,
      text: 'I got my braces done here and the results are amazing! Dr. Priya Sharma is very supportive throughout the treatment. Highly recommend!',
      treatment: 'Braces',
    },
    {
      name: 'Anand Sharma',
      rating: 5,
      text: 'The clinic is very clean and modern. Dr. Nikhil Shetty performed my implant surgery perfectly. Best dental clinic in Basavanagudi!',
      treatment: 'Dental Implants',
    },
    {
      name: 'Sneha Reddy',
      rating: 5,
      text: 'Amazing experience with teeth whitening. The results exceeded my expectations. The staff is very caring and professional.',
      treatment: 'Teeth Whitening',
    },
    {
      name: 'Mohammed Ali',
      rating: 5,
      text: 'Regular dental checkups for my family. Kids love the friendly atmosphere. Affordable prices and quality treatment.',
      treatment: 'Family Checkup',
    },
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-soft-mint">
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
            WHAT OUR <span className="text-teal">PATIENTS SAY</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real Patients, Real Smiles. Discover why our patients trust us with their dental care.
          </p>
        </motion.div>

        {/* Testimonials Container */}
        <div className="relative">
          {/* Left Scroll Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-300 -translate-x-4 lg:-translate-x-8"
          >
            <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Scroll Button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-300 translate-x-4 lg:translate-x-8"
          >
            <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Testimonials Scroll Container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide space-x-6 pb-4 px-4 lg:px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="flex-none w-80 bg-white rounded-2xl shadow-lg p-6 card-hover"
              >
                {/* Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <Quote className="text-teal/20" size={32} />
                  <div className="flex space-x-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                {/* Patient Info */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-teal font-medium">{testimonial.treatment}</p>
                    </div>
                    <div className="w-12 h-12 bg-soft-mint rounded-full flex items-center justify-center">
                      <span className="text-teal font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-teal mb-2">4.9/5</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal mb-2">500+</div>
            <div className="text-sm text-gray-600">Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal mb-2">98%</div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal mb-2">5 Years</div>
            <div className="text-sm text-gray-600">Google Certified</div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
