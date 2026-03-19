import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Landmark, Search, ExternalLink, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ACTIVE_SCHEMES, UPCOMING_SCHEMES } from '../data/schemeData';

const Schemes = () => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('active');

  const currentDataset = activeTab === 'active' ? ACTIVE_SCHEMES : UPCOMING_SCHEMES;
  const themeColor = activeTab === 'active' ? 'amber' : 'blue';

  const filtered = currentDataset.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.description.toLowerCase().includes(search.toLowerCase()) ||
    s.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-4 sm:p-12 relative overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        
        <Link to="/" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors mb-8 sm:mb-12 font-medium">
          <ArrowLeft size={20} /> Back to Dashboard
        </Link>

        {/* Header & Search */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white flex items-center gap-3 tracking-tight mb-4">
              <Landmark className="text-amber-500 shrink-0" size={40} /> Government Schemes
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">
              Explore the complete directory of financial support, crop insurance, and agricultural subsidies. Track upcoming digital initiatives!
            </p>
          </div>
          <div className="relative w-full lg:w-96 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="text" 
              placeholder={`Search ${activeTab} schemes...`} 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full bg-gray-900 border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-white text-base focus:outline-none focus:border-${themeColor}-500 transition-colors shadow-lg`}
            />
          </div>
        </div>

        {/* Toggle Tabs */}
        <div className="flex flex-wrap gap-4 mb-10 border-b border-gray-800 pb-4">
          <button 
            onClick={() => { setActiveTab('active'); setSearch(''); }}
            className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
              activeTab === 'active' 
              ? 'bg-amber-500 text-gray-900 shadow-[0_0_20px_rgba(245,158,11,0.4)]' 
              : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <Landmark size={18} /> Active Standard Schemes
          </button>
          <button 
            onClick={() => { setActiveTab('upcoming'); setSearch(''); }}
            className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
              activeTab === 'upcoming' 
              ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' 
              : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <Clock size={18} /> Upcoming Digital Initiatives
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filtered.map((scheme, i) => (
              <motion.div 
                key={scheme.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden hover:border-${themeColor}-500/50 transition-all hover:shadow-2xl hover:shadow-${themeColor}-500/10 flex flex-col group relative`}
              >
                <div className="p-6 sm:p-8 flex-1 flex flex-col z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 bg-${themeColor}-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      {activeTab === 'active' ? <Landmark className="text-amber-400" size={28} /> : <Clock className="text-blue-400" size={28} />}
                    </div>
                    <span className={`bg-${themeColor}-900/40 text-${themeColor}-400 text-xs px-3 py-1 font-bold rounded-lg border border-${themeColor}-800/50 flex items-center gap-1 uppercase tracking-wider`}>
                      <Tag size={12} /> {scheme.tag}
                    </span>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                    {scheme.name}
                  </h2>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 flex-1">
                    {scheme.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="bg-gray-950 p-4 rounded-xl border border-gray-800/80 hover:border-gray-700 transition-colors">
                      <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Target Benefit</div>
                      <div className={`text-${themeColor === 'amber' ? 'emerald' : 'cyan'}-400 font-bold text-sm sm:text-base leading-snug`}>
                        {scheme.benefit}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-950 p-4 rounded-xl border border-gray-800/80 hover:border-gray-700 transition-colors">
                        <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Eligibility</div>
                        <div className="text-gray-300 text-xs sm:text-sm line-clamp-3">{scheme.eligibility}</div>
                      </div>
                      
                      {activeTab === 'upcoming' && (
                        <div className="bg-blue-950/20 p-4 rounded-xl border border-blue-900/30 group-hover:border-blue-500/50 transition-colors">
                          <div className="text-xs text-blue-500/70 uppercase tracking-wider font-bold mb-1">Expected Launch</div>
                          <div className="text-blue-300 font-bold text-sm flex items-center gap-2">
                             <Clock size={16} /> {scheme.expectedLaunch}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {activeTab === 'active' ? (
                    <a 
                      href={scheme.applyLink} 
                      target="_blank" 
                      rel="noreferrer"
                      className="mt-auto w-full py-4 rounded-xl bg-gray-800 border border-gray-700 hover:bg-amber-600 hover:border-amber-500 text-white font-bold transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                    >
                      Apply / Portal Details <ExternalLink size={18} />
                    </a>
                  ) : (
                    <button 
                      disabled
                      className="mt-auto w-full py-4 rounded-xl bg-blue-900/30 border border-blue-800/50 text-blue-400 font-bold flex items-center justify-center gap-2 cursor-not-allowed uppercase tracking-wider text-sm"
                    >
                      Awaiting Official Launch
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="col-span-full absolute inset-0 text-center flex items-center justify-center h-full min-h-[400px] w-full bg-gray-900/50 border border-dashed border-gray-800 rounded-3xl text-gray-400 text-lg">
               No {activeTab} schemes match your search criteria "{search}".
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Schemes;
