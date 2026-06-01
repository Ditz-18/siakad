/* ================================================================
   SIAKAD STAI DILWA — mahasiswa-sidebar.js
   Inject sidebar mahasiswa ke semua halaman panel mahasiswa
   Cara pakai: <div id="mahasiswa-sidebar-placeholder"></div> lalu load script ini
   ================================================================ */
(function() {
  const currentPage = window.location.pathname.split('/').pop();

  const nav = [
    { label:'Menu Utama', type:'section' },
    { href:'dashboard.html',  icon:'fa-house',          label:'Dashboard' },
    { href:'krs.html',        icon:'fa-file-pen',        label:'KRS',             badge:'!' },
    { href:'khs.html',        icon:'fa-chart-bar',       label:'KHS' },
    { href:'transkrip.html',  icon:'fa-scroll',          label:'Transkrip Nilai' },
    { label:'Perkuliahan', type:'section' },
    { href:'jadwal.html',     icon:'fa-calendar-days',   label:'Jadwal Kuliah' },
    { href:'absensi.html',    icon:'fa-clipboard-check', label:'Absensi' },
    { href:'ujian.html',      icon:'fa-pencil',          label:'Ujian Online',    badge:'1' },
    { label:'Administrasi', type:'section' },
    { href:'pembayaran.html', icon:'fa-credit-card',     label:'Pembayaran UKT' },
    { href:'dokumen.html',    icon:'fa-folder-open',     label:'Dokumen & Surat' },
    { href:'ktm.html',        icon:'fa-id-card',         label:'KTM' },
    { label:'Informasi', type:'section' },
    { href:'pengumuman.html', icon:'fa-bullhorn',        label:'Pengumuman',      badge:'2' },
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
      <div class="sidebar-brand-icon">
        <img src="../assets/img/logo.png" alt="Logo STAI DILWA" style="width:36px;height:auto;border-radius:4px;">
      </div>
      <div class="sidebar-brand-text"><h2>STAI DILWA</h2><span>SIAKAD v2.5.0</span></div>
    </div>
    <nav class="sidebar-nav">${navHTML}</nav>
    <div class="sidebar-footer">
      <div class="sidebar-profile" id="sidebar-profile-btn">
        <div class="sidebar-avatar"><i class="fa-solid fa-user"></i></div>
        <div class="sidebar-profile-info">
          <strong>Rizki Maulana</strong>
          <small>2021010042</small>
        </div>
        <i class="fa-solid fa-chevron-up sidebar-profile-chevron"></i>
      </div>
      <div class="profile-dropdown" id="profile-dropdown">
        <a class="profile-dropdown-item" href="profil.html"><i class="fa-solid fa-user-pen"></i> Profil Saya</a>
        <a class="profile-dropdown-item" href="ktm.html"><i class="fa-solid fa-id-card"></i> KTM Digital</a>
        <hr style="border:none;border-top:1px solid var(--border-color);margin:4px 0;">
        <div class="profile-dropdown-item danger" onclick="logout()"><i class="fa-solid fa-right-from-bracket"></i> Keluar</div>
      </div>
    </div>
  </aside>
  <div class="sidebar-overlay" id="sidebar-overlay"></div>`;

  const target = document.getElementById('mahasiswa-sidebar-placeholder');
  if (target) target.outerHTML = html;
})();
