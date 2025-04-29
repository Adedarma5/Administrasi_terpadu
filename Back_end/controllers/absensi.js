import bcrypt from "bcrypt";
import Absensi from "../models/absensimodel.js";
import upload from "../middleware/upload.js";


export const getAbsensi = async (req, res) => {
    try {
        const { role, id } = req.user;

        let absensi;
        if (role === 'admin') {
            absensi = await Absensi.findAll({
                attributes: ['id', 'name', 'mata_kuliah', 'jam_pelajaran', 'foto']
            });
        } else if (role === 'user') {
            absensi = await Absensi.findAll({
                attributes: ['id', 'name', 'mata_kuliah', 'jam_pelajaran', 'foto'],
                where: { userId: id }
            });
        }

        res.json(absensi);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Gagal mengambil data Absensi" });
    }
};

export const getAbsensiById = async (req, res) => {
    try {
        const { role, id } = req.user;

        const absensi = await Absensi.findOne({
            attributes: ['id', 'name', 'mata_kuliah', 'jam_pelajaran', 'foto'],
            where: { id: req.params.id }
        });

        if (!absensi) {
            return res.status(404).json({ msg: "Absensi tidak ditemukan" });
        }

        if (role === 'user' && absensi.userId !== id) {
            return res.status(403).json({ msg: "Akses ditolak" });
        }

        res.status(200).json(absensi);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createAbsensi = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: "File Foto harus diunggah!" });
        }

        const { name, mata_kuliah, jam_pelajaran } = req.body;
        const foto = req.file.filename;

        await Absensi.create({
            userId: req.user.id,
            name,
            mata_kuliah,
            jam_pelajaran,
            foto,
            
        });

        res.status(201).json({ msg: "Absensi berhasil dibuat!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: error.message });
    }
};


export const updateAbsensi = async (req, res) => {
    try {
        const absensi = await Absensi.findOne({ where: { id: req.params.id } });
        if (!absensi) {
            return res.status(404).json({ msg: "Absensi tidak ditemukan" });
        }

        const { name, mata_kuliah, jam_pelajaran } = req.body;
        let foto = absensi.foto;
        if (req.file) {
            foto = req.file.filename;
        }
        await absensi.update({ name, mata_kuliah, jam_pelajaran, foto });

        res.status(200).json({ msg: "Absensi berhasil diperbarui" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deleteAbsensi = async (req, res) => {
    try {
        const absensi = await Absensi.findOne({ where: { id: req.params.id } });
        if (!absensi) {
            return res.status(404).json({ msg: "Absensi tidak ditemukan" });
        }

        await absensi.destroy();
        res.status(200).json({ msg: "Absensi berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
