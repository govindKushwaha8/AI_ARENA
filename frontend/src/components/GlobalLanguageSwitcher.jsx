import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Check, ChevronDown } from 'lucide-react';

const ACTIVE_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी (Hindi)' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'ur', label: 'اردو (Urdu)' }
];

const UPCOMING_LANGUAGES = [
  { code: 'mr', label: 'मराठी (Marathi)' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
  { code: 'bn', label: 'বাংলা (Bengali)' },
  { code: 'ta', label: 'தமிழ் (Tamil)' }
];

const GlobalLanguageSwitcher = () => {
  const { activeLang, setActiveLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const activeTranslation = ACTIVE_LANGUAGES.find(l => l.code === activeLang) || ACTIVE_LANGUAGES[0];

  return (
    <div className="fixed top-20 right-4 z-[100] sm:top-24 sm:right-6">
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-700 hover:border-emerald-500 rounded-xl text-gray-200 shadow-lg font-medium transition-colors"
        >
          <Globe size={18} className="text-emerald-400" />
          <span className="hidden sm:inline-block">{activeTranslation.label}</span>
          <span className="sm:hidden">{activeTranslation.code.toUpperCase()}</span>
          <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-3 w-64 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl bg-opacity-95">
            <div className="px-4 py-3 border-b border-gray-800 bg-gray-950/50">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Language</span>
            </div>
            
            <div className="p-2 flex flex-col gap-1 max-h-[60vh] overflow-y-auto no-scrollbar">
              {ACTIVE_LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setActiveLang(lang.code);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition-all ${
                    activeLang === lang.code 
                    ? 'bg-emerald-500/10 text-emerald-400 font-bold' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {lang.label}
                  {activeLang === lang.code && <Check size={16} />}
                </button>
              ))}

              <div className="mt-2 mb-1 px-3">
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">Coming Soon</span>
              </div>

              {UPCOMING_LANGUAGES.map(lang => (
                <div
                  key={lang.code}
                  className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-gray-600 bg-gray-950/30 cursor-not-allowed opacity-70"
                >
                  {lang.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalLanguageSwitcher;
