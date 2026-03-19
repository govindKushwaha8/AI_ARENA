import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Search, CloudRain, Sun, Wind, Thermometer, Droplets, MapPin } from 'lucide-react';
import { getWeather } from '../services/api';
import { DISTRICTS } from '../data/kvkData';

const WeatherModal = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [districtSearch, setDistrictSearch] = useState('');

  const handleSearchWeather = async (searchTerm) => {
    const term = typeof searchTerm === 'string' ? searchTerm : query;
    if (!term.trim()) return;
    
    setQuery(term);
    setLoadingWeather(true);
    setWeather(null);
    try {
      const data = await getWeather(term);
      if (!data.error) {
        setWeather(data);
      } else {
        alert("Could not find weather for this location.");
      }
    } catch (e) {
      console.error(e);
    }
    setLoadingWeather(false);
  };

  const filteredDistricts = DISTRICTS.filter(d => d.toLowerCase().includes(districtSearch.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl max-h-[90vh] bg-gray-950 border border-gray-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10"
      >
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/50 shrink-0">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <CloudRain className="text-blue-400" size={28} /> Real-time Weather Update
          </h2>
          <button onClick={onClose} className="p-2 bg-gray-800 hover:bg-rose-500/20 hover:text-rose-400 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <section className="bg-gradient-to-br from-gray-900 to-gray-800/50 p-6 rounded-3xl border border-gray-800">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input 
                type="text" 
                placeholder="Enter city name or select from list..." 
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearchWeather()}
                className="flex-1 bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
               />
              <button 
                onClick={handleSearchWeather}
                disabled={loadingWeather}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {loadingWeather ? 'Searching...' : <><Search size={18} /> Search</>}
              </button>
            </div>

            {weather && (
              <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-gray-950/50 p-4 rounded-2xl border border-gray-800 flex flex-col items-center justify-center text-center hover:border-blue-500/30 transition-colors">
                  <Thermometer className="text-orange-400 mb-2" size={28} />
                  <div className="text-2xl font-bold text-white">{weather.temperature}°C</div>
                  <div className="text-xs text-gray-400">Temperature</div>
                </div>
                <div className="bg-gray-950/50 p-4 rounded-2xl border border-gray-800 flex flex-col items-center justify-center text-center hover:border-blue-500/30 transition-colors">
                  <Droplets className="text-blue-400 mb-2" size={28} />
                  <div className="text-2xl font-bold text-white">{weather.humidity}%</div>
                  <div className="text-xs text-gray-400">Humidity</div>
                </div>
                <div className="bg-gray-950/50 p-4 rounded-2xl border border-gray-800 flex flex-col items-center justify-center text-center hover:border-blue-500/30 transition-colors">
                  <Wind className="text-teal-400 mb-2" size={28} />
                  <div className="text-2xl font-bold text-white">{weather.windSpeed || '--'} m/s</div>
                  <div className="text-xs text-gray-400">Wind Speed</div>
                </div>
                <div className="bg-gray-950/50 p-4 rounded-2xl border border-gray-800 flex flex-col items-center justify-center text-center hover:border-blue-500/30 transition-colors">
                  <Sun className="text-yellow-400 mb-2" size={28} />
                  <div className="text-xl font-bold text-white capitalize">{weather.condition}</div>
                  <div className="text-xs text-gray-400">Condition</div>
                </div>
              </motion.div>
            )}
            {!weather && !loadingWeather && <div className="text-gray-500 text-center py-4 text-sm sm:text-base">Select a location below or search to fetch real-time weather details.</div>}
          </section>

          <section>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                   Available Districts
                </h3>
                <p className="text-gray-400 text-sm mt-1">Showing all 100 regional districts across UP & Delhi.</p>
              </div>
              <div className="relative w-full sm:w-64 shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Filter locations..." 
                  value={districtSearch}
                  onChange={e => setDistrictSearch(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
              {filteredDistricts.map((dist, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSearchWeather(dist.replace(" II", ""))}
                  className="bg-gray-900 border border-gray-800 p-3 rounded-xl hover:border-blue-500/50 hover:bg-gray-800 transition-all group text-left flex items-center gap-2"
                >
                  <MapPin className="text-gray-500 group-hover:text-blue-400 shrink-0" size={16} />
                  <span className="font-semibold text-gray-300 group-hover:text-white truncate">{dist}</span>
                </button>
              ))}
              {filteredDistricts.length === 0 && <div className="col-span-full text-center text-gray-500 py-10">No locations match your filter.</div>}
            </div>
          </section>

        </div>
      </motion.div>
    </div>
  );
};

export default WeatherModal;
