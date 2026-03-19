import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Map, Calendar, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { STATE_DATA as stateData } from '../data/stateData';

const States = () => {
  const [search, setSearch] = useState('');

  const filtered = stateData.filter(d => d.state.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-4 sm:p-12 relative overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-crop-400 hover:text-crop-300 transition-colors mb-6 font-medium">
              <ArrowLeft size={20} /> Back to Dashboard
            </Link>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white flex items-center gap-4 tracking-tight">
              <Map className="text-crop-500 shrink-0" size={40} /> State Crop Calendar
            </h1>
            <p className="text-gray-400 mt-3 text-lg">Find out what to plant and when, based on your state.</p>
          </div>
          
          <div className="relative w-full md:w-96 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="text" 
              placeholder={`Search ${stateData.length} states...`} 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-crop-500 transition-colors shadow-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((sd, i) => (
              <motion.div 
                key={sd.state}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: (i % 6) * 0.05 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-crop-500/50 transition-all hover:shadow-2xl hover:shadow-crop-500/10 flex flex-col h-full"
              >
                <div className="bg-gray-800/50 px-6 py-4 border-b border-gray-800 flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{sd.state}</h2>
                </div>
                <div className="p-6 space-y-4 flex-1">
                  {sd.crops.map((crop, j) => (
                    <div key={j} className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 border-b border-gray-800/50 pb-5 last:border-0 last:pb-0">
                      <div className="sm:w-32 shrink-0">
                        <div className="text-crop-400 font-extrabold text-xs tracking-widest uppercase mb-1.5">{crop.type} Season</div>
                        <div className="text-gray-400 text-[11px] sm:text-[12px] flex items-center gap-1.5 font-medium"><Calendar size={12}/> {crop.month}</div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                         {crop.items.map(item => (
                           <span key={item} className="bg-gray-950 border border-gray-700 text-gray-200 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm shadow-sm">{item}</span>
                         ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-20 bg-gray-900 border border-dashed border-gray-800 rounded-2xl text-gray-400 text-lg">
              No states found matching "{search}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default States;
