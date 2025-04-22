import bcrypt from "bcrypt";
import Rps from "../models/rpsmodel.js";
import upload from "../middleware/upload.js";


export const getRps = async (req, res) => {
    try {
        const rps = await Rps.findAll({
            attributes: ['id', 'name', 'semester', 'file_rps']
        });
        res.json(rps);
    } catch (error) {
        console.log(error);
    }
}

export const getRpsById = async (req, res) => {
    try {
        const rps = await Rps.findOne({
            attributes: ['id', 'name', 'semester', 'file_rps'],
            where: {
                id: req.params.id
            }
        });

        if (!rps) {
            return res.status(404).json({ msg: "RPS tidak ditemukan" });
        }

        res.status(200).json(rps);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createRps = async (req, res) => {
    try {
      console.log("Req File:", req.file); // Cek apakah file dikirim
  
      if (!req.file) {
        return res.status(400).json({ msg: "File PDF harus diunggah!" });
      }
  
      const { name, semester } = req.body;
      const file_rps = req.file.filename; 
  
      await Rps.create({ name, semester, file_rps });
  
      res.status(201).json({ msg: "RPS berhasil dibuat!" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
};


export const updateRps = async (req, res) => {
    try {
        const rps = await Rps.findOne({
            where: { id: req.params.id }
        });

        if (!rps) {
            return res.status(404).json({ msg: "RPS tidak ditemukan" });
        }

        const { name, semester } = req.body;
        let file_rps = rps.file_rps;
        if (req.file) {
            file_rps = req.file.filename;
        }
        await rps.update({ name, semester, file_rps });

        res.status(200).json({ msg: "RPS berhasil diperbarui" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


export const deleteRps = async (req, res) => {
    try {
        const rps = await Rps.findOne({
            where: { id: req.params.id }
        });

        if (!rps) {
            return res.status(404).json({ msg: "RPS tidak ditemukan" });
        }

        await rps.destroy();

        res.status(200).json({ msg: "RPS berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

