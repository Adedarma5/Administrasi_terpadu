import bcrypt from "bcrypt";
import Pmm from "../models/pmmmodel.js";
import upload from "../middleware/upload.js";


export const getPmm = async (req, res) => {
    try {
        const pmm = await Pmm.findAll({
            attributes: ['id', 'nama', 'nim', 'stambuk', 'nama_universitas', 'konversi_nilai']
        });
        res.json(pmm);
    } catch (error) {
        console.log(error);
    }
}

export const getPmmById = async (req, res) => {
    try {
        const pmm = await Pmm.findOne({
            attributes: ['id', 'nama', 'nim', 'stambuk', 'nama_universitas', 'konversi_nilai'],
            where: {
                id: req.params.id
            }
        });

        if (!pmm) {
            return res.status(404).json({ msg: "Data Pmm tidak ditemukan" });
        }

        res.status(200).json(pmm);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createPmm = async (req, res) => {
    try {
      console.log("Req File:", req.file); 
      if (!req.file) {
        return res.status(400).json({ msg: "File PDF harus diunggah!" });
      }
  
      const { nama, nim, stambuk, nama_universitas } = req.body;
      const konversi_nilai = req.file.filename; 
  
      await Pmm.create({ nama,  nim, stambuk, nama_universitas, konversi_nilai });
  
      res.status(201).json({ msg: "Pmm berhasil dibuat!" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
};


export const updatePmm = async (req, res) => {
    try {
        const pmm = await Pmm.findOne({
            where: { id: req.params.id }
        });

        if (!pmm) {
            return res.status(404).json({ msg: "Data Pmm tidak ditemukan" });
        }

        const { nama, nim, stambuk, nama_universitas } = req.body;
        let konversi_nilai = pmm.konversi_nilai;
        if (req.file) {
            konversi_nilai = req.file.filename;
        }
        await rps.update({ nama, nim, stambuk, nama_universitas, konversi_nilai });

        res.status(200).json({ msg: "RPS berhasil diperbarui" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


export const deletePmm = async (req, res) => {
    try {
        const pmm = await Pmm.findOne({
            where: { id: req.params.id }
        });

        if (!pmm) {
            return res.status(404).json({ msg: "Data Pmm tidak ditemukan" });
        }

        await pmm.destroy();

        res.status(200).json({ msg: "Data Pmm berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

