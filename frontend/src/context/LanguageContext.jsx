import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  // Try to get language from localStorage, default to 'en'
  const [activeLang, setActiveLang] = useState(() => {
    return localStorage.getItem('cropwise_lang') || 'en';
  });

  useEffect(() => {
    const storedLang = localStorage.getItem('cropwise_lang') || 'en';
    
    // Only invoke heavy DOM reload / cookie writes if language actively shifts
    if (activeLang !== storedLang) {
      localStorage.setItem('cropwise_lang', activeLang);
      
      // Override standard session translator
      document.cookie = `googtrans=/en/${activeLang}; path=/`;
      document.cookie = `googtrans=/en/${activeLang}; domain=${window.location.hostname}; path=/`;
      
      // Dispatch DOM refresh to force the injected google-script processing
      window.location.reload();
    }
  }, [activeLang]);

  return (
    <LanguageContext.Provider value={{ activeLang, setActiveLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
