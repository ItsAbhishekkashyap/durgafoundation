"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Bell, ChevronRight } from 'lucide-react';

const NoticeBoard = ({ notices }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F09401]/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <div className="relative z-10 px-8 py-16 md:px-12 md:py-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
            className="inline-block px-3 py-1 rounded-full bg-[#800000]/10 text-[#800000] text-xs font-bold tracking-wider mb-6"
          >
            EST. 2010 • EMPOWERING YOUTH
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight"
          >
            Building A <span className="text-[#800000]">Brighter Future</span> Through Education
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex gap-4"
          >
            <button className="bg-[#800000] hover:bg-[#600000] text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all">
              Explore Programs
            </button>
          </motion.div>
        </div>
      </section>

      {/* Notices */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-[#800000]/10 rounded-lg text-[#800000]"><Bell size={24} /></div>
            Latest Announcements
          </h3>
          <span className="text-xs text-[#F09401] font-bold bg-[#F09401]/10 px-3 py-1 rounded-full animate-pulse">LIVE UPDATES</span>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {notices.length === 0 ? (
            <div className="col-span-2 py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-500">No active notices at the moment.</p>
            </div>
          ) : (
            notices.map((notice) => (
              <motion.div 
                key={notice.id}
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.01 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-[#F09401] transition-all shadow-md group relative overflow-hidden"
              >
                {notice.isNew && (
                  <div className="absolute top-0 right-0 bg-[#F09401] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg shadow-sm">NEW</div>
                )}
                <div className="mb-3 text-xs font-bold text-gray-400 uppercase tracking-wide">
                  {new Date(notice.date).toLocaleDateString()}
                </div>
                <h4 className="text-lg font-bold text-[#800000] mb-2">{notice.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{notice.content}</p>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default NoticeBoard;