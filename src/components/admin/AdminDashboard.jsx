"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Shield, Trash2, Award } from 'lucide-react';

const AdminDashboard = ({ isOpen, onClose, data, actions }) => {
  const [activeTab, setActiveTab] = useState('notices');
  const [noticeForm, setNoticeForm] = useState({ title: '', content: '' });
  const [certForm, setCertForm] = useState({ name: '', course: '' });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-4xl h-[80vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-[#800000] p-6 flex justify-between items-center text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Shield className="text-[#F09401]" /> Admin Dashboard
          </h2>
          <button onClick={onClose} className="text-white/70 hover:text-white"><X size={24} /></button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          {['notices', 'certs', 'alumni'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)} 
              className={`flex-1 py-4 text-sm font-bold border-b-4 transition-colors capitalize ${
                activeTab === tab 
                  ? 'border-[#800000] text-[#800000] bg-red-50' 
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab === 'certs' ? 'Certificates' : tab}
              {tab === 'alumni' && (
                <span className="ml-2 bg-[#F09401] text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {data.alumni.filter(a => a.status === 'pending').length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
          
          {/* NOTICE MANAGER */}
          {activeTab === 'notices' && (
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-800 mb-4">Post New Notice</h4>
                <div className="space-y-3">
                  <input 
                    placeholder="Notice Title" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-[#F09401]"
                    value={noticeForm.title} onChange={e => setNoticeForm({...noticeForm, title: e.target.value})}
                  />
                  <textarea 
                    placeholder="Content..." rows={2} className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-[#F09401]"
                    value={noticeForm.content} onChange={e => setNoticeForm({...noticeForm, content: e.target.value})}
                  ></textarea>
                  <button 
                    onClick={() => { if(noticeForm.title) { actions.addNotice(noticeForm); setNoticeForm({title:'', content:''}); }}}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-bold"
                  >
                    Publish Notice
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {data.notices.map(n => (
                  <div key={n.id} className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{n.title}</p>
                      <p className="text-xs text-gray-500">{n.date}</p>
                    </div>
                    <button onClick={() => actions.deleteNotice(n.id)} className="text-red-400 hover:bg-red-50 p-2 rounded">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CERTIFICATE MANAGER */}
          {activeTab === 'certs' && (
            <div className="space-y-8">
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-800 mb-4">Issue New Certificate</h4>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input 
                    placeholder="Student Name" className="border border-gray-200 rounded-lg p-3 outline-none focus:border-[#F09401]"
                    value={certForm.name} onChange={e => setCertForm({...certForm, name: e.target.value})}
                  />
                  <input 
                    placeholder="Course Name" className="border border-gray-200 rounded-lg p-3 outline-none focus:border-[#F09401]"
                    value={certForm.course} onChange={e => setCertForm({...certForm, course: e.target.value})}
                  />
                </div>
                <button 
                  onClick={() => { if(certForm.name) { actions.issueCert(certForm); setCertForm({name:'', course:''}); }}}
                  className="bg-[#800000] hover:bg-[#600000] text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
                >
                  <Award size={16} /> Generate ID
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase">Recent Issuances</h4>
                {data.certificates.map(c => (
                  <div key={c.id} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm">
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{c.name}</p>
                      <p className="text-xs text-[#F09401] font-mono font-bold">{c.id}</p>
                    </div>
                    <span className="text-xs text-gray-400">{c.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ALUMNI APPROVALS */}
          {activeTab === 'alumni' && (
            <div className="space-y-4">
              {data.alumni.filter(a => a.status === 'pending').length === 0 ? (
                <div className="text-center py-12 text-gray-400">No pending stories to review.</div>
              ) : (
                data.alumni.filter(a => a.status === 'pending').map(story => (
                  <div key={story.id} className="bg-white p-6 rounded-xl border-l-4 border-[#F09401] shadow-md">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-800">{story.name}</h4>
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded font-bold">Pending</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{story.role} at {story.company}</p>
                    <p className="text-sm text-gray-600 italic mb-4">&#34;{story.story}&#34;</p>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => actions.approveAlumni(story.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-bold"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => actions.rejectAlumni(story.id)}
                        className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 py-2 rounded-lg text-sm font-bold"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;