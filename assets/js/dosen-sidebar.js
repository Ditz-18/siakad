/* ================================================================
   SIAKAD STAI DILWA — dosen-sidebar.js
   Inject sidebar dosen ke semua halaman panel dosen
   Cara pakai: <div id="app-sidebar"></div> lalu script ini
   ================================================================ */
(function() {
  const currentPage = window.location.pathname.split('/').pop();
  const nav = [
    { label:'Menu Utama', type:'section' },
    { href:'dashboard.html', icon:'fa-house',          label:'Dashboard' },
    { href:'kelas.html',     icon:'fa-chalkboard',     label:'Kelas Saya' },
    { href:'jadwal.html',    icon:'fa-calendar-days',  label:'Jadwal Mengajar' },
    { label:'Akademik', type:'section' },
    { href:'input-nilai.html',    icon:'fa-pen-to-square',  label:'Input Nilai', badge:'!' },
    { href:'absensi-kelas.html',  icon:'fa-clipboard-list', label:'Absensi Kelas' },
    { href:'kelola-ujian.html',   icon:'fa-file-circle-check',label:'Kelola Ujian' },
    { label:'Bimbingan', type:'section' },
    { href:'bimbingan.html',      icon:'fa-users',           label:'Mhs. Bimbingan' },
    { href:'persetujuan-krs.html',icon:'fa-file-pen',        label:'Persetujuan KRS', badge:'3' },
    { label:'Informasi', type:'section' },
    { href:'pengumuman.html',     icon:'fa-bullhorn',        label:'Pengumuman' },
  ];

  const navHTML = nav.map(item => {
    if (item.type === 'section') return `<div class="nav-section-label">${item.label}</div>`;
    const active = item.href === currentPage ? 'active' : '';
    const badge  = item.badge ? `<span class="nav-badge">${item.badge}</span>` : '';
    return `<a class="nav-item ${active}" href="${item.href}">
      <span class="nav-icon"><i class="fa-solid ${item.icon}"></i></span>
      <span class="nav-label">${item.label}</span>${badge}
    </a>`;
  }).join('');

  const html = `
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-brand">
      <div class="sidebar-brand-icon" style="background:var(--gold)"><i class="fa-solid fa-chalkboard-user" style="color:var(--navy-dark)"></i></div>
      <div class="sidebar-brand-text"><h2>STAI DILWA</h2><span>Panel Dosen</span></div>
    </div>
    <nav class="sidebar-nav">${navHTML}</nav>
    <div class="sidebar-footer">
      <div class="sidebar-profile" id="sidebar-profile-btn">
        <div class="sidebar-avatar" style="background:var(--gold);color:var(--navy-dark)"><i class="fa-solid fa-chalkboard-user"></i></div>
        <div class="sidebar-profile-info">
          <strong>Dr. Hendra Wijaya</strong>
          <small>Lektor — Teknik Informatika</small>
        </div>
        <i class="fa-solid fa-chevron-up sidebar-profile-chevron"></i>
      </div>
      <div class="profile-dropdown" id="profile-dropdown">
        <a class="profile-dropdown-item" href="profil.html"><i class="fa-solid fa-user-pen"></i> Profil Dosen</a>
        <hr style="border:none;border-top:1px solid var(--border-color);margin:4px 0;">
        <div class="profile-dropdown-item danger" onclick="logout()"><i class="fa-solid fa-right-from-bracket"></i> Keluar</div>
      </div>
    </div>
  </aside>
  <div class="sidebar-overlay" id="sidebar-overlay"></div>`;

  const target = document.getElementById('dosen-sidebar-placeholder');
  if (target) target.outerHTML = html;
})();
