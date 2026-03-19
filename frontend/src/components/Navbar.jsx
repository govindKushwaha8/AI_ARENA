import React, { useState } from 'react';
import { MapPin, TrendingUp, Landmark, HelpCircle, ArrowLeft, CloudRain } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { translations } from '../utils/translations';
import LocationModal from './LocationModal';
import WeatherModal from './WeatherModal';

const Navbar = ({ onHelpToggle, activeLang }) => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const t = translations[activeLang]?.navbar || translations.en.navbar;

  return (
    <>
      <nav className="fixed top-0 w-full z-40 bg-gray-950/80 backdrop-blur-md border-b border-gray-800 text-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {!isHome && (
              <Link to="/" className="p-2 rounded-xl bg-gray-900 hover:bg-gray-800 transition-colors text-gray-400 hover:text-white shrink-0">
                <ArrowLeft size={20} />
              </Link>
            )}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="bg-gradient-to-br from-crop-400 to-crop-600 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] border border-crop-400/50 group-hover:scale-110 transition-transform">
                CW
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white hidden xl:block">
                CropWise <span className="text-transparent bg-clip-text bg-gradient-to-r from-crop-400 to-crop-600">Copilot</span>
              </span>
            </Link>
          </div>

          <div className="flex flex-1 xl:flex-none justify-end items-center gap-3 md:gap-4 overflow-x-auto no-scrollbar py-2 ml-4">
            
            <button 
              onClick={() => setShowWeatherModal(true)} 
              className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 hover:from-blue-500/30 hover:to-cyan-500/30 border border-blue-500/50 hover:border-blue-400 text-sm sm:text-base font-bold transition-all text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <CloudRain className="w-5 h-5 text-blue-400 animate-pulse" />
              <span className="hidden md:block">Real-time Weather</span>
              <span className="block md:hidden">Weather</span>
            </button>
            <button 
              onClick={() => setShowLocationModal(true)} 
              className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-gradient-to-r from-rose-600/20 to-orange-600/20 hover:from-rose-500/30 hover:to-orange-500/30 border border-rose-500/50 hover:border-rose-400 text-sm sm:text-base font-bold transition-all text-white shadow-[0_0_15px_rgba(244,63,94,0.3)] hover:shadow-[0_0_25px_rgba(244,63,94,0.5)] hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <MapPin className="w-5 h-5 text-rose-400 animate-pulse" />
              <span className="hidden md:block">Help Centers</span>
              <span className="block md:hidden">Support</span>
            </button>

            <Link 
              to="/markets"
              className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600/20 to-teal-600/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-500/50 hover:border-emerald-400 text-sm sm:text-base font-bold transition-all text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <TrendingUp className="w-5 h-5 text-emerald-400 animate-pulse" />
              <span className="hidden md:block">{t.markets || 'Markets'}</span>
              <span className="block md:hidden">Markets</span>
            </Link>

            <Link 
              to="/schemes"
              className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-gradient-to-r from-amber-600/20 to-yellow-600/20 hover:from-amber-500/30 hover:to-yellow-500/30 border border-amber-500/50 hover:border-amber-400 text-sm sm:text-base font-bold transition-all text-white shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <Landmark className="w-5 h-5 text-amber-400 animate-pulse" />
              <span className="hidden md:block">{t.schemes || 'Schemes'}</span>
              <span className="block md:hidden">Schemes</span>
            </Link>

            {onHelpToggle && (
              <button 
                onClick={onHelpToggle} 
                className="flex items-center justify-center p-3 sm:p-3 rounded-2xl bg-gray-900 hover:bg-gray-800 border border-crop-500/30 transition-all text-crop-400 hover:text-crop-300 hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(34,197,94,0.2)] shrink-0"
              >
                <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

          </div>
        </div>
      </nav>

      {showLocationModal && (
        <LocationModal onClose={() => setShowLocationModal(false)} activeLang={activeLang} />
      )}
      {showWeatherModal && (
        <WeatherModal onClose={() => setShowWeatherModal(false)} />
      )}
    </>
  );
};

export default Navbar;
