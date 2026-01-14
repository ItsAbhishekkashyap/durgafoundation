"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Award, CheckCircle, XCircle } from 'lucide-react';

const CertificateVerifier = ({ onVerify, verifyResult, loading }) => {
  const [input, setInput] = useState('');

  return (
    <div className="max-w-2xl mx-auto py-12 animate-fade-in">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-[#800000]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#800000]">
          <Award size={32} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Verify Certificate</h2>
        <p className="text-gray-500">Enter the unique ID (e.g., DF-2025-XXXX) found on your document.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl">
        <form onSubmit={(e) => { e.preventDefault(); onVerify(input); }} className="relative mb-8">
          <input 
            type="text" placeholder="Enter Certificate ID"
            className="w-full bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#F09401] focus:border-transparent outline-none transition-all"
            value={input} onChange={(e) => setInput(e.target.value)}
          />
          <Search className="absolute left-4 top-4.5 text-gray-400" size={20} />
          <button 
            type="submit" disabled={loading}
            className="absolute right-2 top-2 bg-[#800000] hover:bg-[#600000] text-white px-6 py-2 rounded-lg text-sm font-bold transition-all disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Verify'}
          </button>
        </form>

        <AnimatePresence mode='wait'>
          {verifyResult && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className={`rounded-xl overflow-hidden border ${verifyResult.error ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}
            >
              {verifyResult.error ? (
                <div className="p-6 text-center">
                  <XCircle className="mx-auto text-red-500 mb-2" size={32} />
                  <h3 className="text-red-700 font-bold text-lg">Invalid ID</h3>
                  <p className="text-red-600/70 text-sm mt-1">No certificate found with that ID.</p>
                </div>
              ) : (
                <div>
                  <div className="bg-green-100 p-3 flex items-center justify-center gap-2 border-b border-green-200">
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="text-green-800 font-bold text-sm tracking-wide">GENUINE CERTIFICATE</span>
                  </div>
                  <div className="p-6 grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs text-gray-500 uppercase font-bold">Student Name</label>
                      <div className="text-lg text-gray-900 font-bold">{verifyResult.name}</div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase font-bold">Issue Date</label>
                      <div className="text-lg text-gray-900 font-bold">{verifyResult.date}</div>
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs text-gray-500 uppercase font-bold">Course / Program</label>
                      <div className="text-xl text-[#800000] font-bold">{verifyResult.course}</div>
                    </div>
                    <div className="col-span-2 pt-4 border-t border-green-200/50 flex justify-between">
                      <span className="text-xs text-gray-500">ID: {verifyResult.id}</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CertificateVerifier;