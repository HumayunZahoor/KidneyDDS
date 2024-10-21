import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from './DentalImage/kidney.jpg';

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-4"> {/* Changed background color to light gray */}
      <motion.div
        initial={{ opacity: 0, translateY: -50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto flex flex-col md:flex-row items-center justify-center py-12"
      >
        <div className="md:w-1/2 flex justify-center"> {/* Keeping image on the left */}
          <motion.img
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            src={logo}
            alt="Kidney disease detection"
            className="rounded-lg shadow-xl h-48 md:h-64 lg:h-80"
          />
        </div>
        <div className="flex flex-col md:w-1/2 items-center md:items-start text-center md:text-left mb-8 md:mb-0 text-gray-800"> {/* Keeping text on the right and changing text color to black */}
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            KIDNEY <span className="text-gray-900">DISEASE</span> DETECTION SYSTEM
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
          "Optimal kidney health is vital for overall well-being. Our thorough evaluations ensure your kidneys remain robust and resilient!"
          </p>
          <div className="flex space-x-4">
            <Link
              to="/Doctor"
              className="btn bg-gray-300 hover:bg-gray-400 text-gray-900 px-8 py-4 rounded-full transition duration-300"
            >
              For Admin
            </Link>
            <Link
              to="/Patient"
              className="btn bg-gray-300 hover:bg-gray-400 text-gray-900 px-8 py-4 rounded-full transition duration-300"
            >
              For User
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
