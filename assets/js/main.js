/* ================================================================
   SIAKAD STAI DILWA — main.js
   Fungsi UI global: sidebar, topbar, toast, modal, dark mode
   Dipakai oleh SEMUA halaman setelah login
   ================================================================ */

/* ================================================================
   DARK MODE
   ================================================================ */
function initDarkMode() {
  const saved = localStorage.getItem('siakad_theme') || 'light';
  applyTheme(saved);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('siakad_theme', theme);
  // Update semua tombol toggle tema
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    const icon = btn.querySelector('i');
    if (!icon) return;
    icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    btn.title = theme === 'dark' ? 'Mode Terang' : 'Mode Gelap';
  });
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

/* ================================================================
   SIDEBAR
   ================================================================ */
function initSidebar() {
  const sidebar  = document.querySelector('.sidebar');
  const overlay  = document.querySelector('.sidebar-overlay');
  const hamburger = document.querySelector('.topbar-hamburger');
  if (!sidebar) return;

  // Pulihkan state collapse dari localStorage
  const collapsed = localStorage.getItem('siakad_sidebar_collapsed') === 'true';
  if (collapsed && window.innerWidth > 1024) sidebar.classList.add('collapsed');

  // Hamburger toggle
  hamburger?.addEventListener('click', () => {
    if (window.innerWidth <= 1024) {
      sidebar.classList.toggle('open');
      overlay?.classList.toggle('active');
    } else {
      sidebar.classList.toggle('collapsed');
      localStorage.setItem('siakad_sidebar_collapsed', sidebar.classList.contains('collapsed'));
    }
  });

  // Tutup sidebar saat klik overlay (mobile)
  overlay?.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  });

  // Active nav item
  const currentPath = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-item').forEach(item => {
    const href = item.getAttribute('href') || '';
    if (href && href.split('/').pop() === currentPath) {
      item.classList.add('active');
    }
  });

  // Profile dropdown
  const profileBtn = document.querySelector('.sidebar-profile');
  const profileDrop = document.querySelector('.profile-dropdown');
  profileBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDrop?.classList.toggle('open');
  });
  document.addEventListener('click', () => profileDrop?.classList.remove('open'));

  // Notif dropdown
  const notifBtn = document.querySelector('[data-notif-toggle]');
  const notifDrop = document.querySelector('.notif-dropdown');
  notifBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    notifDrop?.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!notifBtn?.contains(e.target)) notifDrop?.classList.remove('open');
  });
}

/* ================================================================
   MOBILE RESPONSIVE
   ================================================================ */
function initResponsive() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      sidebar?.classList.remove('open');
      overlay?.classList.remove('active');
    }
  });
}

/* ================================================================
   TOAST NOTIFICATIONS
   ================================================================ */
let toastContainer = null;

function getToastContainer() {
  if (!toastContainer) {
    toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }
  }
  return toastContainer;
}

const TOAST_ICONS = {
  success: 'fa-circle-check',
  warning: 'fa-triangle-exclamation',
  danger:  'fa-circle-xmark',
  info:    'fa-circle-info'
};

function showToast(tipe = 'info', judul = '', pesan = '', durasi = 4000) {
  const container = getToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast toast-${tipe}`;
  toast.innerHTML = `
    <i class="fa-solid ${TOAST_ICONS[tipe] || 'fa-circle-info'} toast-icon"></i>
    <div class="toast-content">
      ${judul ? `<div class="toast-title">${escHTML(judul)}</div>` : ''}
      ${pesan  ? `<div class="toast-message">${escHTML(pesan)}</div>` : ''}
    </div>
    <button class="toast-close" aria-label="Tutup"><i class="fa-solid fa-xmark"></i></button>
  `;
  container.appendChild(toast);

  const close = () => {
    toast.classList.add('removing');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  };

  toast.querySelector('.toast-close').addEventListener('click', close);
  if (durasi > 0) setTimeout(close, durasi);
  return toast;
}

/* ================================================================
   MODALS
   ================================================================ */
function showModal(id) {
  const backdrop = document.getElementById(id);
  if (!backdrop) return;
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
  // Tutup jika klik di luar modal
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) hideModal(id);
  }, { once: true });
}

function hideModal(id) {
  const backdrop = document.getElementById(id);
  if (!backdrop) return;
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

// Inisialisasi semua tombol close modal
function initModals() {
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      if (modal) hideModal(modal.id);
    });
  });
  // Tombol yang membuka modal
  document.querySelectorAll('[data-modal-target]').forEach(btn => {
    btn.addEventListener('click', () => showModal(btn.dataset.modalTarget));
  });
}

/* ================================================================
   TABS
   ================================================================ */
function initTabs(containerSelector = '.tabs') {
  document.querySelectorAll(containerSelector).forEach(tabsEl => {
    const items = tabsEl.querySelectorAll('.tab-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        const target = item.dataset.tab;
        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const panel = tabsEl.closest('.card, .page-content, body');
        panel?.querySelectorAll('.tab-content').forEach(c => {
          c.classList.toggle('active', c.dataset.tab === target);
        });
      });
    });
  });
}

/* ================================================================
   ACCORDION
   ================================================================ */
function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      item?.classList.toggle('open');
    });
  });
}

/* ================================================================
   SEARCH / FILTER TABLE
   ================================================================ */
function filterTable(inputEl, tableSelector, colIndex = null) {
  const q = inputEl.value.toLowerCase().trim();
  const rows = document.querySelectorAll(`${tableSelector} tbody tr`);
  rows.forEach(row => {
    const text = colIndex !== null
      ? (row.cells[colIndex]?.textContent || '').toLowerCase()
      : row.textContent.toLowerCase();
    row.style.display = text.includes(q) ? '' : 'none';
  });
}

/* ================================================================
   PROGRESS BAR ANIMASI
   ================================================================ */
function animateProgress(el, persen) {
  if (!el) return;
  el.style.width = '0%';
  setTimeout(() => { el.style.width = persen + '%'; }, 50);
}

/* ================================================================
   LOGOUT
   ================================================================ */
function logout() {
  // Buat modal konfirmasi logout langsung tanpa dependency
  const existingModal = document.getElementById('modal-logout-confirm');
  if (existingModal) existingModal.remove();

  const modal = document.createElement('div');
  modal.id = 'modal-logout-confirm';
  modal.style.cssText = `
    position:fixed; inset:0; z-index:9999;
    background:rgba(0,0,0,0.5);
    display:flex; align-items:center; justify-content:center;
    padding:20px;
  `;
  modal.innerHTML = `
    <div style="
      background:var(--bg-card, #fff);
      border-radius:12px;
      padding:0;
      width:100%;
      max-width:400px;
      box-shadow:0 20px 60px rgba(0,0,0,0.3);
      overflow:hidden;
    ">
      <div style="
        padding:18px 20px;
        border-bottom:1px solid var(--border-color, #e2e6ef);
        display:flex; align-items:center; justify-content:space-between;
      ">
        <h3 style="
          font-size:1rem; font-weight:700;
          color:var(--text-primary, #212529);
          display:flex; align-items:center; gap:8px; margin:0;
        ">
          <i class="fa-solid fa-right-from-bracket" style="color:var(--danger, #BE3328)"></i>
          Konfirmasi Keluar
        </h3>
        <button id="logout-close" style="
          background:none; border:none; cursor:pointer;
          color:var(--text-muted, #6B7280); font-size:1rem; padding:4px;
        "><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div style="padding:20px;">
        <p style="color:var(--text-secondary, #495057); line-height:1.6; margin:0;">
          Yakin ingin keluar dari SIAKAD? Semua sesi aktif akan diakhiri.
        </p>
      </div>
      <div style="
        padding:14px 20px;
        background:var(--bg-tertiary, #f4f6fa);
        display:flex; justify-content:flex-end; gap:10px;
      ">
        <button id="logout-batal" style="
          padding:8px 18px; border-radius:8px; font-size:0.875rem;
          font-weight:600; cursor:pointer; border:1.5px solid var(--border-color, #e2e6ef);
          background:transparent; color:var(--text-secondary, #495057);
          font-family:inherit;
        ">Batal</button>
        <button id="logout-ya" style="
          padding:8px 18px; border-radius:8px; font-size:0.875rem;
          font-weight:600; cursor:pointer; border:none;
          background:var(--danger, #BE3328); color:white;
          display:flex; align-items:center; gap:6px;
          font-family:inherit;
        ">
          <i class="fa-solid fa-right-from-bracket"></i> Ya, Keluar
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  const doLogout = () => {
    modal.remove();
    document.body.style.overflow = '';
    localStorage.removeItem('siakad_user');
    localStorage.removeItem('siakad_role');
    window.location.href = '/auth/login.html';
  };

  const doClose = () => {
    modal.remove();
    document.body.style.overflow = '';
  };

  document.getElementById('logout-ya').addEventListener('click', doLogout);
  document.getElementById('logout-batal').addEventListener('click', doClose);
  document.getElementById('logout-close').addEventListener('click', doClose);
  modal.addEventListener('click', (e) => { if (e.target === modal) doClose(); });
}


function getSession() {
  const saved = localStorage.getItem('siakad_user');
  if (saved) return JSON.parse(saved);
  return null;
}

function setSession(role, data) {
  localStorage.setItem('siakad_role', role);
  localStorage.setItem('siakad_user', JSON.stringify({ role, ...data }));
}

function requireAuth(allowedRole) {
  const session = getSession();
  if (!session) {
    window.location.href = '/auth/login.html';
    return null;
  }
  if (allowedRole && session.role !== allowedRole) {
    window.location.href = '/auth/login.html';
    return null;
  }
  return session;
}

/* ================================================================
   MODAL KONFIRMASI GLOBAL
   Inject sekali ke body, dipakai oleh konfirmasi() di utils.js
   ================================================================ */
function injectModalKonfirmasi() {
  if (document.getElementById('modal-konfirmasi-global')) return;
  const html = `
    <div class="modal-backdrop" id="modal-konfirmasi-global">
      <div class="modal modal-sm">
        <div class="modal-header">
          <h3><i class="fa-solid fa-triangle-exclamation" style="color:var(--warning);margin-right:8px"></i>Konfirmasi</h3>
          <button class="modal-close" data-modal-close><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="modal-body">
          <p id="konfirmasi-pesan" style="color:var(--text-secondary);line-height:1.6"></p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost btn-sm" id="konfirmasi-tidak">Batal</button>
          <button class="btn btn-danger btn-sm" id="konfirmasi-ya"><i class="fa-solid fa-check"></i> Ya, Lanjutkan</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);
  document.querySelector('#modal-konfirmasi-global [data-modal-close]')
    ?.addEventListener('click', () => hideModal('modal-konfirmasi-global'));
}

/* ================================================================
   INISIALISASI GLOBAL
   Dipanggil di setiap halaman setelah DOM ready
   ================================================================ */
function initApp() {
  initDarkMode();
  initSidebar();
  initResponsive();
  initModals();
  initTabs();
  initAccordion();
  injectModalKonfirmasi();

  // Theme toggle buttons
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });
}

// Auto-init saat DOM siap
document.addEventListener('DOMContentLoaded', initApp);