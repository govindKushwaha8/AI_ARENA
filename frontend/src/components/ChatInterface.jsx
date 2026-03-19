import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, MicOff, Star, Info, RefreshCw, Cpu, User, Globe, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { streamChat, sendFeedback } from '../services/api';
import { translations } from '../utils/translations';

const availableLangs = [
  { id: 'en', name: 'English' },
  { id: 'hi', name: 'Hindi' },
  { id: 'ur', name: 'Urdu' },
  { id: 'pa', name: 'Punjabi' }
];

const upcomingLangs = ['Bengali', 'Marathi', 'Telugu', 'Tamil', 'Gujarati', 'Kannada', 'Malayalam'];

const MessageBubble = ({ msg, onFeedback, activeLang }) => {
  const isAi = msg.role === 'ai';
  const [rating, setRating] = useState(0);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const t = translations[activeLang]?.chat || translations.en.chat;

  const handleRating = async (val) => {
    setRating(val);
    await onFeedback(val, msg.content);
    setFeedbackSent(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 10 }} 
      animate={{ opacity: 1, scale: 1, y: 0 }} 
      className={`flex gap-3 max-w-[90%] sm:max-w-[80%] ${isAi ? 'self-start' : 'self-end flex-row-reverse'}`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-lg ${isAi ? 'bg-gradient-to-br from-crop-400 to-crop-600 text-white' : 'bg-gray-800 text-gray-300'}`}>
        {isAi ? <Cpu size={16} /> : <User size={16} />}
      </div>
      <div className="flex flex-col gap-1.5 w-full relative group min-w-0">
        <div className={`p-4 rounded-2xl text-[15px] leading-relaxed break-words shadow-sm ${isAi ? 'bg-gray-900 border border-gray-800/80 text-gray-200' : 'bg-crop-600 text-white shadow-crop-500/20 shadow-lg'}`}>
          {msg.content}
          {msg.isStreaming && <span className="inline-block w-1.5 h-3.5 bg-crop-400 ml-1 mb-[-2px] animate-pulse" />}
        </div>
        
        {isAi && !msg.isStreaming && !msg.error && (
          <div className="flex items-center gap-2 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity px-2">
            {!feedbackSent ? (
              <>
                <span className="text-[11px] text-gray-500 font-medium">{t.helpful}</span>
                <div className="flex gap-1 bg-gray-900/50 rounded-full px-2 py-1 border border-gray-800/50">
                  {[1, 2, 3, 4, 5].map(val => (
                     <button key={val} onClick={() => handleRating(val)} className="text-gray-600 hover:text-amber-400 transition-all hover:scale-110 active:scale-95">
                      <Star size={12} fill={rating >= val ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <span className="text-[11px] text-crop-400 flex items-center gap-1"><Star size={10} fill="currentColor"/> {t.feedback}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ChatInterface = ({ initialPrompt = "", activeLang, setActiveLang }) => {
  const t = translations[activeLang]?.chat || translations.en.chat;
  
  const [messages, setMessages] = useState([
    { role: 'ai', content: t.welcome, isStreaming: false }
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].role === 'ai') {
        return [{ role: 'ai', content: t.welcome, isStreaming: false }];
      }
      return prev;
    });
  }, [activeLang, t.welcome]);

  useEffect(() => {
    if (initialPrompt.trim() !== "") {
      setInput(initialPrompt);
    }
  }, [initialPrompt]);

  let recognition = null;
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = activeLang === 'en' ? 'en-US' : (activeLang === 'hi' ? 'hi-IN' : (activeLang === 'ur' ? 'ur-PK' : 'pa-IN')); 
    
    recognition.onresult = (event) => {
      let tempSpeech = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        tempSpeech += event.results[i][0].transcript;
      }
      setInput(tempSpeech);
    };

    recognition.onend = () => setIsRecording(false);
  }

  const toggleVoice = () => {
    if (!recognition) return alert("Speech recognition is not supported in this browser.");
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      setInput('');
      recognition.start();
      setIsRecording(true);
    }
  };

  const handleSubmit = async (e, forceText = null) => {
    if (e) e.preventDefault();
    const queryText = forceText || input;
    if (!queryText.trim()) return;

    const newMsgs = [...messages, { role: 'user', content: queryText }];
    setMessages(newMsgs);
    setInput('');
    setIsProcessing(true);

    if (!navigator.onLine) {
      setMessages([...newMsgs, { role: 'ai', content: t.offline, error: true }]);
      setIsProcessing(false);
      return;
    }

    setMessages(prev => [...prev, { role: 'ai', content: '', isStreaming: true }]);

    const aiMsgIndex = newMsgs.length;
    let streamedText = "";
    
    let finalQuery = queryText;
    const selectedLangObj = availableLangs.find(l => l.id === activeLang);
    if (selectedLangObj && selectedLangObj.id !== 'en') {
      finalQuery = `${queryText} (Please respond in ${selectedLangObj.name})`;
    }
    
    await streamChat(finalQuery, (chunk) => {
      streamedText += chunk;
      setMessages(prev => {
        const updated = [...prev];
        updated[aiMsgIndex] = { role: 'ai', content: streamedText, isStreaming: true };
        return updated;
      });
    });

    setMessages(prev => {
      const updated = [...prev];
      updated[aiMsgIndex] = { role: 'ai', content: streamedText, isStreaming: false };
      return updated;
    });
    
    setIsProcessing(false);
  };

  const handleFeedback = async (rating, msgContent) => {
    try {
      await sendFeedback(rating, msgContent);
    } catch (e) {
      console.error(e);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-950 w-full relative">
      <div className="flex-1 overflow-y-auto w-full px-4 py-8 space-y-8 pt-6 pb-40 no-scrollbar">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} msg={msg} onFeedback={handleFeedback} activeLang={activeLang} />
        ))}
        {isProcessing && messages[messages.length - 1]?.role !== 'ai' && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 text-gray-500 text-sm ml-2">
             <div className="w-8 h-8 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center">
                <RefreshCw size={14} className="animate-spin text-crop-500" />
             </div>
             <div className="mt-2 text-gray-400 font-medium">{t.thinking}</div>
           </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-950 via-gray-950/95 to-transparent pt-12 pb-6 px-4">
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
          
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 w-full justify-start md:justify-center">
            {t.prompts.map((prompt, i) => (
              <button 
                key={i} 
                onClick={() => handleSubmit(null, prompt)}
                className="whitespace-nowrap px-4 py-2 rounded-full border border-gray-800 bg-gray-900/80 hover:bg-gray-800 hover:border-crop-500/50 text-xs text-gray-300 transition-colors shadow-sm"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="w-full relative flex items-center gap-2 bg-gray-900 border border-gray-800 p-2 pl-3 rounded-2xl shadow-xl focus-within:ring-1 focus-within:ring-crop-500/50 focus-within:border-crop-500/50 transition-all">
            
            <AnimatePresence>
              {showLangMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-[110%] right-0 w-64 bg-gray-900 border border-gray-700/80 rounded-xl shadow-2xl overflow-hidden z-50 divide-y divide-gray-800/50"
                >
                  <div className="p-3 bg-gray-950/50 backdrop-blur-md">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t.availLangs}</h4>
                    <div className="space-y-1">
                      {availableLangs.map(l => (
                        <button 
                          key={l.id} 
                          type="button"
                          onClick={() => { setActiveLang(l.id); setShowLangMenu(false); }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${activeLang === l.id ? 'bg-crop-500/20 text-crop-400 font-medium' : 'text-gray-300 hover:bg-gray-800'}`}
                        >
                          {l.name}
                          {activeLang === l.id && <Check size={14} />}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-950/30">
                    <h4 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">{t.upcomingLangs}</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {upcomingLangs.map(l => (
                        <span key={l} className="px-2 py-1 bg-gray-800 border border-gray-700 text-gray-400 text-[10px] rounded-md cursor-not-allowed shadow-none">
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="button"
              onClick={toggleVoice}
              className={`p-2 rounded-xl transition-all ${isRecording ? 'bg-red-500/20 text-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800'}`}
              title="Voice Input"
            >
              {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.placeholder}
              className="flex-1 max-h-32 min-h-[44px] bg-transparent resize-none border-none focus:outline-none focus:ring-0 py-2.5 px-2 text-gray-200 text-[15px] leading-relaxed"
              rows={1}
            />

            <button
              type="submit"
              disabled={!input.trim() || isProcessing}
              className="p-3 bg-gradient-to-tr from-crop-600 to-crop-500 hover:to-crop-400 disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-500 text-white rounded-xl transition-all shadow-md active:scale-95 disabled:active:scale-100 disabled:opacity-70"
            >
              <Send size={18} />
            </button>

            <button
              type="button"
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 p-2 px-3 sm:px-4 rounded-xl transition-all bg-crop-500/10 text-crop-400 hover:text-white hover:bg-crop-600 border border-crop-500/30 font-semibold shadow-sm"
              title={t.langSelector}
            >
              <Globe strokeWidth={2.5} size={18} /> <span className="text-sm hidden sm:block">{t.langSelector}</span>
            </button>
          </form>
          
          <div className="text-center mt-3 text-[11px] text-gray-500 flex items-center justify-center gap-1.5 opacity-80">
             <Info size={12} /> {t.disclaimer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
