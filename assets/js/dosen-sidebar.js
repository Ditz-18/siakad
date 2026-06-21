/* ================================================================
   SIAKAD STAI DILWA — dosen-sidebar.js
   Sidebar dosen - nama dari localStorage session
   ================================================================ */
(function() {
  const currentPage = window.location.pathname.split('/').pop();
  const session     = JSON.parse(localStorage.getItem('siakad_user') || 'null');
  const nama        = session?.profil?.nama || session?.username || 'Dosen';
  const jabatan     = session?.profil?.jabatan || '';
  const prodi       = session?.profil?.program_studi?.nama || '';
  const sub         = [jabatan, prodi].filter(Boolean).join(' — ') || 'Dosen';

  const nav = [
    { label:'Menu Utama', type:'section' },
    { href:'dashboard.html',       icon:'fa-house',              label:'Dashboard' },
    { href:'kelas.html',           icon:'fa-chalkboard',         label:'Kelas Saya' },
    { href:'jadwal.html',          icon:'fa-calendar-days',      label:'Jadwal Mengajar' },
    { label:'Akademik', type:'section' },
    { href:'input-nilai.html',     icon:'fa-pen-to-square',      label:'Input Nilai' },
    { href:'absensi-kelas.html',   icon:'fa-clipboard-list',     label:'Absensi Kelas' },
    { href:'kelola-ujian.html',    icon:'fa-file-circle-check',  label:'Kelola Ujian' },
    { label:'Bimbingan', type:'section' },
    { href:'bimbingan.html',       icon:'fa-users',              label:'Mhs. Bimbingan' },
    { href:'persetujuan-krs.html', icon:'fa-file-pen',           label:'Persetujuan KRS' },
    { label:'Informasi', type:'section' },
    { href:'pengumuman.html',      icon:'fa-bullhorn',           label:'Pengumuman' },
    { href:'profil.html',          icon:'fa-user-pen',           label:'Profil Saya' },
  ];

  const navHTML = nav.map(item => {
    if (item.type === 'section') return `<div class="nav-section-label">${item.label}</div>`;
    const active = item.href === currentPage ? 'active' : '';
    return `<a class="nav-item ${active}" href="${item.href}">
      <span class="nav-icon"><i class="fa-solid ${item.icon}"></i></span>
      <span class="nav-label">${item.label}</span>
    </a>`;
  }).join('');

  const html = `
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-brand">
      <div class="sidebar-brand-icon">
        <img src="../assets/img/logo.png" alt="Logo STAI DILWA" style="width:36px;height:auto;border-radius:4px;">
      </div>
      <div class="sidebar-brand-text"><h2>STAI DILWA</h2><span>SIAKAD v2.6.0</span></div>
    </div>
    <nav class="sidebar-nav">${navHTML}</nav>
    <div class="sidebar-footer">
      <div class="sidebar-profile" id="sidebar-profile-btn">
        <div class="sidebar-avatar"><i class="fa-solid fa-chalkboard-teacher"></i></div>
        <div class="sidebar-profile-info">
          <strong id="sb-nama">${nama}</strong>
          <small id="sb-sub">${sub}</small>
        </div>
        <i class="fa-solid fa-chevron-up sidebar-profile-chevron"></i>
      </div>
      <div class="profile-dropdown" id="profile-dropdown">
        <a class="profile-dropdown-item" href="profil.html"><i class="fa-solid fa-user-pen"></i> Profil Saya</a>
        <hr style="border:none;border-top:1px solid var(--border-color);margin:4px 0;">
        <div class="profile-dropdown-item danger" onclick="logout()"><i class="fa-solid fa-right-from-bracket"></i> Keluar</div>
      </div>
    </div>
  </aside>
  <div class="sidebar-overlay" id="sidebar-overlay"></div>`;

  const ph = document.getElementById('dosen-sidebar-placeholder') ||
             document.getElementById('app-sidebar');
  if (ph) ph.outerHTML = html;
})();
