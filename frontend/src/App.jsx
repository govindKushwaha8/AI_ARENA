import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatInterface from './components/ChatInterface';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import GlobalLanguageSwitcher from './components/GlobalLanguageSwitcher';
import { translations } from './utils/translations';

// Import Pages
import Home from './pages/Home';
import About from './pages/About';
import States from './pages/States';
import Markets from './pages/Markets';
import Schemes from './pages/Schemes';

const ChatAppWrapper = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState("");
  // activeLang in chat route handled separately if needed, fallback to context
  const activeLang = 'en'; 
  const t = translations[activeLang]?.help || translations.en.help;
  const helpFaqs = translations[activeLang]?.chat?.prompts || translations.en.chat.prompts;

  return (
    <div className="h-screen bg-gray-950 text-gray-50 flex flex-col font-sans overflow-hidden w-full">
      <Navbar onHelpToggle={() => setShowHelp(!showHelp)} activeLang={activeLang} />
      
      <main className="flex-1 relative mt-16 flex justify-center w-full">
        <AnimatePresence>
          {showHelp && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute top-4 z-40 w-[90%] max-w-2xl bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-2xl backdrop-blur-xl bg-opacity-95"
            >
              <h2 className="text-xl font-bold mb-4 text-white">{t.title}</h2>
              <p className="text-gray-400 text-sm mb-4">{t.subtitle}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {helpFaqs.map((faq, i) => (
                  <button 
                    key={i}
                    onClick={() => {
                      setInitialPrompt(faq);
                      setShowHelp(false);
                    }}
                    className="p-3 text-left text-sm bg-gray-950 border border-gray-800 rounded-xl hover:border-crop-500/50 hover:bg-gray-800/80 transition-all text-gray-300"
                  >
                    {faq}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                 <button onClick={() => setShowHelp(false)} className="text-sm px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">{t.close}</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full max-w-4xl h-full flex flex-col">
          <ChatInterface 
            initialPrompt={initialPrompt} 
          />
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <GlobalLanguageSwitcher />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/states" element={<States />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/app" element={<ChatAppWrapper />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
