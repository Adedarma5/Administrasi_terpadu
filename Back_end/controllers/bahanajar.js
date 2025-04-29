import bcrypt from "bcrypt";
import BahanAjar from "../models/bahanajarmodel.js";
import upload from "../middleware/upload.js";


export const getBahanAjar = async (req, res) => {
    try {
        const { role, id } = req.user;

        let bahan_ajar;
        if (role === 'admin') {
            bahan_ajar = await BahanAjar.findAll({
                attributes: ['id', 'name', 'judul_materi', 'dosen_pengampu', 'pertemuan', 'file_pendukung']
            });
        } else if (role === 'user') {
            bahan_ajar = await BahanAjar.findAll({
                attributes: ['id', 'name', 'judul_materi', 'dosen_pengampu', 'pertemuan', 'file_pendukung'],
                where: { userId: id }
            });
        }

        res.json(bahan_ajar);
    } catch (error) {
        console.log(error);
    }
}

export const getBahanAjarById = async (req, res) => {
    try {
        const { role, id } = req.user;

        const bahan_ajar = await BahanAjar.findOne({
            attributes: ['id', 'name', 'judul_materi', 'dosen_pengampu', 'pertemuan', 'file_pendukung'],
            where: {
                id: req.params.id
            }
        });

        if (!bahan_ajar) {
            return res.status(404).json({ msg: "Bahan Ajar tidak ditemukan" });
        }

        if (role === 'user' && bahan_ajar.userId !== id) {
            return res.status(403).json({ msg: "Akses ditolak" });
        }

        res.status(200).json(bahan_ajar);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createBahanAjar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: "File PDF harus diunggah!" });
        }

        const { name, judul_materi, dosen_pengampu, pertemuan } = req.body;
        const file_pendukung = req.file.filename;

        await BahanAjar.create({
            userId: req.user.id,
            name,
            judul_materi,
            dosen_pengampu,
            pertemuan,
            file_pendukung,
        });

        res.status(201).json({ msg: "Bahan Ajar berhasil dibuat!" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateBahanAjar = async (req, res) => {
    try {
        const bahan_ajar = await BahanAjar.findOne({
            where: { id: req.params.id }
        });

        if (!bahan_ajar) {
            return res.status(404).json({ msg: "Bahan Ajar tidak ditemukan" });
        }

        const { name, judul_materi, dosen_pengampu, pertemuan } = req.body;
        let file_pendukung = bahan_ajar.file_pendukung;
        if (req.file) {
            file_pendukung = req.file.filename;
        }
        await bahan_ajar.update({ name, judul_materi, dosen_pengampu, pertemuan, file_pendukung });

        res.status(200).json({ msg: "Bahan Ajar berhasil diperbarui" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


export const deleteBahanAjar = async (req, res) => {
    try {
        const bahan_ajar = await BahanAjar.findOne({
            where: { id: req.params.id }
        });

        if (!bahan_ajar) {
            return res.status(404).json({ msg: "Bahan Ajar tidak ditemukan" });
        }

        await bahan_ajar.destroy();

        res.status(200).json({ msg: "Bahan Ajar berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

