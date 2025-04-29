import Pengabdian from "../models/pengabdianmodel.js";
import upload from "../middleware/upload.js";


export const getPengabdian = async (req, res) => {
  try {
    const { role, id } = req.user;

    let pengabdian;
    if (role === 'admin') {
      pengabdian = await Pengabdian.findAll({
        attributes: ['id', 'judul_pengabdian', 'nama_dosen', 'mitra', 'bentuk_kegiatan', 'lokasi', 'tahun', 'file_kegiatan']
      });
    } else if (role === 'user') {
      pengabdian = await Pengabdian.findAll({
        attributes: ['id', 'judul_pengabdian', 'nama_dosen', 'mitra', 'bentuk_kegiatan', 'lokasi', 'tahun', 'file_kegiatan'],
        where: { userId: id }
      });
    }
    res.json(pengabdian);
  } catch (error) {
    console.log(error);
  }
};


export const getPengabdianById = async (req, res) => {
  try {
    const { role, id } = req.user;

    const pengabdian = await Pengabdian.findOne({
      attributes: ['id', 'judul_pengabdian', 'nama_dosen', 'mitra', 'bentuk_kegiatan', 'lokasi', 'tahun', 'file_kegiatan'],
      where: { id: req.params.id }
    });

    if (!pengabdian) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    if (role === 'user' && absensi.userId !== id) {
      return res.status(403).json({ msg: "Akses ditolak" });
  }

    res.status(200).json(pengabdian);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const createPengabdian = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "File PDF harus diunggah!" });
    }

    const { judul_pengabdian, nama_dosen, mitra, bentuk_kegiatan, lokasi, tahun } = req.body;
    const file_kegiatan = req.file.filename;

    await Pengabdian.create({
      userId: req.user.id,
      judul_pengabdian,
      nama_dosen,
      mitra,
      bentuk_kegiatan,
      lokasi,
      tahun,
      file_kegiatan,
    });

    res.status(201).json({ msg: "Pengabdian berhasil dibuat!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const updatePengabdian = async (req, res) => {
  try {
    const pengabdian = await Pengabdian.findOne({
      where: { id: req.params.id }
    });

    if (!pengabdian) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    const { judul_pengabdian, nama_dosen, mitra, bentuk_kegiatan, lokasi, tahun } = req.body;
    let file_kegiatan = pengabdian.file_kegiatan;

    if (req.file) {
      file_kegiatan = req.file.filename;
    }

    await pengabdian.update({
      judul_pengabdian,
      nama_dosen,
      mitra,
      bentuk_kegiatan,
      lokasi,
      tahun,
      file_kegiatan
    });

    res.status(200).json({ msg: "Data berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


export const deletePengabdian = async (req, res) => {
  try {
    const pengabdian = await Pengabdian.findOne({
      where: { id: req.params.id }
    });

    if (!pengabdian) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    await pengabdian.destroy();

    res.status(200).json({ msg: "Pengabdian berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
