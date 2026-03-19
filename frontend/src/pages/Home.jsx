import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, ArrowRight, Map, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-[1.02]"
        style={{ backgroundImage: `url('/indian_farmer_bg.png')` }}
      />
      {/* Gradient Mask */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-950/95 via-gray-950/60 to-gray-950/95 backdrop-blur-[1px]" />

      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-crop-500/30 rounded-full blur-[100px] z-0 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] z-0 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 text-center max-w-4xl w-full"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="bg-gradient-to-br from-crop-400 to-crop-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.4)]">
            <Leaf size={32} className="text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 px-4">
          CropWise <span className="text-transparent bg-clip-text bg-gradient-to-r from-crop-400 to-crop-600">Copilot</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-400 mb-12 sm:mb-16 leading-relaxed max-w-2xl mx-auto px-4">
          Your intelligent agricultural assistant. Get real-time weather, market insights, and state-wise crop guidance powered by advanced AI.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4 w-full max-w-3xl mx-auto">
          <Link to="/app" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-crop-600 to-crop-500 hover:to-crop-400 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-crop-500/30 hover:-translate-y-1">
            Get Started <ArrowRight size={20} />
          </Link>
          
          <Link to="/states" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 sm:px-8 sm:py-5 bg-gray-900 border border-gray-700 hover:border-crop-500/50 text-gray-200 rounded-xl font-bold text-lg transition-all hover:bg-gray-800 focus:ring-2 focus:ring-emerald-500/50">
            <Map size={24} className="text-emerald-400" /> State Crop Info
          </Link>
          
          <Link to="/about" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 sm:px-8 sm:py-5 bg-gray-900 border border-gray-700 hover:border-crop-500/50 text-gray-200 rounded-xl font-bold text-lg transition-all hover:bg-gray-800 focus:ring-2 focus:ring-blue-500/50">
            <Info size={24} className="text-blue-400" /> About & Steps
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
