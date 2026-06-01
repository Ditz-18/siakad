/* ================================================================
   SIAKAD STAI DILWA — admin-integration.js
   Integrasi API untuk semua halaman admin
   Sertakan setelah api.js di setiap halaman admin
   ================================================================ */

/* ── CEK AUTH ADMIN ── */
(function() {
  const session = JSON.parse(localStorage.getItem('siakad_user') || 'null');
  if (!session || session.role !== 'admin') {
    window.location.href = '../auth/login.html';
  }
  // Update nama di sidebar
  window.addEventListener('DOMContentLoaded', () => {
    const nameEl = document.querySelector('.sidebar-profile-info strong');
    const subEl  = document.querySelector('.sidebar-profile-info small');
    if (nameEl && session.profil) {
      nameEl.textContent = session.profil.nama || session.username;
      if (subEl) subEl.textContent = session.profil.jabatan || 'Administrator';
    }
  });
})();

/* ================================================================
   INTEGRASI: DATA MAHASISWA (data-mahasiswa.html)
   ================================================================ */
async function loadMahasiswaFromAPI() {
  const params = {
    search:   document.getElementById('search-mhs')?.value || '',
    per_page: 50,
  };
  const prodi   = document.getElementById('filter-prodi')?.value;
  const ang     = document.getElementById('filter-angkatan')?.value;
  const status  = document.getElementById('filter-status')?.value;
  if (prodi)  params.program_studi_id = prodi;
  if (ang)    params.angkatan = ang;
  if (status) params.status = status;

  const res = await AdminAPI.mahasiswa(params);
  if (!res || !res.ok) { showToast('danger', 'Error', 'Gagal memuat data mahasiswa'); return []; }
  return res.data.data?.data || res.data.data || [];
}

async function tambahMahasiswaAPI() {
  const nim      = document.getElementById('new-nim')?.value.trim();
  const nama     = document.getElementById('new-nama')?.value.trim();
  const prodiEl  = document.getElementById('new-prodi');
  const ang      = document.getElementById('new-angkatan')?.value;
  const email    = document.getElementById('new-email')?.value.trim();
  const hp       = document.getElementById('new-hp')?.value.trim();

  if (!nim || !nama || !ang) {
    showToast('warning', 'Validasi', 'Lengkapi semua field wajib'); return;
  }

  // Cari program_studi_id dari nama prodi
  const prodiRes = await apiFetch('/admin/mahasiswa'); // ambil dari list
  const prodiText = prodiEl?.value;

  const res = await AdminAPI.tambahMahasiswa({
    username: nim,
    email:    email || nim + '@student.siakad.ac.id',
    password: nim,
    nim, nama,
    program_studi_id: 1, // TODO: mapping prodi
    angkatan: parseInt(ang),
    no_hp:    hp,
  });

  if (res && res.ok) {
    hideModal('modal-tambah-mhs');
    showToast('success', 'Berhasil', 'Mahasiswa baru berhasil ditambahkan');
    location.reload();
  } else {
    showToast('danger', 'Gagal', res?.data?.message || 'Terjadi kesalahan');
  }
}

/* ================================================================
   INTEGRASI: DATA DOSEN (data-dosen.html)
   ================================================================ */
async function loadDosenFromAPI(params = {}) {
  const res = await AdminAPI.dosen({ per_page: 50, ...params });
  if (!res || !res.ok) { showToast('danger', 'Error', 'Gagal memuat data dosen'); return []; }
  return res.data.data?.data || res.data.data || [];
}

async function tambahDosenAPI() {
  const nip     = document.getElementById('d-nip')?.value.trim();
  const nama    = document.getElementById('d-nama')?.value.trim();
  const email   = document.getElementById('d-email')?.value.trim();
  const hp      = document.getElementById('d-hp')?.value.trim();
  const jabatan = document.getElementById('d-jabatan')?.value;

  if (!nip || !nama || !email) {
    showToast('warning', 'Validasi', 'Lengkapi field wajib'); return;
  }

  const res = await AdminAPI.tambahDosen({
    username: nip,
    email, password: nip,
    nip, nama,
    program_studi_id: 1, // TODO: mapping prodi
    fakultas: 'Fakultas Teknik',
    jabatan, no_hp: hp,
  });

  if (res && res.ok) {
    hideModal('modal-tambah-dosen');
    showToast('success', 'Berhasil', 'Dosen baru berhasil ditambahkan');
    location.reload();
  } else {
    showToast('danger', 'Gagal', res?.data?.message || 'Terjadi kesalahan');
  }
}

/* ================================================================
   INTEGRASI: MATA KULIAH (mata-kuliah.html)
   ================================================================ */
async function loadMataKuliahFromAPI(params = {}) {
  const res = await AdminAPI.mataKuliah({ per_page: 50, ...params });
  if (!res || !res.ok) { showToast('danger', 'Error', 'Gagal memuat mata kuliah'); return []; }
  return res.data.data?.data || res.data.data || [];
}

async function tambahMataKuliahAPI() {
  const kode  = document.getElementById('mk-kode')?.value.trim();
  const nama  = document.getElementById('mk-nama')?.value.trim();
  const sks   = parseInt(document.getElementById('mk-sks')?.value);
  const sem   = parseInt(document.getElementById('mk-sem')?.value);

  if (!kode || !nama) {
    showToast('warning', 'Validasi', 'Kode dan nama MK wajib diisi'); return;
  }

  const res = await AdminAPI.tambahMataKuliah({
    kode, nama, sks,
    semester_anjuran: sem,
    program_studi_id: 1,
    status: 'Aktif',
  });

  if (res && res.ok) {
    hideModal('modal-tambah-mk');
    showToast('success', 'Berhasil', 'Mata kuliah berhasil ditambahkan');
    location.reload();
  } else {
    showToast('danger', 'Gagal', res?.data?.message || 'Terjadi kesalahan');
  }
}

/* ================================================================
   INTEGRASI: SEMESTER (semester.html)
   ================================================================ */
async function loadSemesterFromAPI() {
  const res = await AdminAPI.semester();
  if (!res || !res.ok) { showToast('danger', 'Error', 'Gagal memuat semester'); return []; }
  return res.data.data || [];
}

async function buatSemesterAPI() {
  const nama    = document.getElementById('sem-nama')?.value.trim();
  const tahun   = document.getElementById('sem-tahun')?.value.trim();
  const mulai   = document.getElementById('sem-mulai')?.value;
  const selesai = document.getElementById('sem-selesai')?.value;
  const krsBuka = document.getElementById('sem-krs-buka')?.value;
  const krsTutup= document.getElementById('sem-krs-tutup')?.value;
  const nilaiBuka = document.getElementById('sem-nilai-buka')?.value;
  const nilaiTutup= document.getElementById('sem-nilai-tutup')?.value;

  if (!nama || !tahun) { showToast('warning', 'Validasi', 'Nama dan tahun akademik wajib diisi'); return; }

  const res = await AdminAPI.tambahSemester({
    nama, tahun_akademik: tahun,
    tipe: nama.toLowerCase().includes('ganjil') ? 'Ganjil' : 'Genap',
    tanggal_mulai: mulai, tanggal_selesai: selesai,
    krs_buka: krsBuka, krs_tutup: krsTutup,
    nilai_buka: nilaiBuka, nilai_tutup: nilaiTutup,
    status: 'Arsip',
  });

  if (res && res.ok) {
    hideModal('modal-buat-semester');
    showToast('success', 'Semester Dibuat', 'Semester baru berhasil disimpan');
    location.reload();
  } else {
    showToast('danger', 'Gagal', res?.data?.message || 'Terjadi kesalahan');
  }
}

async function aktifkanSemesterAPI(id) {
  const res = await AdminAPI.updateSemester(id, { status: 'Aktif' });
  if (res && res.ok) {
    showToast('success', 'Semester Diaktifkan', 'Semester berhasil dijadikan aktif');
    location.reload();
  } else {
    showToast('danger', 'Gagal', res?.data?.message || 'Terjadi kesalahan');
  }
}

/* ================================================================
   INTEGRASI: PEMBAYARAN (pembayaran.html)
   ================================================================ */
async function loadPembayaranFromAPI(params = {}) {
  const res = await AdminAPI.pembayaran({ per_page: 50, ...params });
  if (!res || !res.ok) { showToast('danger', 'Error', 'Gagal memuat data pembayaran'); return []; }
  return res.data.data?.data || res.data.data || [];
}

async function konfirmasiPembayaranAPI(id) {
  const noRef = document.getElementById('konfirm-ref')?.value.trim();
  const res   = await AdminAPI.konfirmasiPembayaran(id, noRef);
  if (res && res.ok) {
    hideModal('modal-konfirm-bayar');
    showToast('success', 'Dikonfirmasi', 'Pembayaran berhasil dikonfirmasi lunas');
    location.reload();
  } else {
    showToast('danger', 'Gagal', res?.data?.message || 'Terjadi kesalahan');
  }
}

/* ================================================================
   INTEGRASI: SURAT (surat.html)
   ================================================================ */
async function loadSuratFromAPI(params = {}) {
  const res = await AdminAPI.surat({ per_page: 50, ...params });
  if (!res || !res.ok) { showToast('danger', 'Error', 'Gagal memuat data surat'); return []; }
  return res.data.data?.data || res.data.data || [];
}

async function prosesSuratAPI(id, mode) {
  let res;
  if (mode === 'proses')  res = await AdminAPI.prosesSurat(id);
  if (mode === 'selesai') res = await AdminAPI.selesaikanSurat(id);
  if (mode === 'tolak') {
    const catatan = prompt('Alasan penolakan:');
    if (!catatan) return;
    res = await AdminAPI.tolakSurat(id, catatan);
  }
  if (res && res.ok) {
    const msgs = { proses: 'Surat sedang diproses', selesai: 'Surat selesai', tolak: 'Surat ditolak' };
    showToast('success', 'Berhasil', msgs[mode]);
    location.reload();
  } else {
    showToast('danger', 'Gagal', res?.data?.message || 'Terjadi kesalahan');
  }
}

/* ================================================================
   INTEGRASI: PENGUMUMAN (pengumuman.html)
   ================================================================ */
async function loadPengumumanFromAPI(params = {}) {
  const res = await AdminAPI.pengumuman({ per_page: 50, ...params });
  if (!res || !res.ok) { showToast('danger', 'Error', 'Gagal memuat pengumuman'); return []; }
  return res.data.data?.data || res.data.data || [];
}

async function buatPengumumanAPI() {
  const judul   = document.getElementById('p-judul')?.value.trim();
  const isi     = document.getElementById('p-isi')?.value.trim();
  const kategori= document.getElementById('p-kategori')?.value;
  const target  = document.getElementById('p-target')?.value;
  const penting = document.getElementById('p-penting')?.checked;

  if (!judul || !isi) { showToast('warning', 'Validasi', 'Judul dan isi wajib diisi'); return; }

  const res = await AdminAPI.buatPengumuman({ judul, isi, kategori, target, penting, status: 'Aktif' });
  if (res && res.ok) {
    hideModal('modal-buat-pengumuman');
    showToast('success', 'Diterbitkan', `Pengumuman "${judul}" berhasil diterbitkan`);
    location.reload();
  } else {
    showToast('danger', 'Gagal', res?.data?.message || 'Terjadi kesalahan');
  }
}

async function arsipkanPengumumanAPI(id) {
  const res = await AdminAPI.updatePengumuman(id, { status: 'Arsip' });
  if (res && res.ok) {
    showToast('info', 'Diarsipkan', 'Pengumuman dipindahkan ke arsip');
    location.reload();
  }
}

async function hapusPengumumanAPI(id) {
  konfirmasi('Yakin ingin menghapus pengumuman ini?', async () => {
    const res = await AdminAPI.hapusPengumuman(id);
    if (res && res.ok) {
      showToast('success', 'Dihapus', 'Pengumuman berhasil dihapus');
      location.reload();
    }
  });
}
