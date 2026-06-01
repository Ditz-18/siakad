

const CACHE_NAME     = 'siakad-v2.5.0';
const ASSETS_CACHE   = 'siakad-assets-v2.5.0';

/* Aset statis yang di-cache saat install */
const STATIC_ASSETS = [
  '/index.html',
  '/assets/css/style.css',
  '/assets/css/dark.css',
  '/assets/css/print.css',
  '/assets/css/responsive-patch.css',
  '/assets/js/main.js',
  '/assets/js/utils.js',
  '/assets/js/dummy-data.js',
  '/assets/img/icon.png',
  '/assets/img/logo.png',
  '/manifest.json',
  /* Halaman Mahasiswa */
  '/mahasiswa/dashboard.html',
  '/mahasiswa/krs.html',
  '/mahasiswa/khs.html',
  '/mahasiswa/transkrip.html',
  '/mahasiswa/jadwal.html',
  '/mahasiswa/absensi.html',
  '/mahasiswa/ujian.html',
  '/mahasiswa/ujian-kerjakan.html',
  '/mahasiswa/pembayaran.html',
  '/mahasiswa/dokumen.html',
  '/mahasiswa/ktm.html',
  '/mahasiswa/pengumuman.html',
  '/mahasiswa/profil.html',
  /* Halaman Auth */
  '/auth/login.html',
];

/* ── INSTALL: cache semua aset statis ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(ASSETS_CACHE)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* ── ACTIVATE: hapus cache lama ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME && key !== ASSETS_CACHE)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

/* ── FETCH: strategi hybrid ── */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  /* Abaikan request non-HTTP (chrome-extension dll) */
  if (!url.protocol.startsWith('http')) return;

  /* Abaikan request ke Google Fonts & CDN eksternal — biarkan network */
  if (
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('gstatic.com') ||
    url.hostname.includes('cloudflare.com') ||
    url.hostname.includes('fontawesome.com')
  ) {
    event.respondWith(fetch(request).catch(() => new Response('')));
    return;
  }

  /* HTML — Network First (supaya konten selalu fresh) */
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          /* Simpan salinan ke cache */
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  /* CSS, JS, Gambar — Cache First */
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        /* Simpan ke cache kalau response valid */
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(ASSETS_CACHE).then(cache => cache.put(request, clone));
        }
        return response;
      });
    })
  );
});
