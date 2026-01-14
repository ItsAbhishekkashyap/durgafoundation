"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, GraduationCap } from 'lucide-react';

const AlumniPortal = ({ stories, onSubmitStory }) => {
  const [form, setForm] = useState({ name: '', role: '', company: '', batch: '', story: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.story) return;
    onSubmitStory(form);
    setForm({ name: '', role: '', company: '', batch: '', story: '' });
  };

  return (
    <div className="animate-fade-in space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Alumni Network</h2>
        <p className="text-gray-500">Discover the inspiring journeys of our students making a difference.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map(story => (
          <motion.div 
            key={story.id}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all flex flex-col"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#800000] flex items-center justify-center text-white font-bold text-lg">
                {story.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{story.name}</h3>
                <div className="text-xs text-[#F09401] font-bold">{story.role} @ {story.company}</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm italic mb-4 flex-grow">&#34;{story.story}&#34;</p>
            <div className="pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-400 font-bold">
              <span>Batch {story.batch}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Submission Form */}
      <div className="bg-[#800000] rounded-3xl p-8 shadow-xl mt-16 max-w-4xl mx-auto text-white">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <h3 className="text-2xl font-bold mb-4">Share Your Story</h3>
            <p className="text-white/80 text-sm mb-6">Your journey inspires the next generation.</p>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-[#F09401]" /> Inspire students</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-[#F09401]" /> Network with peers</li>
            </ul>
          </div>
          <form onSubmit={handleSubmit} className="md:w-2/3 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input 
                placeholder="Full Name" required
                className="bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-white/50 focus:border-[#F09401] outline-none"
                value={form.name} onChange={e => setForm({...form, name: e.target.value})}
              />
              <input 
                placeholder="Batch Year" required
                className="bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-white/50 focus:border-[#F09401] outline-none"
                value={form.batch} onChange={e => setForm({...form, batch: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input 
                placeholder="Current Role" required
                className="bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-white/50 focus:border-[#F09401] outline-none"
                value={form.role} onChange={e => setForm({...form, role: e.target.value})}
              />
              <input 
                placeholder="Company" required
                className="bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-white/50 focus:border-[#F09401] outline-none"
                value={form.company} onChange={e => setForm({...form, company: e.target.value})}
              />
            </div>
            <textarea 
              placeholder="Tell us about your journey..." required rows={4}
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-white/50 focus:border-[#F09401] outline-none"
              value={form.story} onChange={e => setForm({...form, story: e.target.value})}
            ></textarea>
            <button className="w-full bg-[#F09401] hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
              Submit for Approval <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AlumniPortal;