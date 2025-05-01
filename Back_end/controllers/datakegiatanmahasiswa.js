
import Msib from '../models/msibmodel.js'; 
import Prestasi from '../models/prestasimodel.js'; 
import KerjaPraktik from '../models/kerjapraktikmodel.js'; 
import MagangMandiri from '../models/magangmandirimodel.js'; 
import TugasAkhir from '../models/tgamodel.js'; 
import Pmm from '../models/pmmmodel.js'; 
import Users from '../models/usermodel.js';
import Absensi from '../models/absensimodel.js';
import Dosen from '../models/dosenmodel.js';

const getKegiatanMahasiswaStats = async (req, res) => {
  try {
    const msibCount = await Msib.count();
    const prestasiCount = await Prestasi.count();
    const kerjaPraktikCount = await KerjaPraktik.count();
    const MagangMandiriCount = await MagangMandiri.count();
    const TugasAkhirCount = await TugasAkhir.count();
    const PmmCount = await Pmm.count();

    const kegiatanMahasiswaData = [
      { nama: 'MSIB', jumlah: msibCount },
      { nama: 'Prestasi', jumlah: prestasiCount },
      { nama: 'Kerja Praktik', jumlah: kerjaPraktikCount },
      { nama: 'Magang Mandiri', jumlah: MagangMandiriCount },
      { nama: 'Tugas Akhir', jumlah: TugasAkhirCount },
      { nama: 'Pmm', jumlah: PmmCount },
    ];

    res.json(kegiatanMahasiswaData);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Gagal mengambil data statistik kegiatan mahasiswa' });
  }
};

export { getKegiatanMahasiswaStats };

const getStats = async (req, res) => {
  try {
    const userCount = await Users.count();
    const absensiCount = await Absensi.count();
    const dosenCount = await Dosen.count();

    const stats = [
        { title: 'Users', value: userCount },
        { title: 'Absensi', value: absensiCount },
        { title: 'Dosen', value: dosenCount },
      ];

    res.json(stats);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Gagal mengambil data statistik kegiatan mahasiswa' });
  }
};


export { getStats };