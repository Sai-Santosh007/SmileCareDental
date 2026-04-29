import { motion } from 'framer-motion';
import { Award, Calendar, MapPin, Star } from 'lucide-react';
import doctor2 from '../assets/doctor2.jpg';
import doctor3 from '../assets/doctor3.jpg';

const Doctors = () => {
  const doctors = [
    {
      name: 'Dr. Arjun Reddy',
      experience: '10+ Years Experience',
      qualifications: 'BDS, MDS (Orthodontics)',
      specialization: 'Braces & Alignment',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      rating: 4.9,
    },
    {
      name: 'Dr. Priya Sharma',
      experience: '8+ Years Experience',
      qualifications: 'BDS, MDS (Conservative Dentistry)',
      specialization: 'Restorative Dentistry',
      image: doctor2,
      rating: 4.8,
    },
    {
      name: 'Dr. Nikhil Shetty',
      experience: '12+ Years Experience',
      qualifications: 'BDS, MDS (Oral Surgery)',
      specialization: 'Oral & Maxillofacial Surgery',
      image: doctor3,
      rating: 4.9,
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
    <section id="doctors" className="py-20 bg-soft-mint">
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
            OUR <span className="text-teal">DOCTORS</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet Our Experienced Dentists. Highly qualified professionals dedicated to providing 
            exceptional dental care with compassion and expertise.
          </p>
        </motion.div>

        {/* Doctors Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.name}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover group"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg">
                  <Star className="text-yellow-500 fill-current" size={16} />
                  <span className="text-sm font-semibold text-gray-800">{doctor.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-teal transition-colors duration-300">
                  {doctor.name}
                </h3>
                
                <div className="flex items-center text-teal font-medium mb-3">
                  <Award size={16} className="mr-2" />
                  <span className="text-sm">{doctor.specialization}</span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar size={16} className="mr-2 text-teal" />
                    {doctor.experience}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin size={16} className="mr-2 text-teal" />
                    {doctor.qualifications}
                  </div>
                </div>

                
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Doctors;
