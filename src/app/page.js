'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { STORAGE_KEYS, INITIAL_DATA } from '@/lib/constants';

// --- COMPONENT IMPORTS ---
import Navbar from '@/components/layout/Navbar';
import NoticeBoard from '@/components/features/NoticeBoard';
import CertificateVerifier from '@/components/features/CertificateVerifier';
import AlumniPortal from '@/components/features/AlumniPortal';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminLogin from '@/components/admin/AdminLogin';
import Toast from '@/components/ui/Toast';

export default function App() {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('home'); // Options: 'home', 'verify', 'alumni'
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Data State
  const [notices, setNotices] = useState([]);
  const [certs, setCerts] = useState([]);
  const [alumni, setAlumni] = useState([]);

  // Verification Specific State
  const [verifyResult, setVerifyResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- INITIALIZATION & PERSISTENCE ---
  
  // 1. Load data from LocalStorage on mount
  useEffect(() => {
    const load = (key, fallback) => {
      if (typeof window === 'undefined') return fallback;
      try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : fallback;
      } catch (e) {
        console.error("Error loading data", e);
        return fallback;
      }
    };

    setNotices(load(STORAGE_KEYS.NOTICES, INITIAL_DATA.notices));
    setCerts(load(STORAGE_KEYS.CERTIFICATES, INITIAL_DATA.certificates));
    setAlumni(load(STORAGE_KEYS.ALUMNI, INITIAL_DATA.alumni));
  }, []);

  // 2. Save data to LocalStorage whenever state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(notices));
    }
  }, [notices]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certs));
    }
  }, [certs]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ALUMNI, JSON.stringify(alumni));
    }
  }, [alumni]);


  // --- HELPER FUNCTIONS ---

  const showToast = (msg, type = 'success') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // --- ACTIONS (Passed to Admin Dashboard) ---

  const actions = {
    // Notice Actions
    addNotice: (data) => {
      const newNotice = { 
        id: Date.now(), 
        ...data, 
        date: new Date().toISOString().split('T')[0], 
        isNew: true 
      };
      setNotices([newNotice, ...notices]);
      showToast('Notice published successfully');
    },
    deleteNotice: (id) => {
      setNotices(notices.filter(n => n.id !== id));
      showToast('Notice deleted', 'error');
    },

    // Certificate Actions
    issueCert: (data) => {
      // Generates ID like DF-2025-8821
      const id = `DF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newCert = { 
        id, 
        ...data, 
        date: new Date().toISOString().split('T')[0] 
      };
      setCerts([newCert, ...certs]);
      showToast(`Certificate Issued: ${id}`);
    },

    // Alumni Actions
    approveAlumni: (id) => {
      setAlumni(alumni.map(a => a.id === id ? { ...a, status: 'approved' } : a));
      showToast('Story approved & published');
    },
    rejectAlumni: (id) => {
      setAlumni(alumni.filter(a => a.id !== id));
      showToast('Submission rejected', 'error');
    }
  };

  // --- EVENT HANDLERS ---

  // Verify Certificate Logic
  const handleVerify = (id) => {
    if (!id) return;
    setLoading(true);
    setVerifyResult(null);
    
    // Simulate API network delay (800ms)
    setTimeout(() => {
      const found = certs.find(c => c.id.toLowerCase() === id.toLowerCase().trim());
      setVerifyResult(found || { error: true });
      setLoading(false);
    }, 800);
  };

  // Submit Alumni Story Logic
  const handleStorySubmit = (data) => {
    const newStory = { 
      id: Date.now(), 
      ...data, 
      status: 'pending' 
    };
    setAlumni([...alumni, newStory]);
    showToast('Submitted for review. Thank you!');
  };

  // --- RENDER ---

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* 1. Navigation Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenAdmin={() => setIsLoginOpen(true)} 
      />
      
      {/* 2. Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-140px)]">
        
        {/* Conditional Rendering based on activeTab */}
        {activeTab === 'home' && (
          <NoticeBoard notices={notices} />
        )}
        
        {activeTab === 'verify' && (
          <CertificateVerifier 
            onVerify={handleVerify} 
            verifyResult={verifyResult} 
            loading={loading} 
          />
        )}
        
        {activeTab === 'alumni' && (
          <AlumniPortal 
            stories={alumni.filter(a => a.status === 'approved')} 
            onSubmitStory={handleStorySubmit} 
          />
        )}
      </main>

      {/* 3. Footer */}
      <footer className="border-t border-gray-200 bg-white py-8 text-center text-gray-500 text-sm">
        <p>© 2025 Durga Foundation. All Rights Reserved.</p>
        <p className="mt-2 text-xs">Empowering rural youth through digital literacy and skill development.</p>
      </footer>

      {/* 4. Modals & Overlays (controlled by AnimatePresence) */}
      <AnimatePresence>
        
        {/* Admin Login Modal */}
        {isLoginOpen && (
          <AdminLogin 
            isOpen={isLoginOpen} 
            onClose={() => setIsLoginOpen(false)} 
            onLogin={() => { 
              setIsLoginOpen(false); 
              setIsAdminOpen(true); 
            }} 
          />
        )}

        {/* Admin Dashboard Modal (Protected) */}
        {isAdminOpen && (
          <AdminDashboard 
            isOpen={isAdminOpen} 
            onClose={() => setIsAdminOpen(false)} 
            data={{ notices, certificates: certs, alumni }}
            actions={actions}
          />
        )}

        {/* Toast Notifications */}
        {toast && (
          <Toast message={toast.message} type={toast.type} />
        )}

      </AnimatePresence>
    </div>
  );
}