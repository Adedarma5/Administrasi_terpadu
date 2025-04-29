import bcrypt from "bcrypt";
import Pengajaran from "../models/pengajaranmodel.js";
import upload from "../middleware/upload.js";


export const getPengajaran= async (req, res) => {
    try {
        const { role, id } = req.user;

        let pengajaran;
        if (role === 'admin') {
            pengajaran = await Pengajaran.findAll({
                attributes: ['id', 'nama_dosen', 'mata_kuliah', 'semester', 'kelas', 'metode_pengajaran', 'keterlibatan_praktisi', 'nama_praktisi', 'institusi_praktisi', 'file_pengajaran']
            });
        } else if (role === 'user') {
            pengajaran = await Pengajaran.findAll({
                attributes: ['id', 'nama_dosen', 'mata_kuliah', 'semester', 'kelas', 'metode_pengajaran', 'keterlibatan_praktisi', 'nama_praktisi', 'institusi_praktisi', 'file_pengajaran'],
                where: { userId: id }
            });
        }

        res.json(pengajaran);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Gagal mengambil data Pengajaran" });
    }
};

export const getPengajaranById = async (req, res) => {
    try {
        const { role, id } = req.user;

        const pengajaran = await Pengajaran.findOne({
            attributes: ['id', 'nama_dosen', 'mata_kuliah', 'semester', 'kelas', 'metode_pengajaran', 'keterlibatan_praktisi', 'nama_praktisi', 'institusi_praktisi', 'file_pengajaran' ],
            where: { id: req.params.id }
        });

        if (!pengajaran) {
            return res.status(404).json({ msg: "pengajaran tidak ditemukan" });
        }

        if (role === 'user' && pengajaran.userId !== id) {
            return res.status(403).json({ msg: "Akses ditolak" });
        }

        res.status(200).json(pengajaran);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createPengajaran = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: "File Foto harus diunggah!" });
        }

        const { nama_dosen, mata_kuliah, semester, kelas, metode_pengajaran, keterlibatan_praktisi, nama_praktisi, institusi_praktisi } = req.body;
        const file_pengajaran = req.file.filename;

        await Pengajaran.create({
            userId: req.user.id,
            nama_dosen,
            mata_kuliah,
            semester,
            kelas,
            metode_pengajaran,
            keterlibatan_praktisi,
            nama_praktisi,
            institusi_praktisi,
            file_pengajaran
            
        });

        res.status(201).json({ msg: "Pengajaran berhasil dibuat!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: error.message });
    }
};


export const updatePengajaran = async (req, res) => {
    try {
        const pengajaran = await Pengajaran.findOne({ where: { id: req.params.id } });
        if (!pengajaran) {
            return res.status(404).json({ msg: "pengajaran tidak ditemukan" });
        }

        const { nama_dosen, mata_kuliah, semester, kelas, metode_pengajaran, keterlibatan_praktisi, nama_praktisi, institusi_praktisi } = req.body;
        let file_pengajaran = pengajaran.file_pengajaran;
        if (req.file) {
            file_pengajaran = req.file.filename;
        }
        await pengajaran.update({ nama_dosen, mata_kuliah, semester, kelas, metode_pengajaran, keterlibatan_praktisi, nama_praktisi, institusi_praktisi, file_pengajaran });

        res.status(200).json({ msg: "Pengajaran berhasil diperbarui" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deletePengajaran = async (req, res) => {
    try {
        const pengajaran = await Pengajaran.findOne({ where: { id: req.params.id } });
        if (!pengajaran) {
            return res.status(404).json({ msg: "Pengajaran tidak ditemukan" });
        }

        await pengajaran.destroy();
        res.status(200).json({ msg: "Pengajaran berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
