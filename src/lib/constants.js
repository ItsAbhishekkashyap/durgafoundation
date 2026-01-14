export const STORAGE_KEYS = {
  NOTICES: 'df_v2_notices',
  CERTIFICATES: 'df_v2_certs',
  ALUMNI: 'df_v2_alumni'
};

// Change this password to whatever you want
export const ADMIN_CREDENTIALS = {
  PASSWORD: 'admin' 
};

export const INITIAL_DATA = {
  notices: [
    { id: 1, title: 'Winter Bootcamps 2025', date: '2025-02-20', content: 'Registrations are now open for our specialized coding bootcamps. Visit the center to apply.', isNew: true },
    { id: 2, title: 'Scholarship Results', date: '2025-02-15', content: 'The merit list for the Q1 scholarship program has been published on the notice board.' }
  ],
  certificates: [
    { id: 'DF-2025-8821', name: 'Rohan Gupta', course: 'Full Stack Development', date: '2025-01-15' }
  ],
  alumni: [
    { id: 1, name: 'Priya Singh', role: 'Software Engineer', company: 'TechFlow', batch: '2023', story: 'Durga Foundation gave me the wings to fly. The mentorship program was a turning point in my career.', status: 'approved' }
  ]
};