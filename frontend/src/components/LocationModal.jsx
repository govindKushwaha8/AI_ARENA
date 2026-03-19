import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, MapPin } from 'lucide-react';
import { MOCK_HELP_CENTERS } from '../data/kvkData';

const LocationModal = ({ onClose, activeLang }) => {
  const [centerSearch, setCenterSearch] = useState('');
  const filteredCenters = MOCK_HELP_CENTERS.filter(c => 
    c.name.toLowerCase().includes(centerSearch.toLowerCase()) || 
    c.specialty.toLowerCase().includes(centerSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl max-h-[90vh] bg-gray-950 border border-gray-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10"
      >
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <MapPin className="text-rose-500" size={28} /> Agricultural Help Centers
          </h2>
          <button onClick={onClose} className="p-2 bg-gray-800 hover:bg-rose-500/20 hover:text-rose-400 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8">
          


          {/* Help Centers Section */}
          <section>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                   Local Help Centers (KVKs)
                </h3>
                <p className="text-gray-400 text-sm mt-1">Showing {MOCK_HELP_CENTERS.length} agricultural help centers in your region.</p>
              </div>
              <div className="relative w-full sm:w-64 shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Filter by specialty..." 
                  value={centerSearch}
                  onChange={e => setCenterSearch(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
              {filteredCenters.map(center => (
                <div key={center.id} className="bg-gray-900 border border-gray-800 p-5 rounded-2xl hover:border-rose-500/30 transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-200 group-hover:text-rose-400 transition-colors">{center.name}</h4>
                    <span className="text-xs bg-gray-950 text-gray-400 px-2 py-1 rounded-lg border border-gray-800 whitespace-nowrap ml-2">{center.distance}</span>
                  </div>
                  <div className="text-sm text-gray-400 mb-3">Officer: <span className="text-gray-300">{center.officer}</span></div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="bg-emerald-900/30 text-emerald-400 text-xs px-3 py-1.5 rounded-lg border border-emerald-800/50">
                      {center.specialty}
                    </span>
                    <button className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg transition-colors">
                      {center.phone}
                    </button>
                  </div>
                </div>
              ))}
              {filteredCenters.length === 0 && <div className="col-span-1 xl:col-span-2 text-center text-gray-500 py-10">No help centers match your filter.</div>}
            </div>
          </section>

        </div>
      </motion.div>
    </div>
  );
};

export default LocationModal;
