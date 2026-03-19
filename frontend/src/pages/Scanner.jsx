import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, UploadCloud, Camera, Scan, ShieldAlert, Activity, CheckCircle, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_DISEASES = [
  {
    crop: "Tomato",
    disease: "Early Blight (Alternaria solani)",
    damage: "25% - 30% Leaf Area Damaged",
    status: "Critical",
    confidence: "94.2%",
    remedy: "Prune infected lower leaves immediately. Apply a copper-based fungicide or Chlorothalonil every 7-10 days. Ensure proper spacing for air circulation."
  },
  {
    crop: "Wheat",
    disease: "Leaf Rust (Puccinia triticina)",
    damage: "15% - 20% Canopy Afflicted",
    status: "Warning",
    confidence: "88.7%",
    remedy: "Apply Triazole or Strobilurin based systemic fungicides. Monitor nitrogen fertilizer application, as excess nitrogen can exacerbate rust."
  },
  {
    crop: "Rice/Paddy",
    disease: "Brown Spot (Bipolaris oryzae)",
    damage: "10% - 15% Surface Spotting",
    status: "Warning",
    confidence: "91.5%",
    remedy: "Improve soil fertility (add Potassium). Spray Mancozeb or Edifenphos if the infection spreads to the panicle stage."
  },
  {
    crop: "Cotton",
    disease: "Bacterial Blight",
    damage: "40% Lesion Spread",
    status: "Critical",
    confidence: "97.1%",
    remedy: "Destroy infected crop debris. Spray Copper oxychloride along with Streptomycin to halt bacterial spread across the field."
  }
];

const Scanner = () => {
  const [imageParams, setImageParams] = useState({ file: null, previewUrl: null });
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const preview = URL.createObjectURL(selectedFile);
      setImageParams({ file: selectedFile, previewUrl: preview });
      setAnalysisResult(null);
    }
  };

  const startScan = () => {
    if (!imageParams.file) return;
    setIsScanning(true);
    setAnalysisResult(null);

    // Simulate AI Processing Delay
    setTimeout(() => {
      setIsScanning(false);
      const randomResult = MOCK_DISEASES[Math.floor(Math.random() * MOCK_DISEASES.length)];
      setAnalysisResult(randomResult);
    }, 3000);
  };

  const resetScanner = () => {
    setImageParams({ file: null, previewUrl: null });
    setAnalysisResult(null);
    setIsScanning(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-4 sm:p-12 relative overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        
        <Link to="/" className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 transition-colors mb-8 sm:mb-10 font-medium z-10 relative">
          <ArrowLeft size={20} /> Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white flex items-center justify-center sm:justify-start gap-4 tracking-tight mb-4">
            <Scan className="text-rose-500 shrink-0" size={40} /> AI Disease Scanner
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed mx-auto sm:mx-0">
            Upload an image of a damaged leaf or crop. Our visual AI model will instantly detect the specific disease, estimate crop damage percentages, and provide immediate organic/chemical remedies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Image Uploader & Viewer */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8 relative shadow-2xl flex flex-col items-center justify-center min-h-[400px]">
            {!imageParams.previewUrl ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-full min-h-[300px] border-2 border-dashed border-gray-700 hover:border-rose-500 rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-gray-950/50 hover:bg-gray-900 transition-all group group-hover:shadow-[0_0_30px_rgba(244,63,94,0.1)]"
              >
                <div className="w-20 h-20 bg-gray-900 group-hover:bg-rose-500/10 rounded-full flex items-center justify-center mb-6 transition-colors">
                  <UploadCloud size={40} className="text-gray-500 group-hover:text-rose-400 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-300 mb-2 group-hover:text-rose-400 transition-colors">Drag & Drop Image</h3>
                <p className="text-gray-500 text-sm max-w-xs text-center">Supported formats: JPG, PNG, WEBP. For best results, ensure the leaf covers 80% of the image.</p>
                <button className="mt-8 px-6 py-3 bg-gray-800 text-white rounded-xl font-medium group-hover:bg-rose-600 transition-colors flex items-center gap-2">
                   <Camera size={18} /> Browse Files
                </button>
              </div>
            ) : (
              <div className="w-full relative rounded-2xl overflow-hidden shadow-2xl bg-black border border-gray-800">
                <img 
                  src={imageParams.previewUrl} 
                  alt="Crop Preview" 
                  className={`w-full max-h-[450px] object-cover transition-all duration-700 ${isScanning ? 'brightness-50 grayscale' : 'brightness-100'}`} 
                />
                
                {/* Animated Scanning Beam */}
                {isScanning && (
                  <>
                    <motion.div 
                      initial={{ top: '0%' }}
                      animate={{ top: '100%' }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 w-full h-1 bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,1)] z-20"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                      <Scan size={50} className="text-rose-400 animate-pulse mb-4" />
                      <div className="bg-gray-900/80 backdrop-blur-md px-6 py-2 rounded-full font-bold text-rose-300 border border-rose-500/50 animate-pulse tracking-widest text-sm uppercase">
                         Analyzing Pathogens...
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileChange}
            />

            {imageParams.previewUrl && !isScanning && !analysisResult && (
              <button 
                onClick={startScan}
                className="mt-6 w-full py-4 bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all flex items-center justify-center gap-3 hover:-translate-y-1"
              >
                <Scan size={24} /> Run Deep Scan
              </button>
            )}

            {imageParams.previewUrl && !isScanning && analysisResult && (
              <button 
                onClick={resetScanner}
                className="mt-6 w-full py-4 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-bold text-lg border border-gray-700 transition-all flex items-center justify-center gap-3"
              >
                <RefreshCcw size={20} /> Scan Another Image
              </button>
            )}
          </div>

          {/* Right Column: Analysis Results */}
          <div className="flex flex-col h-full">
             <AnimatePresence mode="wait">
               {!analysisResult && !isScanning && (
                 <motion.div 
                   key="empty"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="h-full bg-gray-900/50 border border-dashed border-gray-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center text-gray-500"
                 >
                   <Scan size={60} className="mb-6 opacity-20" />
                   <h3 className="text-xl font-bold mb-2">Awaiting Image Input</h3>
                   <p className="max-w-sm">Upload a detailed photo of the affected crop area. The AI will cross-reference it against 10,000+ known agricultural pathogens.</p>
                 </motion.div>
               )}

               {isScanning && (
                 <motion.div 
                   key="scanning"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0 }}
                   className="h-full bg-gray-900 border border-rose-900/30 rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden"
                 >
                   <div className="absolute inset-0 bg-gradient-to-b from-rose-500/5 to-transparent animate-pulse" />
                   <Activity size={50} className="text-rose-500 animate-bounce mb-6" />
                   <h3 className="text-2xl font-bold text-white mb-2">Processing Neural Network</h3>
                   <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mt-4">
                     <motion.div 
                       className="h-full bg-rose-500"
                       initial={{ width: "0%" }}
                       animate={{ width: "100%" }}
                       transition={{ duration: 3, ease: "easeInOut" }}
                     />
                   </div>
                   <p className="text-gray-400 mt-4 font-mono text-sm">Validating leaf spot topography...</p>
                 </motion.div>
               )}

               {analysisResult && !isScanning && (
                 <motion.div 
                   key="results"
                   initial={{ opacity: 0, y: 20, scale: 0.95 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   className="h-full bg-gray-900 border border-gray-700 rounded-3xl p-6 sm:p-8 flex flex-col shadow-2xl relative overflow-hidden"
                 >
                   <div className={`absolute top-0 left-0 w-2 h-full ${analysisResult.status === 'Critical' ? 'bg-red-500' : 'bg-amber-500'}`} />
                   
                   <div className="flex justify-between items-start mb-6 pl-4">
                     <div>
                       <span className="text-rose-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2 mb-2">
                         <CheckCircle size={14} /> Analysis Complete
                       </span>
                       <h2 className="text-3xl font-extrabold text-white">{analysisResult.crop}</h2>
                     </div>
                     <div className="text-right">
                       <span className="text-gray-500 text-xs uppercase font-bold tracking-wider block mb-1">AI Confidence</span>
                       <span className="text-xl font-bold text-emerald-400">{analysisResult.confidence}</span>
                     </div>
                   </div>

                   <div className="grid gap-4 flex-1 pl-4">
                     
                     {/* Pathology */}
                     <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800">
                       <div className="flex items-center gap-3 mb-2">
                         <ShieldAlert size={20} className={analysisResult.status === 'Critical' ? 'text-red-500' : 'text-amber-500'} />
                         <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">Identified Pathology</span>
                       </div>
                       <div className="text-xl font-bold text-white">{analysisResult.disease}</div>
                     </div>

                     {/* Damage Assessment */}
                     <div className="bg-red-950/20 p-5 rounded-2xl border border-red-900/30">
                       <div className="flex items-center gap-3 mb-2">
                         <Activity size={20} className="text-red-400" />
                         <span className="text-red-400 text-sm font-bold uppercase tracking-wider">Damage Assessment (फ़सल खराब)</span>
                       </div>
                       <div className="text-lg font-bold text-red-100">{analysisResult.damage}</div>
                     </div>

                     {/* Recommended Action */}
                     <div className="bg-emerald-950/20 p-5 rounded-2xl border border-emerald-900/30">
                       <div className="flex items-center gap-3 mb-2">
                         <CheckCircle size={20} className="text-emerald-400" />
                         <span className="text-emerald-400 text-sm font-bold uppercase tracking-wider">Recommended Remedy</span>
                       </div>
                       <div className="text-base text-gray-200 leading-relaxed font-medium">
                         {analysisResult.remedy}
                       </div>
                     </div>

                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Scanner;
