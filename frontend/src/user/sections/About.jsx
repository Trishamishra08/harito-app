import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// About section mimicking the visual style of the login page.
// It uses a full‑screen background image with a dark overlay, a glass‑morphism
// content box, Inter font, and a subtle entrance animation.

const About = () => {
  return (
    <section className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/about-bg.jpg')" }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative h-full flex items-center justify-center px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 max-w-2xl w-full"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 capitalize">
            About Harito
          </h1>
          <p className="text-gray-800 text-base md:text-lg leading-relaxed mb-6">
            Harito is a premium agricultural solutions platform that connects farmers, 
            agronomists, and distributors. Our mission is to empower growers with 
            data‑driven insights, sustainable practices, and a seamless marketplace.
          </p>
          <Link
            to="/about"
            className="inline-block bg-green-600 hover:bg-white hover:text-green-800 text-white transition-all px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider shadow-md"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
