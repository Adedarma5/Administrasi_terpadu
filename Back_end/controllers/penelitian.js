import bcrypt from "bcrypt";
import Penelitian from "../models/penelitianmodel.js";
import upload from "../middleware/upload.js";


export const getPenelitian = async (req, res) => {
    try {
        const { role, id } = req.user;

        let penelitian;
        if (role === 'admin') {
             penelitian = await Penelitian.findAll({
            attributes: ['id', 'judul_penelitian', 'nama_dosen',  'ketua_tim', 'anggota_tim',  'file_laporan']
        });
    } else if (role === 'user') {
        penelitian = await Penelitian.findAll({
            attributes: ['id', 'judul_penelitian', 'nama_dosen',  'ketua_tim', 'anggota_tim',  'file_laporan'],
            where: { userId: id }
        });
    }

        res.json(penelitian);
    } catch (error) {
        console.log(error);
    }
}

export const getPenelitianById = async (req, res) => {
    try {
        const { role, id } = req.user;
        const penelitian = await Penelitian.findOne({
            attributes: ['id', 'judul_penelitian', 'nama_dosen',  'ketua_tim', 'anggota_tim', 'file_laporan'],
            where: {
                id: req.params.id
            }
        });

        if (!penelitian) {
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        }
        if (role === 'user' && absensi.userId !== id) {
            return res.status(403).json({ msg: "Akses ditolak" });
        }

        res.status(200).json(penelitian);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createPenelitian = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ msg: "File PDF harus diunggah!" });
      }
  
      const { judul_penelitian, nama_dosen,  ketua_tim, anggota_tim} = req.body;
      const file_laporan = req.file.filename; 
  
      await Penelitian.create({
        userId: req.user.id,
        judul_penelitian,
        nama_dosen,
        ketua_tim,
        anggota_tim,
        file_laporan,
      });
  
      res.status(201).json({ msg: "Penelitian berhasil dibuat!" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

export const updatePenelitian = async (req, res) => {
    try {
        const penelitian = await Penelitian.findOne({
            where: { id: req.params.id }
        });

        if (!penelitian) {
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        }

        const { judul_penelitian, nama_dosen,  ketua_tim, anggota_tim} = req.body;
        let file_laporan = penelitian.file_laporan;
        if (req.file) {
            file_laporan = req.file.filename;
        }
        await penelitian.update({ judul_penelitian, nama_dosen,  ketua_tim, anggota_tim, file_laporan });

        res.status(200).json({ msg: "Data berhasil diperbarui" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


export const deletePenelitian = async (req, res) => {
    try {
        const penelitian = await Penelitian.findOne({
            where: { id: req.params.id }
        });

        if (!penelitian) {
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        }

        await penelitian.destroy();

        res.status(200).json({ msg: "Penelitian berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

