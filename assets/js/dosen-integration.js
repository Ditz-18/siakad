/* ================================================================
   SIAKAD STAI DILWA — dosen-integration.js
   Auth check + sidebar update untuk semua halaman dosen
   ================================================================ */
(function() {
  const session = JSON.parse(localStorage.getItem('siakad_user') || 'null');
  if (!session || session.role !== 'dosen') {
    window.location.href = '../auth/login.html';
    return;
  }
  window.addEventListener('DOMContentLoaded', () => {
    const nameEl = document.querySelector('.sidebar-profile-info strong');
    const subEl  = document.querySelector('.sidebar-profile-info small');
    if (nameEl && session.profil) {
      nameEl.textContent = session.profil.nama || session.username;
      if (subEl) subEl.textContent = (session.profil.jabatan || '') + ' — ' + (session.profil.program_studi?.nama || '');
    }
  });
})();
