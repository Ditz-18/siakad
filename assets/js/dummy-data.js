/* ================================================================
   SIAKAD DITZ UNIVERSITY — dummy-data.js
   Semua data statis untuk Stage 1 (Frontend Only)
   Di Stage 2, file ini diganti dengan fetch ke PHP/MySQL
   ================================================================ */

const SIAKAD_DATA = {

  /* ── SEMESTER AKTIF ── */
  semester: {
    id: 'SEM-2024-1',
    nama: 'Ganjil 2024/2025',
    tahun: '2024/2025',
    tanggalMulai: '2024-09-02',
    tanggalSelesai: '2025-01-31',
    batasKRS: '2024-09-20',
    status: 'Aktif'
  },

  /* ── DATA MAHASISWA (user aktif saat login) ── */
  mahasiswa: {
    id: 'MHS-001',
    nim: '2021010042',
    nama: 'Rizki Maulana Putra',
    namaPendek: 'Rizki Maulana',
    prodi: 'Teknik Informatika',
    fakultas: 'Fakultas Teknik',
    angkatan: 2021,
    semesterAktif: 7,
    dosenPA: 'Dr. Hendra Wijaya, M.Kom.',
    emailAkademik: '2021010042@student.ditz.ac.id',
    noHP: '081234567890',
    emailPribadi: 'rizkiputra@gmail.com',
    tempatLahir: 'Bandung',
    tanggalLahir: '2003-04-15',
    alamat: 'Jl. Sukajadi No. 45, Bandung',
    namaAyah: 'Bambang Santoso',
    namaIbu: 'Siti Rahayu',
    noHPWali: '085678901234',
    ipk: 3.72,
    sksLulus: 108,
    sksTotalWajib: 144,
    foto: null,
    ktm: {
      nomorKTM: 'KTM-2021010042-001',
      berlakuHingga: '2025-08-31',
      status: 'Aktif'
    }
  },

  /* ── DATA DOSEN (user aktif saat login sebagai dosen) ── */
  dosen: {
    id: 'DSN-012',
    nip: '198803152015041001',
    nama: 'Dr. Hendra Wijaya, M.Kom.',
    namaPendek: 'Dr. Hendra',
    prodi: 'Teknik Informatika',
    fakultas: 'Fakultas Teknik',
    jabatan: 'Lektor',
    golongan: 'IIIb',
    emailAkademik: 'hendra.wijaya@dosen.ditz.ac.id',
    noHP: '081398765432',
    foto: null
  },

  /* ── DATA ADMIN (user aktif saat login sebagai admin) ── */
  admin: {
    id: 'ADM-001',
    username: 'admin',
    nama: 'Siska Permatasari, S.Kom.',
    jabatan: 'Kepala Bagian Akademik',
    emailAkademik: 'siska@ditz.ac.id',
    foto: null
  },

  /* ── KRS MAHASISWA ── */
  krs: {
    status: 'Disetujui', // Draft | Disetujui | Ditolak
    totalSKS: 20,
    maxSKS: 24,
    mataKuliah: [
      { kode:'IF701', nama:'Kecerdasan Buatan', sks:3, dosen:'Dr. Hendra Wijaya', jadwal:'Senin 08:00-10:30', ruang:'Lab 301', warna:'#1B3A6B' },
      { kode:'IF703', nama:'Keamanan Jaringan', sks:3, dosen:'Dr. Irwan Saputra, M.T.', jadwal:'Selasa 10:30-13:00', ruang:'R. 204', warna:'#1A7A42' },
      { kode:'IF705', nama:'Pemrograman Web Lanjut', sks:3, dosen:'Rina Kusuma, M.Kom.', jadwal:'Rabu 08:00-10:30', ruang:'Lab 302', warna:'#C47D0A' },
      { kode:'IF707', nama:'Manajemen Proyek TI', sks:2, dosen:'Budi Santoso, M.M.', jadwal:'Kamis 13:00-14:40', ruang:'R. 101', warna:'#BE3328' },
      { kode:'IF709', nama:'Seminar Proposal Skripsi', sks:2, dosen:'Dr. Hendra Wijaya', jadwal:'Jumat 08:00-09:40', ruang:'R. 302', warna:'#1760A0' },
      { kode:'MK601', nama:'Kewirausahaan', sks:2, dosen:'Drs. Ahmad Fauzi, M.B.A.', jadwal:'Sabtu 08:00-09:40', ruang:'R. 201', warna:'#6C3B9A' },
      { kode:'IF711', nama:'Analisis Big Data', sks:3, dosen:'Dr. Siti Aminah, M.Cs.', jadwal:'Senin 13:00-15:30', ruang:'Lab 303', warna:'#0F6E56' },
      { kode:'IF713', nama:'Cloud Computing', sks:2, dosen:'Ir. Denny Kurnia, M.T.', jadwal:'Rabu 13:00-14:40', ruang:'Lab 304', warna:'#7A4E00' }
    ],
    katalog: [
      { kode:'IF715', nama:'Internet of Things', sks:3, dosen:'Dr. Fajar Nugraha', jadwal:'Selasa 08:00-10:30', ruang:'Lab 305', kuotaTerisi:28, kuotaTotal:30 },
      { kode:'IF717', nama:'Pengolahan Citra Digital', sks:3, dosen:'Dr. Yuni Astuti', jadwal:'Kamis 08:00-10:30', ruang:'Lab 301', kuotaTerisi:30, kuotaTotal:30 },
      { kode:'IF719', nama:'Algoritma Lanjutan', sks:3, dosen:'Eko Prasetyo, M.Cs.', jadwal:'Jumat 10:00-12:30', ruang:'R. 205', kuotaTerisi:15, kuotaTotal:35 }
    ]
  },

  /* ── KHS PER SEMESTER ── */
  khs: {
    'Semester 1': {
      ips: 3.65,
      mataKuliah: [
        { kode:'IF101', nama:'Matematika Diskrit', sks:3, nilai:82, grade:'A-', bobot:3.7, mutu:11.1, lulus:true },
        { kode:'IF103', nama:'Pengantar Pemrograman', sks:3, nilai:88, grade:'A', bobot:4.0, mutu:12.0, lulus:true },
        { kode:'IF105', nama:'Fisika Dasar', sks:2, nilai:75, grade:'B+', bobot:3.3, mutu:6.6, lulus:true },
        { kode:'MK101', nama:'Bahasa Indonesia', sks:2, nilai:85, grade:'A', bobot:4.0, mutu:8.0, lulus:true },
        { kode:'MK103', nama:'Pendidikan Pancasila', sks:2, nilai:80, grade:'A-', bobot:3.7, mutu:7.4, lulus:true },
        { kode:'IF107', nama:'Kalkulus I', sks:3, nilai:72, grade:'B', bobot:3.0, mutu:9.0, lulus:true }
      ]
    },
    'Semester 2': {
      ips: 3.55,
      mataKuliah: [
        { kode:'IF201', nama:'Struktur Data', sks:3, nilai:85, grade:'A', bobot:4.0, mutu:12.0, lulus:true },
        { kode:'IF203', nama:'Pemrograman Berorientasi Objek', sks:3, nilai:80, grade:'A-', bobot:3.7, mutu:11.1, lulus:true },
        { kode:'IF205', nama:'Basis Data', sks:3, nilai:78, grade:'B+', bobot:3.3, mutu:9.9, lulus:true },
        { kode:'IF207', nama:'Sistem Operasi', sks:3, nilai:70, grade:'B', bobot:3.0, mutu:9.0, lulus:true },
        { kode:'MK201', nama:'Bahasa Inggris I', sks:2, nilai:83, grade:'A-', bobot:3.7, mutu:7.4, lulus:true },
        { kode:'IF209', nama:'Kalkulus II', sks:3, nilai:68, grade:'B-', bobot:2.7, mutu:8.1, lulus:true }
      ]
    },
    'Semester 3': {
      ips: 3.80,
      mataKuliah: [
        { kode:'IF301', nama:'Jaringan Komputer', sks:3, nilai:90, grade:'A', bobot:4.0, mutu:12.0, lulus:true },
        { kode:'IF303', nama:'Pemrograman Web', sks:3, nilai:88, grade:'A', bobot:4.0, mutu:12.0, lulus:true },
        { kode:'IF305', nama:'Rekayasa Perangkat Lunak', sks:3, nilai:82, grade:'A-', bobot:3.7, mutu:11.1, lulus:true },
        { kode:'IF307', nama:'Algoritma & Kompleksitas', sks:3, nilai:79, grade:'B+', bobot:3.3, mutu:9.9, lulus:true },
        { kode:'MK301', nama:'Bahasa Inggris II', sks:2, nilai:85, grade:'A', bobot:4.0, mutu:8.0, lulus:true }
      ]
    },
    'Semester 4': {
      ips: 3.70,
      mataKuliah: [
        { kode:'IF401', nama:'Interaksi Manusia Komputer', sks:3, nilai:86, grade:'A', bobot:4.0, mutu:12.0, lulus:true },
        { kode:'IF403', nama:'Pemrograman Mobile', sks:3, nilai:84, grade:'A-', bobot:3.7, mutu:11.1, lulus:true },
        { kode:'IF405', nama:'Statistika & Probabilitas', sks:3, nilai:77, grade:'B+', bobot:3.3, mutu:9.9, lulus:true },
        { kode:'IF407', nama:'Sistem Informasi', sks:3, nilai:81, grade:'A-', bobot:3.7, mutu:11.1, lulus:true },
        { kode:'MK401', nama:'Etika Profesi', sks:2, nilai:87, grade:'A', bobot:4.0, mutu:8.0, lulus:true }
      ]
    },
    'Semester 5': {
      ips: 3.60,
      mataKuliah: [
        { kode:'IF501', nama:'Machine Learning', sks:3, nilai:83, grade:'A-', bobot:3.7, mutu:11.1, lulus:true },
        { kode:'IF503', nama:'Pemrograman Paralel', sks:3, nilai:76, grade:'B+', bobot:3.3, mutu:9.9, lulus:true },
        { kode:'IF505', nama:'Metodologi Penelitian', sks:2, nilai:85, grade:'A', bobot:4.0, mutu:8.0, lulus:true },
        { kode:'IF507', nama:'Grafika Komputer', sks:3, nilai:79, grade:'B+', bobot:3.3, mutu:9.9, lulus:true },
        { kode:'IF509', nama:'Kerja Praktek', sks:3, nilai:88, grade:'A', bobot:4.0, mutu:12.0, lulus:true }
      ]
    },
    'Semester 6': {
      ips: 3.85,
      mataKuliah: [
        { kode:'IF601', nama:'Keamanan Informasi', sks:3, nilai:89, grade:'A', bobot:4.0, mutu:12.0, lulus:true },
        { kode:'IF603', nama:'Pengembangan Aplikasi Enterprise', sks:3, nilai:86, grade:'A', bobot:4.0, mutu:12.0, lulus:true },
        { kode:'IF605', nama:'Data Warehouse', sks:3, nilai:82, grade:'A-', bobot:3.7, mutu:11.1, lulus:true },
        { kode:'IF607', nama:'Pemrograman Fungsional', sks:3, nilai:80, grade:'A-', bobot:3.7, mutu:11.1, lulus:true },
        { kode:'MK601', nama:'Kewirausahaan', sks:2, nilai:91, grade:'A', bobot:4.0, mutu:8.0, lulus:true }
      ]
    }
  },

  /* ── JADWAL KULIAH MAHASISWA ── */
  jadwal: [
    { id:1, kode:'IF701', nama:'Kecerdasan Buatan',     hari:'Senin',  jamMulai:'08:00', jamSelesai:'10:30', sks:3, dosen:'Dr. Hendra Wijaya', ruang:'Lab 301', warna:'#1B3A6B' },
    { id:2, kode:'IF711', nama:'Analisis Big Data',     hari:'Senin',  jamMulai:'13:00', jamSelesai:'15:30', sks:3, dosen:'Dr. Siti Aminah', ruang:'Lab 303', warna:'#0F6E56' },
    { id:3, kode:'IF703', nama:'Keamanan Jaringan',     hari:'Selasa', jamMulai:'10:30', jamSelesai:'13:00', sks:3, dosen:'Dr. Irwan Saputra', ruang:'R. 204', warna:'#1A7A42' },
    { id:4, kode:'IF705', nama:'Pemrograman Web Lanjut',hari:'Rabu',   jamMulai:'08:00', jamSelesai:'10:30', sks:3, dosen:'Rina Kusuma', ruang:'Lab 302', warna:'#C47D0A' },
    { id:5, kode:'IF713', nama:'Cloud Computing',       hari:'Rabu',   jamMulai:'13:00', jamSelesai:'14:40', sks:2, dosen:'Ir. Denny Kurnia', ruang:'Lab 304', warna:'#7A4E00' },
    { id:6, kode:'IF707', nama:'Manajemen Proyek TI',   hari:'Kamis',  jamMulai:'13:00', jamSelesai:'14:40', sks:2, dosen:'Budi Santoso', ruang:'R. 101', warna:'#BE3328' },
    { id:7, kode:'IF709', nama:'Seminar Proposal',      hari:'Jumat',  jamMulai:'08:00', jamSelesai:'09:40', sks:2, dosen:'Dr. Hendra Wijaya', ruang:'R. 302', warna:'#1760A0' },
    { id:8, kode:'MK601', nama:'Kewirausahaan',         hari:'Sabtu',  jamMulai:'08:00', jamSelesai:'09:40', sks:2, dosen:'Drs. Ahmad Fauzi', ruang:'R. 201', warna:'#6C3B9A' }
  ],

  /* ── ABSENSI MAHASISWA ── */
  absensi: [
    {
      kode:'IF701', nama:'Kecerdasan Buatan', totalPertemuan:14,
      hadir:13, izin:1, sakit:0, alpha:0,
      detail: [
        {no:1, tgl:'2 Sep 2024', status:'Hadir'}, {no:2, tgl:'9 Sep 2024', status:'Hadir'},
        {no:3, tgl:'16 Sep 2024', status:'Izin'}, {no:4, tgl:'23 Sep 2024', status:'Hadir'},
        {no:5, tgl:'30 Sep 2024', status:'Hadir'}, {no:6, tgl:'7 Okt 2024', status:'Hadir'},
        {no:7, tgl:'14 Okt 2024', status:'Hadir'}, {no:8, tgl:'21 Okt 2024', status:'Hadir'},
        {no:9, tgl:'28 Okt 2024', status:'Hadir'}, {no:10, tgl:'4 Nov 2024', status:'Hadir'},
        {no:11, tgl:'11 Nov 2024', status:'Hadir'}, {no:12, tgl:'18 Nov 2024', status:'Hadir'},
        {no:13, tgl:'25 Nov 2024', status:'Hadir'}, {no:14, tgl:'2 Des 2024', status:'Hadir'}
      ]
    },
    {
      kode:'IF703', nama:'Keamanan Jaringan', totalPertemuan:14,
      hadir:11, izin:1, sakit:1, alpha:1,
      detail: [
        {no:1, tgl:'3 Sep 2024', status:'Hadir'}, {no:2, tgl:'10 Sep 2024', status:'Hadir'},
        {no:3, tgl:'17 Sep 2024', status:'Sakit'}, {no:4, tgl:'24 Sep 2024', status:'Hadir'},
        {no:5, tgl:'1 Okt 2024', status:'Hadir'}, {no:6, tgl:'8 Okt 2024', status:'Alpha'},
        {no:7, tgl:'15 Okt 2024', status:'Hadir'}, {no:8, tgl:'22 Okt 2024', status:'Izin'},
        {no:9, tgl:'29 Okt 2024', status:'Hadir'}, {no:10, tgl:'5 Nov 2024', status:'Hadir'},
        {no:11, tgl:'12 Nov 2024', status:'Hadir'}, {no:12, tgl:'19 Nov 2024', status:'Hadir'},
        {no:13, tgl:'26 Nov 2024', status:'Hadir'}, {no:14, tgl:'3 Des 2024', status:'Hadir'}
      ]
    },
    {
      kode:'IF705', nama:'Pemrograman Web Lanjut', totalPertemuan:14,
      hadir:14, izin:0, sakit:0, alpha:0,
      detail: Array.from({length:14}, (_,i) => ({no:i+1, tgl:`${4+i*7} Sep-Des 2024`, status:'Hadir'}))
    },
    {
      kode:'IF707', nama:'Manajemen Proyek TI', totalPertemuan:14,
      hadir:10, izin:2, sakit:2, alpha:0,
      detail: [
        {no:1, tgl:'5 Sep 2024', status:'Hadir'},{no:2, tgl:'12 Sep 2024', status:'Hadir'},
        {no:3, tgl:'19 Sep 2024', status:'Izin'},{no:4, tgl:'26 Sep 2024', status:'Hadir'},
        {no:5, tgl:'3 Okt 2024', status:'Sakit'},{no:6, tgl:'10 Okt 2024', status:'Hadir'},
        {no:7, tgl:'17 Okt 2024', status:'Hadir'},{no:8, tgl:'24 Okt 2024', status:'Sakit'},
        {no:9, tgl:'31 Okt 2024', status:'Izin'},{no:10, tgl:'7 Nov 2024', status:'Hadir'},
        {no:11, tgl:'14 Nov 2024', status:'Hadir'},{no:12, tgl:'21 Nov 2024', status:'Hadir'},
        {no:13, tgl:'28 Nov 2024', status:'Hadir'},{no:14, tgl:'5 Des 2024', status:'Hadir'}
      ]
    }
  ],

  /* ── UJIAN ONLINE ── */
  ujian: [
    {
      id: 'UJN-001',
      nama: 'UTS Kecerdasan Buatan',
      kodeMK: 'IF701', jumlahSoal: 20, durasi: 60,
      tanggal: '2024-11-05',
      status: 'Selesai', nilai: 85, benar: 17,
      soal: [
        { id:1, teks:'Apa kepanjangan dari AI?', opsi:['Artificial Intelligence','Automatic Information','Advanced Interface','Automated Instruction'], jawaban:0 },
        { id:2, teks:'Algoritma pencarian yang menggunakan heuristik disebut?', opsi:['BFS','DFS','A*','Dijkstra'], jawaban:2 },
        { id:3, teks:'Expert System termasuk kategori AI apa?', opsi:['Machine Learning','Knowledge-Based System','Neural Network','Robotics'], jawaban:1 },
        { id:4, teks:'Turing Test diperkenalkan oleh?', opsi:['John McCarthy','Marvin Minsky','Alan Turing','Claude Shannon'], jawaban:2 },
        { id:5, teks:'Deep Learning adalah bagian dari?', opsi:['Symbolic AI','Machine Learning','Expert System','Rule-Based System'], jawaban:1 }
      ]
    },
    {
      id: 'UJN-002',
      nama: 'UTS Keamanan Jaringan',
      kodeMK: 'IF703', jumlahSoal: 25, durasi: 90,
      tanggal: '2024-11-08',
      status: 'Belum Dikerjakan', nilai: null, benar: null,
      soal: [
        { id:1, teks:'Serangan yang mengirim paket data berlebihan ke server disebut?', opsi:['Phishing','DoS','MitM','SQL Injection'], jawaban:1 },
        { id:2, teks:'SSL/TLS beroperasi pada layer OSI ke berapa?', opsi:['Layer 3','Layer 4','Layer 5','Layer 6'], jawaban:1 },
        { id:3, teks:'Firewall bekerja berdasarkan?', opsi:['Rules/Policy','Virus Database','Bandwidth','Latency'], jawaban:0 },
        { id:4, teks:'Teknik enkripsi yang menggunakan dua kunci berbeda disebut?', opsi:['Symmetric','Asymmetric','Hashing','Salting'], jawaban:1 },
        { id:5, teks:'Protokol yang digunakan untuk transfer file secara aman?', opsi:['FTP','HTTP','SFTP','SMTP'], jawaban:2 }
      ]
    },
    {
      id: 'UJN-003',
      nama: 'Kuis Pemrograman Web Lanjut',
      kodeMK: 'IF705', jumlahSoal: 15, durasi: 45,
      tanggal: '2024-10-25',
      status: 'Selesai', nilai: 93, benar: 14,
      soal: []
    }
  ],

  /* ── PEMBAYARAN UKT ── */
  pembayaran: {
    tagihan: {
      semester: 'Ganjil 2024/2025',
      nominal: 6500000,
      jatuhTempo: '2024-09-20',
      status: 'Lunas',
      invoice: 'INV-2024-042-001',
      tanggalBayar: '2024-09-15'
    },
    riwayat: [
      { invoice:'INV-2021-042-001', semester:'Ganjil 2021/2022', nominal:5000000, tanggalBayar:'2021-09-10', status:'Lunas' },
      { invoice:'INV-2022-042-001', semester:'Genap 2021/2022',  nominal:5000000, tanggalBayar:'2022-02-08', status:'Lunas' },
      { invoice:'INV-2022-042-002', semester:'Ganjil 2022/2023', nominal:5500000, tanggalBayar:'2022-09-12', status:'Lunas' },
      { invoice:'INV-2023-042-001', semester:'Genap 2022/2023',  nominal:5500000, tanggalBayar:'2023-02-14', status:'Lunas' },
      { invoice:'INV-2023-042-002', semester:'Ganjil 2023/2024', nominal:6000000, tanggalBayar:'2023-09-09', status:'Lunas' },
      { invoice:'INV-2024-042-001', semester:'Genap 2023/2024',  nominal:6000000, tanggalBayar:'2024-02-11', status:'Lunas' },
      { invoice:'INV-2024-042-002', semester:'Ganjil 2024/2025', nominal:6500000, tanggalBayar:'2024-09-15', status:'Lunas' }
    ]
  },

  /* ── PENGUMUMAN ── */
  pengumuman: [
    { id:1, judul:'Jadwal UTS Semester Ganjil 2024/2025', kategori:'Akademik', tanggal:'2024-10-28', penting:true, baru:true, isi:'Ujian Tengah Semester (UTS) akan dilaksanakan mulai tanggal 4 November 2024 hingga 15 November 2024. Seluruh mahasiswa wajib memperhatikan jadwal ujian masing-masing program studi. Mahasiswa yang kehadirannya kurang dari 75% tidak diperkenankan mengikuti UTS. Silakan cek jadwal lengkap di papan pengumuman akademik.' },
    { id:2, judul:'Batas Akhir Pembayaran UKT Semester Genap', kategori:'Keuangan', tanggal:'2024-10-25', penting:true, baru:true, isi:'Pembayaran UKT Semester Genap 2024/2025 dibuka mulai 15 Januari 2025. Batas akhir pembayaran adalah 31 Januari 2025. Mahasiswa yang belum melunasi UKT tidak dapat melakukan pengisian KRS untuk semester berikutnya.' },
    { id:3, judul:'Pelatihan Microsoft Office untuk Mahasiswa Baru', kategori:'Umum', tanggal:'2024-10-20', penting:false, baru:false, isi:'Unit Kegiatan Mahasiswa Teknologi menyelenggarakan pelatihan Microsoft Office gratis untuk mahasiswa angkatan 2024. Pelatihan akan dilaksanakan setiap Sabtu pukul 09.00-12.00 di Lab Komputer gedung D lantai 2.' },
    { id:4, judul:'Pengumuman Beasiswa Prestasi Semester Genap', kategori:'Akademik', tanggal:'2024-10-15', penting:false, baru:false, isi:'Pendaftaran beasiswa prestasi akademik untuk semester genap 2024/2025 telah dibuka. Mahasiswa dengan IPK minimal 3.50 dan tidak sedang menerima beasiswa lain dapat mendaftarkan diri ke bagian kemahasiswaan.' },
    { id:5, judul:'Libur Nasional Peringatan Hari Pahlawan', kategori:'Umum', tanggal:'2024-11-08', penting:false, baru:false, isi:'Sehubungan dengan Hari Pahlawan Nasional tanggal 10 November 2024, seluruh kegiatan akademik diliburkan pada hari tersebut. Perkuliahan kembali normal pada Senin, 11 November 2024.' }
  ],

  /* ── DATA SURAT ── */
  surat: [
    { id:'SRT-001', jenis:'Surat Keterangan Mahasiswa Aktif', keperluan:'Beasiswa Bidikmisi', tanggal:'2024-09-05', status:'Selesai' },
    { id:'SRT-002', jenis:'Surat Rekomendasi', keperluan:'Magang di PT Telkom Indonesia', tanggal:'2024-08-20', status:'Selesai' },
    { id:'SRT-003', jenis:'Surat Keterangan IPK', keperluan:'Pendaftaran Beasiswa Lembaga X', tanggal:'2024-10-10', status:'Diproses' }
  ],

  /* ── DATA KELAS DOSEN ── */
  kelasDosen: [
    { id:'KLS-001', kodeMK:'IF701', namaMK:'Kecerdasan Buatan', kelas:'IF-7A', hari:'Senin', jam:'08:00-10:30', ruang:'Lab 301', jmlMahasiswa:32, status:'Aktif' },
    { id:'KLS-002', kodeMK:'IF709', namaMK:'Seminar Proposal Skripsi', kelas:'IF-7B', hari:'Jumat', jam:'08:00-09:40', ruang:'R. 302', jmlMahasiswa:28, status:'Aktif' },
    { id:'KLS-003', kodeMK:'IF801', namaMK:'Skripsi', kelas:'IF-8A', hari:'-', jam:'-', ruang:'-', jmlMahasiswa:15, status:'Aktif' }
  ],

  /* ── MAHASISWA BIMBINGAN DOSEN ── */
  mahasiswaBimbingan: [
    { nim:'2021010042', nama:'Rizki Maulana Putra', angkatan:2021, semester:7, ipk:3.72, sksLulus:108, statusKRS:'Disetujui' },
    { nim:'2021010058', nama:'Dewi Rahmawati', angkatan:2021, semester:7, ipk:3.45, sksLulus:102, statusKRS:'Menunggu' },
    { nim:'2021010071', nama:'Farid Akbar Hidayat', angkatan:2021, semester:7, ipk:3.20, sksLulus:96, statusKRS:'Draft' },
    { nim:'2022010015', nama:'Nadia Putri Lestari', angkatan:2022, semester:5, ipk:3.88, sksLulus:72, statusKRS:'Disetujui' },
    { nim:'2022010033', nama:'Andi Prasetyo', angkatan:2022, semester:5, ipk:2.95, sksLulus:66, statusKRS:'Ditolak' },
    { nim:'2023010009', nama:'Sinta Melati', angkatan:2023, semester:3, ipk:3.60, sksLulus:36, statusKRS:'Disetujui' }
  ],

  /* ── DATA MAHASISWA UNTUK ADMIN ── */
  semuaMahasiswa: [
    { nim:'2021010001', nama:'Aisyah Putri Dewi', prodi:'Teknik Informatika', angkatan:2021, semester:7, ipk:3.85, status:'Aktif' },
    { nim:'2021010042', nama:'Rizki Maulana Putra', prodi:'Teknik Informatika', angkatan:2021, semester:7, ipk:3.72, status:'Aktif' },
    { nim:'2021010058', nama:'Dewi Rahmawati', prodi:'Teknik Informatika', angkatan:2021, semester:7, ipk:3.45, status:'Aktif' },
    { nim:'2022010015', nama:'Nadia Putri Lestari', prodi:'Sistem Informasi', angkatan:2022, semester:5, ipk:3.88, status:'Aktif' },
    { nim:'2022010033', nama:'Andi Prasetyo', prodi:'Teknik Informatika', angkatan:2022, semester:5, ipk:2.95, status:'Aktif' },
    { nim:'2023010009', nama:'Sinta Melati', prodi:'Manajemen Informatika', angkatan:2023, semester:3, ipk:3.60, status:'Aktif' },
    { nim:'2023010024', nama:'Bima Arya Wicaksono', prodi:'Sistem Informasi', angkatan:2023, semester:3, ipk:3.30, status:'Aktif' },
    { nim:'2024010005', nama:'Aulia Rahma Sari', prodi:'Teknik Informatika', angkatan:2024, semester:1, ipk:0, status:'Aktif' },
    { nim:'2024010011', nama:'Kevin Christianto', prodi:'Teknik Informatika', angkatan:2024, semester:1, ipk:0, status:'Aktif' },
    { nim:'2020010099', nama:'Arif Budiman', prodi:'Teknik Informatika', angkatan:2020, semester:9, ipk:3.10, status:'Aktif' }
  ],

  /* ── DATA DOSEN UNTUK ADMIN ── */
  semuaDosen: [
    { nip:'198803152015041001', nama:'Dr. Hendra Wijaya, M.Kom.', prodi:'Teknik Informatika', jabatan:'Lektor', kelasDiampu:3, status:'Aktif' },
    { nip:'197505102008012002', nama:'Dr. Irwan Saputra, M.T.', prodi:'Teknik Informatika', jabatan:'Lektor Kepala', kelasDiampu:4, status:'Aktif' },
    { nip:'198912202019032001', nama:'Rina Kusuma, M.Kom.', prodi:'Sistem Informasi', jabatan:'Asisten Ahli', kelasDiampu:3, status:'Aktif' },
    { nip:'196804081994031003', nama:'Drs. Ahmad Fauzi, M.B.A.', prodi:'Manajemen Informatika', jabatan:'Lektor Kepala', kelasDiampu:2, status:'Aktif' },
    { nip:'199102152020031001', nama:'Eko Prasetyo, M.Cs.', prodi:'Teknik Informatika', jabatan:'Tenaga Pengajar', kelasDiampu:3, status:'Aktif' }
  ],

  /* ── STATISTIK UNIVERSITAS (untuk Admin Dashboard) ── */
  statsUniversitas: {
    totalMahasiswaAktif: 1247,
    totalDosen: 68,
    totalMataKuliahAktif: 94,
    persentaseUKTTerbayar: 87,
    ujianBerjalan: [
      { mk:'Kecerdasan Buatan', kelas:'IF-7A', dosen:'Dr. Hendra Wijaya', peserta:32, selesai:28, pelanggaran:2, status:'Berlangsung' },
      { mk:'Keamanan Jaringan', kelas:'IF-7B', dosen:'Dr. Irwan Saputra', peserta:30, selesai:30, pelanggaran:0, status:'Selesai' },
      { mk:'Pemrograman Web Lanjut', kelas:'SI-5A', dosen:'Rina Kusuma', peserta:35, selesai:12, pelanggaran:1, status:'Berlangsung' }
    ]
  },

  /* ── NOTIFIKASI ── */
  notifikasi: [
    { id:1, ikon:'fa-file-pen', warna:'info', judul:'KRS Disetujui', deskripsi:'KRS semester Ganjil 2024/2025 telah disetujui oleh PA', waktu:'2 jam lalu' },
    { id:2, ikon:'fa-triangle-exclamation', warna:'warning', judul:'UTS Dimulai 4 November', deskripsi:'Persiapkan diri untuk UTS yang akan dimulai minggu depan', waktu:'1 hari lalu' },
    { id:3, ikon:'fa-bullhorn', warna:'navy', judul:'Pengumuman Baru', deskripsi:'Jadwal UTS Semester Ganjil 2024/2025 telah diterbitkan', waktu:'2 hari lalu' },
    { id:4, ikon:'fa-credit-card', warna:'success', judul:'Pembayaran UKT Berhasil', deskripsi:'UKT semester Ganjil 2024/2025 berhasil dikonfirmasi', waktu:'3 hari lalu' }
  ]
};

/* ================================================================
   HELPER — ambil data dengan simulasi async
   Di Stage 2, fungsi-fungsi ini diganti dengan fetch ke PHP
   ================================================================ */

function getData(key) {
  return new Promise(resolve => {
    setTimeout(() => resolve(SIAKAD_DATA[key]), 100);
  });
}

function getNestedData(...keys) {
  return new Promise(resolve => {
    let result = SIAKAD_DATA;
    for (const key of keys) result = result?.[key];
    setTimeout(() => resolve(result), 100);
  });
}
