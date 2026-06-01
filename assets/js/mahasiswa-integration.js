/* ================================================================
   SIAKAD STAI DILWA — mahasiswa-integration.js
   Auth check + sidebar update + API wrapper untuk panel mahasiswa
   ================================================================ */
(function() {
  const session = JSON.parse(localStorage.getItem('siakad_user') || 'null');
  if (!session || session.role !== 'mahasiswa') {
    window.location.href = '../auth/login.html';
    return;
  }
  window.addEventListener('DOMContentLoaded', () => {
    const nameEl = document.querySelector('.sidebar-profile-info strong');
    const subEl  = document.querySelector('.sidebar-profile-info small');
    if (nameEl && session.profil) {
      nameEl.textContent = session.profil.nama || session.username;
      if (subEl) subEl.textContent = session.profil.nim || '';
    }
  });
})();

/* ── MahasiswaAPI wrapper ── */
const MahasiswaAPI = {
  async dashboard()          { return apiFetch('/mahasiswa/dashboard'); },
  async profil()             { return apiFetch('/mahasiswa/profil'); },
  async updateProfil(data)   { return apiFetch('/mahasiswa/profil', { method:'PUT', body:JSON.stringify(data) }); },
  async krs()                { return apiFetch('/mahasiswa/krs'); },
  async tambahKrs(kelasId)   { return apiFetch('/mahasiswa/krs', { method:'POST', body:JSON.stringify({ kelas_id: kelasId }) }); },
  async hapusKrs(id)         { return apiFetch(`/mahasiswa/krs/${id}`, { method:'DELETE' }); },
  async khs(semesterId=null) { return apiFetch('/mahasiswa/khs' + (semesterId ? `?semester_id=${semesterId}` : '')); },
  async jadwal()             { return apiFetch('/mahasiswa/jadwal'); },
  async absensi()            { return apiFetch('/mahasiswa/absensi'); },
  async pembayaran()         { return apiFetch('/mahasiswa/pembayaran'); },
  async bayar(nominal, noRef){ return apiFetch('/mahasiswa/pembayaran', { method:'POST', body:JSON.stringify({ nominal, no_referensi: noRef }) }); },
  async dokumen()            { return apiFetch('/mahasiswa/dokumen'); },
  async detailSurat(id)      { return apiFetch(`/mahasiswa/dokumen/${id}`); },
  async ajukanSurat(jenis, keperluan) { return apiFetch('/mahasiswa/dokumen', { method:'POST', body:JSON.stringify({ jenis_surat: jenis, keperluan }) }); },
  async ujian()              { return apiFetch('/mahasiswa/ujian'); },
  async detailUjian(id)      { return apiFetch(`/mahasiswa/ujian/${id}`); },
  async pengumuman(kategori=null) { return apiFetch('/mahasiswa/pengumuman' + (kategori ? `?kategori=${kategori}` : '')); },
  async detailPengumuman(id) { return apiFetch(`/mahasiswa/pengumuman/${id}`); },
};
