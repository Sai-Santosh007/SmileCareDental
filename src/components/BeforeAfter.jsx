import { motion } from 'framer-motion';
import whiteningImg from '../assets/whitening.jpg';
import bracesImg from '../assets/braces_transformation.png';
import implantsImg from '../assets/implant.jpg';
import smileImg from '../assets/smile.jpg';
import veneersImg from '../assets/veeners.png';
import gumImg from '../assets/gum.jpg';

const whitening = whiteningImg;
const braces = bracesImg;
const implants = implantsImg;
const smile = smileImg;
const veneers = veneersImg;
const gum = gumImg;

const BeforeAfter = () => {
  const transformations = [
    {
      id: 1,
      title: 'Teeth Whitening',
      image: whitening,
      description: 'Professional teeth whitening treatment',
    },
    {
      id: 2,
      title: 'Braces Transformation',
      image: braces,
      description: 'Complete orthodontic treatment',
    },
    {
      id: 3,
      title: 'Dental Implants',
      image: implants,
      description: 'Missing tooth replacement',
    },
    {
      id: 4,
      title: 'Smile Makeover',
      image: smile,
      description: 'Complete smile transformation',
    },
    {
      id: 5,
      title: 'Veneers',
      image: veneers,
      description: 'Porcelain veneers application',
    },
    {
      id: 6,
      title: 'Gum Contouring',
      image: gum,
      description: 'Gum reshaping treatment',
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
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            BEFORE & <span className="text-teal">AFTER</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real Transformations, Real Results. See the amazing changes we've made to our patients' smiles.
          </p>
        </motion.div>

        {/* Transformations Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {transformations.map((transformation) => (
            <motion.div
              key={transformation.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
                {/* Single Composite Image */}
                <img
                  src={transformation.image}
                  alt={transformation.title}
                  className="w-full object-cover"
                />

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {transformation.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {transformation.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default BeforeAfter;