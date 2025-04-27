import MagangMandiri from "../models/magangmandirimodel.js";
import upload from "../middleware/upload.js";


export const getMagangMandiri = async (req, res) => {
  try {
    const magang_mandiri = await MagangMandiri.findAll({
      attributes: ['id', 'nama', 'nim', 'judul', 'nama_perusahaan', 'tanggal_mulai', 'tanggal_selesai', 'konversi_nilai', 'laporan', 'sertifikat' ],
    });
    res.json(magang_mandiri);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const getMagangMandiriById = async (req, res) => {
  try {
    const magang_mandiri = await MagangMandiri.findOne({
      attributes: ['id', 'nama', 'nim', 'judul', 'nama_perusahaan', 'tanggal_mulai', 'tanggal_selesai', 'konversi_nilai', 'laporan',   'sertifikat' ],
      where: { id: req.params.id },
    });

    if (!magang_mandiri) {
      return res.status(404).json({ msg: "Program Magang Mandiri tidak ditemukan" });
    }

    res.json(magang_mandiri);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const createMagangMandiri = async (req, res) => {
  const { nama, nim, judul, nama_perusahaan, tanggal_mulai, tanggal_selesai } = req.body;
  const files = req.files;

  try {
      const Sertifikat = files.sertifikat?.[0]?.filename || null;
      const konversi_nilai = files.konversi_nilai?.[0]?.filename || null;
      const Laporan = files.laporan?.[0]?.filename || null;

    await MagangMandiri.create({
      nama,
      nim,
      judul,
      nama_perusahaan,
      tanggal_mulai,
      tanggal_selesai,
      sertifikat: Sertifikat,
      konversi_nilai,
      laporan: Laporan
    });

    res.status(201).json({ message: "Data Magang Mandiri berhasil ditambahkan" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menambahkan data Magang Mandiri" });
  }
};


export const updateMagangMandiri = async (req, res) => {
  try {
    const magang_mandiri = await MagangMandiri.findOne({ where: { id: req.params.id } });

    if (!magang_mandiri) {
      return res.status(404).json({ msg: "Program Magang Mandiri tidak ditemukan" });
    }

    const { nama, nim, judul, nama_perusahaan, tanggal_mulai, tanggal_selesai } = req.body;
    const files = req.files || {};

    const updatedData = {
      nama,
      nim,
      judul,
      nama_perusahaan,
      tanggal_mulai,
      tanggal_selesai,
      sertifikat: files.sertifikat?.[0]?.filename || magang_mandiri.sertifikat,
      konversi_nilai: files.konversi_nilai?.[0]?.filename || magang_mandiri.konversi_nilai,
      laporan: files.laporan?.[0]?.filename || magang_mandiri.laporan,
    };

    await magang_mandiri.update(updatedData);

    res.status(200).json({ msg: "Program Magang Mandiri berhasil diperbarui" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};



export const deleteMagangMandiri = async (req, res) => {
  try {
    const magang_mandiri = await MagangMandiri.findOne({ where: { id: req.params.id } });

    if (!magang_mandiri) {
      return res.status(404).json({ msg: "Program Magang Mandiri tidak ditemukan" });
    }

    await magang_mandiri.destroy();

    res.status(200).json({ msg: "Program Magang Mandiri berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
