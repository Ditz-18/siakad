/* ================================================================
   SIAKAD STAI DILWA — admin-sidebar.js
   Inject sidebar admin ke semua halaman panel admin
   ================================================================ */
(function() {
  const currentPage = window.location.pathname.split('/').pop();
  const session     = JSON.parse(localStorage.getItem('siakad_user') || 'null');
  const namaSb      = session?.profil?.nama || session?.username || 'Admin';
  const subSb       = session?.profil?.jabatan || 'Administrator';
  const nav = [
    { label:'Utama', type:'section' },
    { href:'dashboard.html',    icon:'fa-house',            label:'Dashboard' },
    { label:'Data Master', type:'section' },
    { href:'data-mahasiswa.html',icon:'fa-user-graduate',   label:'Data Mahasiswa' },
    { href:'data-dosen.html',   icon:'fa-chalkboard-user',  label:'Data Dosen' },
    { href:'mata-kuliah.html',  icon:'fa-book',             label:'Mata Kuliah' },
    { href:'kelas.html',        icon:'fa-chalkboard',       label:'Kelas' },
    { href:'semester.html',     icon:'fa-calendar-check',   label:'Kelola Semester' },
    { label:'Akademik', type:'section' },
    { href:'kelola-ujian.html', icon:'fa-file-circle-check',label:'Kelola Ujian' },
    { href:'ktm.html',          icon:'fa-id-card',          label:'Kelola KTM' },
    { href:'pembayaran.html',   icon:'fa-credit-card',      label:'Pembayaran UKT' },
    { href:'surat.html',        icon:'fa-envelope-open-text',label:'Permohonan Surat', badge:'3' },
    { label:'Laporan', type:'section' },
    { href:'pengumuman.html',   icon:'fa-bullhorn',         label:'Pengumuman' },
    { href:'laporan.html',      icon:'fa-chart-pie',        label:'Laporan Akademik' },
    { href:'log-ujian.html',    icon:'fa-shield-halved',    label:'Log Ujian' },
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
      <div class="sidebar-brand-icon" style="background:var(--danger)"><i class="fa-solid fa-user-shield" style="color:white"></i></div>
      <div class="sidebar-brand-text"><h2>STAI DILWA</h2><span>Panel Administrator</span></div>
    </div>
    <nav class="sidebar-nav">${navHTML}</nav>
    <div class="sidebar-footer">
      <div class="sidebar-profile" id="sidebar-profile-btn">
        <div class="sidebar-avatar" style="background:var(--danger);color:white"><i class="fa-solid fa-user-shield"></i></div>
        <div class="sidebar-profile-info">
          <strong id="sb-nama">Admin</strong>
          <small id="sb-sub">Administrator</small>
        </div>
        <i class="fa-solid fa-chevron-up sidebar-profile-chevron"></i>
      </div>
      <div class="profile-dropdown" id="profile-dropdown">
        <div class="profile-dropdown-item danger" onclick="logout()"><i class="fa-solid fa-right-from-bracket"></i> Keluar</div>
      </div>
    </div>
  </aside>
  <div class="sidebar-overlay" id="sidebar-overlay"></div>`;

  const target = document.getElementById('admin-sidebar-placeholder');
  if (target) target.outerHTML = html;
})();

// Update nama setelah sidebar diinject
(function updateAdminSidebarName() {
  const session = JSON.parse(localStorage.getItem('siakad_user') || 'null');
  if (!session) return;
  const nama = session?.profil?.nama || session?.username || 'Admin';
  const sub  = session?.profil?.jabatan || 'Administrator';
  requestAnimationFrame(() => {
    const elNama = document.getElementById('sb-nama');
    const elSub  = document.getElementById('sb-sub');
    if (elNama) elNama.textContent = nama;
    if (elSub)  elSub.textContent  = sub;
  });
})();
