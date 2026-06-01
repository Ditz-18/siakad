/* ================================================================
   SIAKAD STAI DILWA — utils.js
   Helper functions: format, konversi, kalkulasi
   ================================================================ */

/* ── FORMAT RUPIAH ── */
function formatRupiah(angka) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR',
    minimumFractionDigits: 0
  }).format(angka);
}

/* ── FORMAT TANGGAL ── */
function formatTanggal(dateStr, format = 'panjang') {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  const hari = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const bulanPendek = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agt','Sep','Okt','Nov','Des'];
  if (format === 'panjang') return `${hari[d.getDay()]}, ${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
  if (format === 'pendek') return `${d.getDate()} ${bulanPendek[d.getMonth()]} ${d.getFullYear()}`;
  if (format === 'angka') return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
  if (format === 'iso') return d.toISOString().split('T')[0];
  return dateStr;
}

/* ── FORMAT WAKTU RELATIF ── */
function formatWaktuRelatif(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'Baru saja';
  if (m < 60) return `${m} menit lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d} hari lalu`;
  return formatTanggal(dateStr, 'pendek');
}

/* ── KONVERSI NILAI KE GRADE ── */
function nilaiKeGrade(nilai) {
  if (nilai >= 85) return { grade:'A',  bobot:4.0 };
  if (nilai >= 80) return { grade:'A-', bobot:3.7 };
  if (nilai >= 75) return { grade:'B+', bobot:3.3 };
  if (nilai >= 70) return { grade:'B',  bobot:3.0 };
  if (nilai >= 65) return { grade:'B-', bobot:2.7 };
  if (nilai >= 60) return { grade:'C+', bobot:2.3 };
  if (nilai >= 55) return { grade:'C',  bobot:2.0 };
  if (nilai >= 50) return { grade:'D',  bobot:1.0 };
  return { grade:'E', bobot:0.0 };
}

/* ── HITUNG IPS ── */
function hitungIPS(mataKuliah) {
  const totalMutu = mataKuliah.reduce((s, mk) => s + (mk.sks * nilaiKeGrade(mk.nilai || 0).bobot), 0);
  const totalSKS  = mataKuliah.reduce((s, mk) => s + mk.sks, 0);
  return totalSKS > 0 ? parseFloat((totalMutu / totalSKS).toFixed(2)) : 0;
}

/* ── HITUNG NILAI AKHIR ── */
function hitungNilaiAkhir(tugas, uts, uas) {
  return Math.round((tugas * 0.2) + (uts * 0.3) + (uas * 0.5));
}

/* ── WARNA IPK / IPS ── */
function warnaIPK(ipk) {
  if (ipk >= 3.5) return 'var(--navy)';
  if (ipk >= 3.0) return 'var(--success)';
  if (ipk >= 2.5) return 'var(--warning)';
  return 'var(--danger)';
}

/* ── BADGE KEHADIRAN ── */
function badgeKehadiran(persen) {
  if (persen >= 75) return `<span class="badge badge-success"><i class="fa-solid fa-circle-check"></i> Aman</span>`;
  return `<span class="badge badge-danger"><i class="fa-solid fa-triangle-exclamation"></i> Peringatan</span>`;
}

/* ── BADGE STATUS KRS ── */
function badgeStatusKRS(status) {
  const map = {
    'Draft':     'badge-muted',
    'Menunggu':  'badge-warning',
    'Disetujui': 'badge-success',
    'Ditolak':   'badge-danger',
    'Belum Isi': 'badge-muted'
  };
  return `<span class="badge ${map[status] || 'badge-muted'}">${status}</span>`;
}

/* ── BADGE STATUS SURAT ── */
function badgeStatusSurat(status) {
  const map = {
    'Menunggu': 'badge-warning',
    'Diproses': 'badge-info',
    'Selesai':  'badge-success',
    'Ditolak':  'badge-danger'
  };
  return `<span class="badge ${map[status] || 'badge-muted'}">${status}</span>`;
}

/* ── BADGE STATUS UMUM ── */
function badge(teks, tipe = 'muted') {
  return `<span class="badge badge-${tipe}">${teks}</span>`;
}

/* ── HARI INI ── */
function hariIni() {
  const hari = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  return hari[new Date().getDay()];
}

/* ── EKSPOR CSV ── */
function eksporCSV(data, headers, namaFile) {
  const bom = '\uFEFF';
  const headerRow = headers.map(h => `"${h}"`).join(',');
  const rows = data.map(row =>
    Object.values(row).map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')
  );
  const csv = bom + [headerRow, ...rows].join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = `${namaFile}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('success', 'Berhasil', `File ${namaFile}.csv berhasil diunduh`);
}

/* ── EKSPOR PDF (via print window) ── */
/* ── GENERATE KODE VERIFIKASI UNIK ── */
function generateKodeVerifikasi(judul) {
  const now   = new Date();
  const seed  = judul + now.getFullYear() + now.getMonth() + now.getDate() + now.getHours();
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0;
  }
  const kode = Math.abs(hash).toString(36).toUpperCase().padStart(8, '0');
  return 'SIAKAD-' + kode.slice(0, 4) + '-' + kode.slice(4, 8);
}

function eksporPDF(judul, kontenHTML) {
  const win  = window.open('', '_blank');
  const tgl  = formatTanggal(new Date().toISOString(), 'panjang');
  const kode = generateKodeVerifikasi(judul);

  // Data QR: kode verifikasi + judul + tanggal
  const qrData = encodeURIComponent(`SIAKAD-STAIDILWA | ${judul} | ${tgl} | ${kode}`);
  const qrURL  = `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${qrData}`;

  win.document.write(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>${judul} — SIAKAD STAI DILWA</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet">
      <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family:'Source Sans 3',Arial,sans-serif; font-size:11pt; color:#212529; padding:20mm; }
        .print-header { display:block; width:100%; padding-bottom:10pt; border-bottom:2pt solid #1A5C2A; margin-bottom:14pt; }


        .print-header img { width:100%; height:auto; display:block; }
        h2 { font-size:12pt; color:#1A5C2A; margin:12pt 0 8pt; }
        table { width:100%; border-collapse:collapse; font-size:10pt; margin-bottom:14pt; }
        th { background:#1A5C2A; color:#fff; padding:7pt 9pt; text-align:left; font-size:9pt; font-weight:700; }
        td { padding:7pt 9pt; border-bottom:0.5pt solid #DEE2E6; }
        tr:nth-child(even) td { background:#F8F9FA; }
        .info-grid { display:grid; grid-template-columns:1fr 1fr; gap:8pt; margin-bottom:14pt; }
        .info-item label { font-size:8pt; color:#6C757D; display:block; }
        .info-item span  { font-size:10pt; font-weight:600; }

        /* ── TANDA TANGAN ── */
        .ttd-section {
          margin-top: 28pt;
          display: flex;
          justify-content: flex-end;
        }
        .ttd-box {
          text-align: center;
          min-width: 180pt;
        }
        .ttd-kota { font-size:9pt; color:#6C757D; margin-bottom:4pt; }
        .ttd-space { height: 40pt; border-bottom: 1pt solid #1A5C2A; margin: 8pt 20pt; }
        .ttd-nama { font-size:10pt; font-weight:700; color:#1A5C2A; }
        .ttd-jabatan { font-size:8pt; color:#6C757D; margin-top:2pt; }

        /* ── FOOTER VERIFIKASI ── */
        .print-footer {
          margin-top: 20pt;
          padding-top: 10pt;
          border-top: 0.5pt solid #DEE2E6;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16pt;
        }
        .print-footer-left { font-size:7.5pt; color:#6C757D; line-height:1.6; }
        .print-footer-left strong { color:#1A5C2A; font-size:8pt; }
        .print-footer-qr { display:flex; flex-direction:column; align-items:center; gap:4pt; flex-shrink:0; }
        .print-footer-qr img { width:72pt; height:72pt; border:1pt solid #DEE2E6; border-radius:4pt; }
        .print-footer-qr span { font-size:6.5pt; color:#6C757D; font-family:monospace; }

        @page {
          margin: 15mm;
          /* Hapus header/footer bawaan browser (about:blank, URL, tanggal, dll) */
          size: A4;
        }
        /* Chrome/Edge: sembunyikan URL & judul di header/footer print */
        html {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        @media print {
          body { padding:0; }
        }
      </style>
    </head>
    <body>
      <div class="print-header">
        <img src="../assets/img/kop-surat.png" alt="Kop Surat STAI DILWA">
      </div>

      ${kontenHTML}

      <!-- Tanda Tangan -->
      <div class="ttd-section">
        <div class="ttd-box">
          <div class="ttd-kota">Bandung, ${tgl}</div>
          <div class="ttd-kota">Kepala Bagian Akademik</div>
          <div class="ttd-space"></div>
          <div class="ttd-nama">Siska Permatasari, S.Pd., M.M.</div>
          <div class="ttd-jabatan">NIP. 197808142005012003</div>
        </div>
      </div>

      <!-- Footer Verifikasi + QR -->
      <div class="print-footer">
        <div class="print-footer-left">
          <strong>© ${new Date().getFullYear()} SIAKAD STAI DILWA — Dokumen Resmi</strong><br>
          Dokumen ini diterbitkan secara resmi oleh sistem SIAKAD STAI DILWA.<br>
          Kode Verifikasi: <strong style="font-family:monospace;color:#1A5C2A">${kode}</strong><br>
          Scan QR Code untuk memverifikasi keaslian dokumen ini.<br>
          Dokumen tanpa kode verifikasi dianggap tidak sah.
        </div>
        <div class="print-footer-qr">
          <img src="${qrURL}" alt="QR Verifikasi" onload="window._qrLoaded=true">
          <span>${kode}</span>
        </div>
      </div>
    </body>
    </html>
  `);
  // Tunggu QR Code selesai di-load sebelum print
  win.document.close();
  win.document.title = judul + ' — SIAKAD STAI DILWA';
  const waitForQR = setInterval(() => {
    const img = win.document.querySelector('.print-footer-qr img');
    if (!img || img.complete) {
      clearInterval(waitForQR);
      setTimeout(() => win.print(), 300);
    }
  }, 100);
  // Fallback: print setelah 3 detik meskipun QR belum load
  setTimeout(() => { clearInterval(waitForQR); win.print(); }, 3000);
}

/* ── KONFIRMASI SEBELUM AKSI ── */
function konfirmasi(pesan, callbackYa, callbackTidak = null) {
  showModal('modal-konfirmasi-global');
  document.getElementById('konfirmasi-pesan').textContent = pesan;
  const btnYa = document.getElementById('konfirmasi-ya');
  const btnTidak = document.getElementById('konfirmasi-tidak');
  const newYa = btnYa.cloneNode(true);
  btnYa.parentNode.replaceChild(newYa, btnYa);
  newYa.addEventListener('click', () => {
    hideModal('modal-konfirmasi-global');
    callbackYa();
  });
  btnTidak.addEventListener('click', () => {
    hideModal('modal-konfirmasi-global');
    if (callbackTidak) callbackTidak();
  });
}

/* ── FISHER-YATES SHUFFLE ── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ── DEBOUNCE ── */
function debounce(fn, delay = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

/* ── ESCAPE HTML ── */
function escHTML(str) {
  return String(str ?? '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ── TRUNCATE TEXT ── */
function truncate(str, maxLen = 80) {
  return str.length > maxLen ? str.slice(0, maxLen) + '...' : str;
}