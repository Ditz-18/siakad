/* ================================================================
   SIAKAD STAI DILWA — api.js
   Pusat semua komunikasi dengan backend Laravel API
   Cara pakai: sertakan sebelum script halaman
   ================================================================ */

const API_BASE = 'http://localhost:8000/api';

/* ── HELPER: ambil token dari localStorage ── */
function getToken() {
  const user = localStorage.getItem('siakad_user');
  if (!user) return null;
  try { return JSON.parse(user).token || null; }
  catch { return null; }
}

/* ── HELPER: simpan session setelah login ── */
function saveSession(data) {
  localStorage.setItem('siakad_user', JSON.stringify(data));
  localStorage.setItem('siakad_role', data.role);
}

/* ── HELPER: hapus session (logout) ── */
function clearSession() {
  localStorage.removeItem('siakad_user');
  localStorage.removeItem('siakad_role');
  localStorage.removeItem('siakad_remember');
}

/* ── HELPER: fetch wrapper dengan auth header ── */
async function apiFetch(endpoint, options = {}) {
  const token = getToken();
  const isFormData = options.body instanceof FormData;
  const headers = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    'Accept': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await res.json();

    // Token expired / tidak valid
    if (res.status === 401) {
      clearSession();
      window.location.href = '/auth/login.html';
      return null;
    }

    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    console.error('API Error:', err);
    return { ok: false, status: 0, data: { message: 'Tidak dapat terhubung ke server.' } };
  }
}

/* ================================================================
   AUTH
   ================================================================ */
const Auth = {

  async login(username, password) {
    return apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  async logout() {
    const res = await apiFetch('/auth/logout', { method: 'POST' });
    clearSession();
    return res;
  },

  async me() {
    return apiFetch('/auth/me');
  },

  async forgotPassword(email) {
    return apiFetch('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  async resetPassword(token, email, password, passwordConfirmation) {
    return apiFetch('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      }),
    });
  },
};

/* ================================================================
   MAHASISWA
   ================================================================ */
const MahasiswaAPI = {

  async dashboard() {
    return apiFetch('/mahasiswa/dashboard');
  },

  async profil() {
    return apiFetch('/mahasiswa/profil');
  },

  async updateProfil(data) {
    return apiFetch('/mahasiswa/profil', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async krs() {
    return apiFetch('/mahasiswa/krs');
  },

  async tambahKrs(kelasId) {
    return apiFetch('/mahasiswa/krs', {
      method: 'POST',
      body: JSON.stringify({ kelas_id: kelasId }),
    });
  },

  async hapusKrs(id) {
    return apiFetch(`/mahasiswa/krs/${id}`, { method: 'DELETE' });
  },

  async khs(semesterId = null) {
    const query = semesterId ? `?semester_id=${semesterId}` : '';
    return apiFetch(`/mahasiswa/khs${query}`);
  },

  async jadwal() {
    return apiFetch('/mahasiswa/jadwal');
  },

  async absensi() {
    return apiFetch('/mahasiswa/absensi');
  },

  async pembayaran() {
    return apiFetch('/mahasiswa/pembayaran');
  },

  async bayar(nominal, noReferensi) {
    return apiFetch('/mahasiswa/pembayaran', {
      method: 'POST',
      body: JSON.stringify({ nominal, no_referensi: noReferensi }),
    });
  },

  async dokumen() {
    return apiFetch('/mahasiswa/dokumen');
  },

  async ajukanSurat(jenisSurat, keperluan) {
    return apiFetch('/mahasiswa/dokumen', {
      method: 'POST',
      body: JSON.stringify({ jenis_surat: jenisSurat, keperluan }),
    });
  },

  async detailSurat(id) {
    return apiFetch(`/mahasiswa/dokumen/${id}`);
  },

  async ujian() {
    return apiFetch('/mahasiswa/ujian');
  },

  async detailUjian(id) {
    return apiFetch(`/mahasiswa/ujian/${id}`);
  },

  async pengumuman(kategori = null) {
    const query = kategori ? `?kategori=${kategori}` : '';
    return apiFetch(`/mahasiswa/pengumuman${query}`);
  },

  async detailPengumuman(id) {
    return apiFetch(`/mahasiswa/pengumuman/${id}`);
  },
  async katalogKrs() {
    return apiFetch('/mahasiswa/krs/katalog');
  },

  async transkrip() {
    return apiFetch('/mahasiswa/transkrip');
  },

  async soalUjian(ujianId) {
    return apiFetch(`/mahasiswa/ujian/${ujianId}/soal`);
  },

  async jawabSoal(ujianId, soalId, jawaban, ragu = false) {
    return apiFetch(`/mahasiswa/ujian/${ujianId}/jawab`, {
      method: 'POST',
      body: JSON.stringify({ soal_id: soalId, jawaban, ragu }),
    });
  },

  async submitUjian(ujianId) {
    return apiFetch(`/mahasiswa/ujian/${ujianId}/submit`, {
      method: 'POST',
    });
  },

  async laporPelanggaran(ujianId, deskripsi) {
    return apiFetch(`/mahasiswa/ujian/${ujianId}/pelanggaran`, {
      method: 'POST',
      body: JSON.stringify({ deskripsi }),
    });
  },

  async pembahasanUjian(ujianId) {
    return apiFetch(`/mahasiswa/ujian/${ujianId}/pembahasan`);
  },

  async gantiPassword(data) {
    return apiFetch('/mahasiswa/profil/password', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async uploadFotoProfil(file) {
    const formData = new FormData();
    formData.append('foto', file);
    return apiFetch('/mahasiswa/profil/foto', {
      method: 'POST',
      body: formData,
    });
  },
};

/* ================================================================
   DOSEN
   ================================================================ */
const DosenAPI = {

  async dashboard() {
    return apiFetch('/dosen/dashboard');
  },

  async kelas() {
    return apiFetch('/dosen/kelas');
  },

  async detailKelas(id) {
    return apiFetch(`/dosen/kelas/${id}`);
  },

  async nilai(kelasId) {
    return apiFetch(`/dosen/kelas/${kelasId}/nilai`);
  },

  async inputNilai(kelasId, data) {
    return apiFetch(`/dosen/kelas/${kelasId}/nilai`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateNilai(kelasId, nilaiId, data) {
    return apiFetch(`/dosen/kelas/${kelasId}/nilai/${nilaiId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async absensi(kelasId) {
    return apiFetch(`/dosen/kelas/${kelasId}/absensi`);
  },

  async updateAbsensi(kelasId, absensiId, data) {
    return apiFetch(`/dosen/kelas/${kelasId}/absensi/${absensiId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async catatPertemuan(kelasId, tanggal, kehadiran) {
    return apiFetch(`/dosen/kelas/${kelasId}/absensi/catat-pertemuan`, {
      method: 'POST',
      body: JSON.stringify({ tanggal, kehadiran }),
    });
  },

  async bimbingan() {
    return apiFetch('/dosen/bimbingan');
  },

  async detailBimbingan(mahasiswaId) {
    return apiFetch(`/dosen/bimbingan/${mahasiswaId}`);
  },

  async krs(status = null) {
    const query = status ? `?status=${status}` : '';
    return apiFetch(`/dosen/krs${query}`);
  },

  async setujuiKrs(id, catatanPa = '') {
    return apiFetch(`/dosen/krs/${id}/setujui`, {
      method: 'PUT',
      body: JSON.stringify({ catatan_pa: catatanPa }),
    });
  },

  async tolakKrs(id, catatanPa) {
    return apiFetch(`/dosen/krs/${id}/tolak`, {
      method: 'PUT',
      body: JSON.stringify({ catatan_pa: catatanPa }),
    });
  },

  async ujian() {
    return apiFetch('/dosen/ujian');
  },

  async buatUjian(data) {
    return apiFetch('/dosen/ujian', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateUjian(id, data) {
    return apiFetch(`/dosen/ujian/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async hapusUjian(id) {
    return apiFetch(`/dosen/ujian/${id}`, { method: 'DELETE' });
  },
  async profil() {
    return apiFetch('/dosen/profil');
  },

  async updateProfil(data) {
    return apiFetch('/dosen/profil', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async gantiPassword(data) {
    return apiFetch('/dosen/profil/password', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async uploadFotoProfil(file) {
    const formData = new FormData();
    formData.append('foto', file);
    return apiFetch('/dosen/profil/foto', {
      method: 'POST',
      body: formData,
    });
  },

  async tambahCatatan(mahasiswaId, data) {
    return apiFetch(`/dosen/bimbingan/${mahasiswaId}/catatan`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async soalUjian(ujianId) {
    return apiFetch(`/dosen/ujian/${ujianId}/soal`);
  },

  async tambahSoal(ujianId, data) {
    return apiFetch(`/dosen/ujian/${ujianId}/soal`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateSoal(ujianId, soalId, data) {
    return apiFetch(`/dosen/ujian/${ujianId}/soal/${soalId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async hapusSoal(ujianId, soalId) {
    return apiFetch(`/dosen/ujian/${ujianId}/soal/${soalId}`, {
      method: 'DELETE',
    });
  },

  async hasilUjian(ujianId) {
    return apiFetch(`/dosen/ujian/${ujianId}/hasil`);
  },
};

/* ================================================================
   ADMIN
   ================================================================ */
const AdminAPI = {

  async dashboard() {
    return apiFetch('/admin/dashboard');
  },

  // Mahasiswa
  async mahasiswa(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/admin/mahasiswa${query ? '?' + query : ''}`);
  },

  async detailMahasiswa(id) {
    return apiFetch(`/admin/mahasiswa/${id}`);
  },

  async tambahMahasiswa(data) {
    return apiFetch('/admin/mahasiswa', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateMahasiswa(id, data) {
    return apiFetch(`/admin/mahasiswa/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async hapusMahasiswa(id) {
    return apiFetch(`/admin/mahasiswa/${id}`, { method: 'DELETE' });
  },

  // Dosen
  async dosen(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/admin/dosen${query ? '?' + query : ''}`);
  },

  async tambahDosen(data) {
    return apiFetch('/admin/dosen', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateDosen(id, data) {
    return apiFetch(`/admin/dosen/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async hapusDosen(id) {
    return apiFetch(`/admin/dosen/${id}`, { method: 'DELETE' });
  },

  // Mata Kuliah
  async mataKuliah(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/admin/mata-kuliah${query ? '?' + query : ''}`);
  },

  async tambahMataKuliah(data) {
    return apiFetch('/admin/mata-kuliah', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateMataKuliah(id, data) {
    return apiFetch(`/admin/mata-kuliah/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async hapusMataKuliah(id) {
    return apiFetch(`/admin/mata-kuliah/${id}`, { method: 'DELETE' });
  },

  // Kelas (jadwal kuliah)
  async kelas(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/admin/kelas${query ? '?' + query : ''}`);
  },

  async detailKelas(id) {
    return apiFetch(`/admin/kelas/${id}`);
  },

  async tambahKelas(data) {
    return apiFetch('/admin/kelas', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateKelas(id, data) {
    return apiFetch(`/admin/kelas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async hapusKelas(id) {
    return apiFetch(`/admin/kelas/${id}`, { method: 'DELETE' });
  },

  // Semester
  async semester() {
    return apiFetch('/admin/semester');
  },

  async tambahSemester(data) {
    return apiFetch('/admin/semester', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateSemester(id, data) {
    return apiFetch(`/admin/semester/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Pembayaran
  async pembayaran(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/admin/pembayaran${query ? '?' + query : ''}`);
  },

  async konfirmasiPembayaran(id, noReferensi = '') {
    return apiFetch(`/admin/pembayaran/${id}/konfirmasi`, {
      method: 'PUT',
      body: JSON.stringify({ no_referensi: noReferensi }),
    });
  },

  // Surat
  async surat(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/admin/surat${query ? '?' + query : ''}`);
  },

  async prosesSurat(id) {
    return apiFetch(`/admin/surat/${id}/proses`, { method: 'PUT' });
  },

  async selesaikanSurat(id, catatan = '') {
    return apiFetch(`/admin/surat/${id}/selesai`, {
      method: 'PUT',
      body: JSON.stringify({ catatan }),
    });
  },

  async tolakSurat(id, catatan) {
    return apiFetch(`/admin/surat/${id}/tolak`, {
      method: 'PUT',
      body: JSON.stringify({ catatan }),
    });
  },

  // Pengumuman
  async pengumuman(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/admin/pengumuman${query ? '?' + query : ''}`);
  },

  async buatPengumuman(data) {
    return apiFetch('/admin/pengumuman', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updatePengumuman(id, data) {
    return apiFetch(`/admin/pengumuman/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async hapusPengumuman(id) {
    return apiFetch(`/admin/pengumuman/${id}`, { method: 'DELETE' });
  },

  // Ujian
  async ujian(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/admin/ujian${query ? '?' + query : ''}`);
  },

  async batalkanUjian(id) {
    return apiFetch(`/admin/ujian/${id}/batalkan`, { method: 'PUT' });
  },

  // KTM
  async ktm(mahasiswaId) {
    return apiFetch(`/admin/ktm/${mahasiswaId}`);
  },

  async generateKtm(mahasiswaId, berlakuHingga = null) {
    return apiFetch(`/admin/ktm/${mahasiswaId}/generate`, {
      method: 'POST',
      body: JSON.stringify(berlakuHingga ? { berlaku_hingga: berlakuHingga } : {}),
    });
  },

  // Laporan
  async laporanMahasiswa(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/admin/laporan/mahasiswa${query ? '?' + query : ''}`);
  },

  async laporanKeuangan(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/admin/laporan/keuangan${query ? '?' + query : ''}`);
  },

  async laporanAkademik(semesterId) {
    return apiFetch(`/admin/laporan/akademik?semester_id=${semesterId}`);
  },
};
