"use client"
import React, { useState } from 'react';
import { Bell, Award, GraduationCap, Shield, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ activeTab, setActiveTab, onOpenAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { id: 'home', label: 'Home', icon: Bell },
    { id: 'verify', label: 'Verify Certificate', icon: Award },
    { id: 'alumni', label: 'Alumni Network', icon: GraduationCap },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-[#800000] text-white shadow-xl border-b-4 border-[#F09401]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-[#800000] font-bold text-xl">D</span>
            </div>
            <div>
              <h1 className="text-xl font-bold leading-none tracking-tight">Durga Foundation</h1>
              <p className="text-xs text-[#F09401] font-medium tracking-wider mt-0.5">EMPOWERING FUTURE</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === item.id 
                    ? 'bg-white text-[#800000] font-bold shadow-md' 
                    : 'text-gray-200 hover:bg-[#990000]'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
            <button 
              onClick={onOpenAdmin}
              className="ml-4 bg-[#F09401] hover:bg-orange-500 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-lg transition-all flex items-center gap-2"
            >
              <Shield size={16} /> Admin
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#900000] overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-white hover:bg-[#800000]"
                >
                  <item.icon size={18} /> {item.label}
                </button>
              ))}
              <button 
                onClick={() => { onOpenAdmin(); setIsOpen(false); }}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-[#F09401] bg-white/10"
              >
                <Shield size={18} /> Admin Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;