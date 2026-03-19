import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, CheckCircle, MessageSquare, Mic, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-6 sm:p-12">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-crop-400 hover:text-crop-300 transition-colors mb-8 font-medium">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
          
          <section className="bg-gray-900 border border-gray-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-crop-400 to-crop-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 flex items-center gap-4">
              <BookOpen className="text-crop-500" size={36} /> About CropWise
            </h1>
            <p className="text-gray-400 leading-relaxed text-lg">
              CropWise Copilot is a next-generation AI agricultural assistant designed to help farmers maximize their yield, prevent crop diseases, and stay updated with the latest government schemes in their desired local language.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">How to Use CropWise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl hover:border-crop-500/30 transition-colors">
                <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mb-4">
                  <MessageSquare size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">1. Ask Questions</h3>
                <p className="text-gray-400 text-sm">Type your farming queries directly into the chat interface just like you would with ChatGPT. Get instant expert advice.</p>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl hover:border-crop-500/30 transition-colors">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center mb-4">
                  <Mic size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">2. Voice Typing</h3>
                <p className="text-gray-400 text-sm">Tap the microphone icon to quickly dictate your questions hands-free while you work in the fields.</p>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl hover:border-crop-500/30 transition-colors">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-4">
                  <Globe size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">3. Change Language</h3>
                <p className="text-gray-400 text-sm">Click the 🌐 Language button to instantly translate the entire dashboard and AI responses into Hindi, Punjabi, or Urdu.</p>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl hover:border-crop-500/30 transition-colors">
                <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">4. State Crop Info</h3>
                <p className="text-gray-400 text-sm">Use the specialized State Crop Calendar to see exactly what to plant in your specific region each month.</p>
              </div>

            </div>
          </section>

          <div className="flex justify-center mt-8">
            <Link to="/app" className="px-8 py-4 bg-crop-600 hover:bg-crop-500 text-white rounded-xl font-bold text-lg transition-colors shadow-lg shadow-crop-500/20">
              Launch App Now
            </Link>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default About;
