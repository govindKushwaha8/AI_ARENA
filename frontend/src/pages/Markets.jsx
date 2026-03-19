import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, TrendingUp, IndianRupee, MapPin, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MARKET_DATA, CROPS_LIST } from '../data/marketData';

const Markets = () => {
  const [selectedCrop, setSelectedCrop] = useState(CROPS_LIST[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCrops = CROPS_LIST.filter(crop => 
    crop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCropData = MARKET_DATA.find(c => c.crop === selectedCrop) || MARKET_DATA[0];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-4 sm:p-12 relative overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        
        <Link to="/" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-8 sm:mb-12 font-medium">
          <ArrowLeft size={20} /> Back to Dashboard
        </Link>

        <div className="mb-10 lg:flex lg:justify-between lg:items-end">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white flex items-center gap-3 sm:gap-4 tracking-tight">
              <TrendingUp className="text-emerald-500 shrink-0" size={40} /> Live Market Rates
            </h1>
            <p className="text-gray-400 mt-3 sm:mt-4 text-base sm:text-lg max-w-2xl leading-relaxed">
              Track current wholesale market prices per quintal across distinct regional districts. Select a crop to view active market quotes.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          
          {/* Sidebar / Crop Selector */}
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search 25+ crops..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-2 max-h-[500px] overflow-y-auto no-scrollbar flex flex-col gap-1">
              {filteredCrops.map((crop) => (
                <button
                  key={crop}
                  onClick={() => setSelectedCrop(crop)}
                  className={`text-left px-4 py-3 rounded-xl transition-all font-semibold flex items-center justify-between group ${
                    selectedCrop === crop 
                    ? 'bg-gradient-to-r from-emerald-600/30 to-teal-600/10 text-emerald-400 border border-emerald-500/50' 
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 border border-transparent'
                  }`}
                >
                  {crop}
                  {selectedCrop === crop && <TrendingUp size={16} className="text-emerald-500" />}
                </button>
              ))}
              {filteredCrops.length === 0 && (
                <div className="text-center p-4 text-gray-500">No crop found.</div>
              )}
            </div>
          </div>

          {/* District Prices Grid */}
          <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-br from-emerald-900/20 to-gray-900 border border-emerald-800/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden flex items-center justify-between">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10" />
              <div>
                <span className="text-emerald-500 font-bold tracking-widest uppercase text-xs sm:text-sm mb-1 block">Active Commodity</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white capitalize">{activeCropData.crop}</h2>
                <div className="text-gray-400 mt-2 flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Live updates across {activeCropData.markets.length} active district markets.
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider block">Average Baseline</span>
                <div className="text-2xl font-bold text-gray-300 flex items-center justify-end">₹{activeCropData.basePrice}<span className="text-base text-gray-600 ml-1">/qtl</span></div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {activeCropData.markets.map((market, idx) => (
                  <motion.div
                    key={`${activeCropData.crop}-${market.district}-${idx}`}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="bg-gray-900 border border-gray-800 p-5 rounded-2xl hover:border-emerald-500/50 transition-colors group relative"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="text-emerald-500/70 group-hover:text-emerald-400 transition-colors" size={20} />
                        <h3 className="font-bold text-gray-200 group-hover:text-white transition-colors">{market.district}</h3>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1 block">Current Price</span>
                      <div className="text-3xl font-bold text-white flex items-center tracking-tight">
                        <IndianRupee className="text-emerald-500 mr-0.5" size={22} />
                        {market.price.toLocaleString('en-IN')}
                        <span className="text-sm font-normal text-gray-500 ml-2">/ qtl</span>
                      </div>
                    </div>

                    {/* Price delta visual indicator compared to baseline */}
                    <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between text-xs">
                      <span className="text-gray-400">vs Avg Base</span>
                      {market.price > activeCropData.basePrice ? (
                        <span className="text-rose-400 bg-rose-400/10 px-2 py-1 rounded-md font-bold text-[10px] uppercase">
                          +₹{market.price - activeCropData.basePrice} 
                        </span>
                      ) : (
                        <span className="text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md font-bold text-[10px] uppercase">
                          -₹{activeCropData.basePrice - market.price} 
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Markets;
