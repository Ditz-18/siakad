/* ================================================================
   SIAKAD STAI DILWA — mahasiswa-sidebar.js
   Sidebar mahasiswa - nama & info dari localStorage session
   ================================================================ */
(function() {
  const currentPage = window.location.pathname.split('/').pop();
  const session     = JSON.parse(localStorage.getItem('siakad_user') || 'null');
  const nama        = session?.profil?.nama || session?.username || 'Mahasiswa';
  const nim         = session?.profil?.nim  || '';

  const nav = [
    { label:'Menu Utama', type:'section' },
    { href:'dashboard.html',  icon:'fa-house',          label:'Dashboard' },
    { href:'krs.html',        icon:'fa-file-pen',        label:'KRS' },
    { href:'khs.html',        icon:'fa-chart-bar',       label:'KHS' },
    { href:'transkrip.html',  icon:'fa-scroll',          label:'Transkrip Nilai' },
    { label:'Perkuliahan', type:'section' },
    { href:'jadwal.html',     icon:'fa-calendar-days',   label:'Jadwal Kuliah' },
    { href:'absensi.html',    icon:'fa-clipboard-check', label:'Absensi' },
    { href:'ujian.html',      icon:'fa-pencil',          label:'Ujian Online' },
    { label:'Administrasi', type:'section' },
    { href:'pembayaran.html', icon:'fa-credit-card',     label:'Pembayaran UKT' },
    { href:'dokumen.html',    icon:'fa-folder-open',     label:'Dokumen & Surat' },
    { href:'ktm.html',        icon:'fa-id-card',         label:'KTM' },
    { label:'Informasi', type:'section' },
    { href:'pengumuman.html', icon:'fa-bullhorn',        label:'Pengumuman' },
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
        <div class="sidebar-avatar"><i class="fa-solid fa-user"></i></div>
        <div class="sidebar-profile-info">
          <strong id="sb-nama">${nama}</strong>
          <small id="sb-nim">${nim}</small>
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

  // Update nama dari API jika session sudah ada tapi nama belum lengkap
  if (session?.token && !session?.profil?.nama) {
    fetch((localStorage.getItem('siakad_api_base') ||
      (location.hostname === 'localhost' ? 'http://localhost:8000/api' : location.origin + '/api'))
      + '/mahasiswa/profil', {
      headers: { 'Authorization': 'Bearer ' + session.token, 'Accept': 'application/json' }
    }).then(r => r.json()).then(data => {
      if (data?.data) {
        const p = data.data;
        const el = document.getElementById('sb-nama');
        const es = document.getElementById('sb-nim');
        if (el) el.textContent = p.nama || nama;
        if (es) es.textContent = p.nim  || nim;
        // Update localStorage
        session.profil = p;
        localStorage.setItem('siakad_user', JSON.stringify(session));
      }
    }).catch(() => {});
  }
})();
