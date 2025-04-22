import bcrypt from "bcrypt";
import Msib from "../models/msibmodel.js";
import upload from "../middleware/upload.js";


export const getMsib = async (req, res) => {
    try {
        const msib = await Msib.findAll({
            attributes: ['id', 'name', 'nim', 'program', 'judul', 'mitra', 'tangggal_mulai', 'tanggal_selesai', 'lembar_pengesahan', 'laporan', 'projek', 'sertifikat', 'konversi_nilai']
        });
        res.json(msib);
    } catch (error) {
        console.log(error);
    }
}

export const getMsibById = async (req, res) => {
    try {
        const msib = await Msib.findOne({
            attributes: ['id', 'name', 'nim', 'program', 'judul', 'mitra', 'tangggal_mulai', 'tanggal_selesai', 'lembar_pengesahan', 'laporan', 'projek', 'sertifikat', 'konversi_nilai'],
            where: {
                id: req.params.id
            }
        });

        if (!msib) {
            return res.status(404).json({ msg: "Program MSIB tidak ditemukan" });
        }

        res.status(200).json(msib);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createMsib = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ msg: "File PDF harus diunggah!" });
      }
  
      const { name, nim, program, judul, mitra, tanggal_mulai, tanggal_selesai } = req.body;
      const lembar_pengesahan = req.file.filename; 
      const laporan = req.file.filename; 
      const projek = req.file.filename; 
      const sertifikat = req.file.filename; 
      const konversi_nilai = req.file.filename; 
  
      await Msib.create({
        name, 
        nim, 
        program, 
        judul, 
        mitra, 
        tanggal_mulai, 
        tanggal_selesai,
        lembar_pengesahan,
        laporan,
        projek,
        sertifikat,
        konversi_nilai
      });
  
      res.status(201).json({ msg: "Program MSIB berhasil dibuat!" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

export const updateMsib = async (req, res) => {
    try {
        const msib = await Msib.findOne({
            where: { id: req.params.id }
        });

        if (!msib) {
            return res.status(404).json({ msg: "Program MSIB tidak ditemukan" });
        }

        const { name, nim, program, judul, mitra, tanggal_mulai, tanggal_selesai } = req.body;
        let lembar_pengesahan = msib.lembar_pengesahan;
        let laporan = msib.laporan;
        let projek = msib.projek;
        let sertifikat = msib.sertifikat;
        let konversi_nilai = msib.konversi_nilai;
        if (req.file) {
            lembar_pengesahan = req.file.filename;
            laporan = req.file.filename;
            projek = req.file.filename;
            sertifikat = req.file.filename;
            konversi_nilai = req.file.filename;
        }
        await msib.update({ name, judul_materi, dosen_pengampu, pertemuan, lembar_pengesahan, laporan, projek, sertifikat, konversi_nilai });

        res.status(200).json({ msg: "Program MSIB berhasil diperbarui" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


export const deleteMsib = async (req, res) => {
    try {
        const msib = await Msib.findOne({
            where: { id: req.params.id }
        });

        if (!msib) {
            return res.status(404).json({ msg: "Program MSIB tidak ditemukan" });
        }

        await msib.destroy();

        res.status(200).json({ msg: "Program MSIB berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

