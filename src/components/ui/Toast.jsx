"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';

const Toast = ({ message, type }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 20, scale: 0.9 }}
    className={`fixed bottom-6 right-6 z-[60] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border backdrop-blur-md ${
      type === 'success' 
        ? 'bg-[#800000]/90 border-[#F09401] text-white' 
        : 'bg-red-100 border-red-200 text-red-800'
    }`}
  >
    {type === 'success' ? <CheckCircle size={20} className="text-[#F09401]" /> : <AlertCircle size={20} />}
    <span className="font-medium">{message}</span>
  </motion.div>
);

export default Toast;