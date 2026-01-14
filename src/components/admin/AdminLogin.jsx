"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, X } from 'lucide-react';
import { ADMIN_CREDENTIALS } from '@/lib/constants';

const AdminLogin = ({ isOpen, onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_CREDENTIALS.PASSWORD) {
      onLogin();
      setPassword('');
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X /></button>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#800000]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#800000]">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Access</h2>
          <p className="text-gray-500 text-sm">Please enter the secure access code.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="password" autoFocus placeholder="Enter Password"
            className={`w-full p-4 border rounded-xl outline-none focus:ring-2 ${error ? 'border-red-300 ring-red-100' : 'border-gray-200 ring-[#F09401]/20'}`}
            value={password} onChange={e => { setPassword(e.target.value); setError(false); }}
          />
          {error && <p className="text-red-500 text-xs text-center font-bold">Incorrect password. Try again.</p>}
          
          <button className="w-full bg-[#800000] hover:bg-[#600000] text-white py-4 rounded-xl font-bold transition-all">
            Unlock Dashboard
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;