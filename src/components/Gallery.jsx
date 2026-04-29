import { motion } from 'framer-motion';
import { useState } from 'react';
import { X, Maximize2, ArrowLeft, ArrowRight, Image as ImageIcon } from 'lucide-react';
import reception from '../assets/reception.png';
import treatment from '../assets/treatment.png';
import equipment from '../assets/equipment.png';
import happypatients from '../assets/happypatients.png';
import whitening from '../assets/whitening.jpg';
import sterilization from '../assets/sterlization.png';
import xray from '../assets/xray.png';
import consult from '../assets/consult.png';
import braces from '../assets/braces_transformation.png';
import kidsdental from '../assets/kidental.png';
import implant from '../assets/implantpr.png';
import team from '../assets/team.dr.png';
const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = [
  {
    id: 1,
    src: reception,
    title: 'Modern Reception Area',
    category: 'Clinic Interior',
  },
  {
    id: 2,
    src: treatment,
    title: 'Dental Treatment Room',
    category: 'Clinic Interior',
  },
  {
    id: 3,
    src: equipment,
    title: 'Advanced Dental Equipment',
    category: 'Technology',
  },
  {
    id: 4,
    src: happypatients,
    title: 'Happy Patient',
    category: 'Patients',
  },
  {
    id: 5,
    src: whitening,
    title: 'Teeth Whitening Result',
    category: 'Treatments',
  },
  {
    id: 6,
    src: sterilization,
    title: 'Sterilization Area',
    category: 'Clinic Interior',
  },
  {
    id: 7,
    src: xray,
    title: 'Digital X-Ray Room',
    category: 'Technology',
  },
  {
    id: 8,
    src: consult,
    title: 'Consultation Room',
    category: 'Clinic Interior',
  },
  {
    id: 9,
    src: braces,
    title: 'Braces Transformation',
    category: 'Treatments',
  },
  {
    id: 10,
    src: kidsdental,
    title: 'Kids Dental Care',
    category: 'Patients',
  },
  {
    id: 11,
    src: implant,
    title: 'Dental Implant Procedure',
    category: 'Treatments',
  },
  {
    id: 12,
    src: team,
    title: 'Team Smile Care',
    category: 'Team',
  },
];

  const openLightbox = (image, index) => {
    try {
      setSelectedImage(image);
      setCurrentIndex(index);
    } catch (error) {
      console.error('Error opening lightbox:', error);
    }
  };

  const closeLightbox = () => {
    try {
      setSelectedImage(null);
    } catch (error) {
      console.error('Error closing lightbox:', error);
    }
  };

  const navigateImage = (direction) => {
    try {
      if (direction === 'next') {
        const nextIndex = (currentIndex + 1) % galleryImages.length;
        setSelectedImage(galleryImages[nextIndex]);
        setCurrentIndex(nextIndex);
      } else {
        const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        setSelectedImage(galleryImages[prevIndex]);
        setCurrentIndex(prevIndex);
      }
    } catch (error) {
      console.error('Error navigating images:', error);
    }
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
    <div className="min-h-screen bg-warm-white">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="text-2xl font-bold text-teal">
              Smile Care <span className="text-gray-800">DENTAL</span>
            </a>
            <a
              href="/"
              className="text-gray-600 hover:text-teal transition-colors duration-300"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-teal">Gallery</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Take a virtual tour of our modern dental clinic and see the smiles we've created.
            </p>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg card-hover"
                onClick={() => openLightbox(image, index)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                    <p className="text-white/80 text-sm">{image.category}</p>
                  </div>
                </div>

                {/* Expand Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="text-gray-800" size={20} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-6xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-300"
            >
              <X size={32} />
            </button>

            {/* Image */}
            <div className="relative">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white font-semibold text-xl mb-1">{selectedImage.title}</h3>
                <p className="text-white/80">{selectedImage.category}</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
            >
              <ArrowLeft size={24} />
            </button>
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
            >
              <ArrowRight size={24} />
            </button>

            {/* Image Counter */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white text-sm">
              {currentIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;
