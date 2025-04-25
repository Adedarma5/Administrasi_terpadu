import Msib from "../models/msibmodel.js";
import upload from "../middleware/upload.js";


export const getMsib = async (req, res) => {
  try {
    const msib = await Msib.findAll({
      attributes: ['id', 'nama', 'nim', 'program', 'judul', 'mitra', 'tanggal_mulai', 'tanggal_selesai', 'lembar_pengesahan', 'laporan', 'projek', 'sertifikat', 'konversi_nilai'],
    });
    res.json(msib);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const getMsibById = async (req, res) => {
  try {
    const msib = await Msib.findOne({
      attributes: ['id', 'nama', 'nim', 'program', 'judul', 'mitra', 'tanggal_mulai', 'tanggal_selesai', 'lembar_pengesahan', 'laporan', 'projek', 'sertifikat', 'konversi_nilai'],
      where: { id: req.params.id },
    });

    if (!msib) {
      return res.status(404).json({ msg: "Program MSIB tidak ditemukan" });
    }

    res.json(msib);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const createMsib = async (req, res) => {
  const { nama, nim, program, judul, mitra, tanggal_mulai, tanggal_selesai } = req.body;
  const files = req.files;

  try {
    const lembarPengesahan = files.lembar_pengesahan?.[0]?.filename || null;
    const laporan = files.laporan?.[0]?.filename || null;
    const projek = files.projek?.[0]?.filename || null;
    const sertifikat = files.sertifikat?.[0]?.filename || null;
    const konversiNilai = files.konversi_nilai?.[0]?.filename || null;

    await Msib.create({
      nama,
      nim,
      program,
      judul,
      mitra,
      tanggal_mulai,
      tanggal_selesai,
      lembar_pengesahan: lembarPengesahan,
      laporan,
      projek,
      sertifikat,
      konversi_nilai: konversiNilai
    });

    res.status(201).json({ message: "Data MSIB berhasil ditambahkan" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menambahkan data MSIB" });
  }
};


export const updateMsib = async (req, res) => {
  try {
    const msib = await Msib.findOne({ where: { id: req.params.id } });

    if (!msib) {
      return res.status(404).json({ msg: "Program MSIB tidak ditemukan" });
    }

    const { nama, nim, program, judul, mitra, tanggal_mulai, tanggal_selesai } = req.body;
    const files = req.files || {};

    const updatedData = {
      nama,
      nim,
      program,
      judul,
      mitra,
      tanggal_mulai,
      tanggal_selesai,
      lembar_pengesahan: files.lembar_pengesahan?.[0]?.filename || msib.lembar_pengesahan,
      laporan: files.laporan?.[0]?.filename || msib.laporan,
      projek: files.projek?.[0]?.filename || msib.projek,
      sertifikat: files.sertifikat?.[0]?.filename || msib.sertifikat,
      konversi_nilai: files.konversi_nilai?.[0]?.filename || msib.konversi_nilai,
    };

    await msib.update(updatedData);

    res.status(200).json({ msg: "Program MSIB berhasil diperbarui" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};



export const deleteMsib = async (req, res) => {
  try {
    const msib = await Msib.findOne({ where: { id: req.params.id } });

    if (!msib) {
      return res.status(404).json({ msg: "Program MSIB tidak ditemukan" });
    }

    await msib.destroy();

    res.status(200).json({ msg: "Program MSIB berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
