import bcrypt from "bcrypt";
import PembelajaranMataKuliah from "../models/pembelajaranmatakuliahmodel.js";
import upload from "../middleware/upload.js";


export const getPembelajaranMataKuliah = async (req, res) => {
    try {
        const { role, id } = req.user;

        let pembelajaran_mata_kuliah;
        if (role === 'admin') {
            pembelajaran_mata_kuliah = await PembelajaranMataKuliah.findAll({
                attributes: ['id', 'nama_dosen', 'mata_kuliah', 'semester', 'file_kontrak_kuliah', 'file_rps_pembelajaran']
            });
        } else if (role === 'user') {
            pembelajaran_mata_kuliah = await PembelajaranMataKuliah.findAll({
                attributes: ['id', 'nama_dosen', 'mata_kuliah', 'semester', 'file_kontrak_kuliah', 'file_rps_pembelajaran'],
                where: { userId: id }
            });

        }

        res.json(pembelajaran_mata_kuliah);
    } catch (error) {
        console.log(error);
    }
}

export const getAllPembelajaranMataKuliah = async (req, res) => {
    try {
        const pembelajaran_mata_kuliah = await PembelajaranMataKuliah.findAll({
            attributes: ['id', 'nama_dosen', 'mata_kuliah', 'semester', 'file_kontrak_kuliah', 'file_rps_pembelajaran']
        });
        res.json(pembelajaran_mata_kuliah);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message });
    }
};


export const getPembelajaranMataKuliahById = async (req, res) => {
    try {
        const pembelajaran_mata_kuliah = await PembelajaranMataKuliah.findOne({
            attributes: ['id', 'nama_dosen', 'mata_kuliah', 'semester', 'file_kontrak_kuliah', 'file_rps_pembelajaran'],
            where: {
                id: req.params.id
            }
        });

        if (!pembelajaran_mata_kuliah) {
            return res.status(404).json({ msg: "Pembelajaran Mata Kuliah tidak ditemukan" });
        }

        res.status(200).json(pembelajaran_mata_kuliah);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createPembelajaranMataKuliah = async (req, res) => {
    const { nama_dosen, mata_kuliah, semester, } = req.body;
    const files = req.files;

    try {
        const kontrakkuliah = files.file_kontrak_kuliah?.[0].filename || null;
        const Rps = files.file_rps_pembelajaran?.[0]?.filename || null;

        await PembelajaranMataKuliah.create({
            userId: req.user.id,
            nama_dosen,
            mata_kuliah,
            semester,
            file_kontrak_kuliah: kontrakkuliah,
            file_rps_pembelajaran: Rps
        });

        res.status(201).json({ msg: "berhasil dibuat!" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updatePembelajaranMataKuliah = async (req, res) => {
    try {
        const pembelajaran_mata_kuliah = await PembelajaranMataKuliah.findOne({
            where: { id: req.params.id }
        });

        if (!pembelajaran_mata_kuliah) {
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        }

        const { nama_dosen, mata_kuliah, semester } = req.body;
        const files = req.files || {};

        const updatedData = {
            nama_dosen,
            mata_kuliah,
            semester,
            file_kontrak_kuliah: files.file_kontrak_kuliah?.[0]?.filename || pembelajaran_mata_kuliah.file_kontrak_kuliah,
            file_rps_pembelajaran: files.file_rps_pembelajaran?.[0]?.filename || pembelajaran_mata_kuliah.file_rps_pembelajaran
        };

        await pembelajaran_mata_kuliah.update(updatedData); 

        res.status(200).json({ msg: "Data berhasil diperbarui" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};



export const deletePembelajaranMataKuliah = async (req, res) => {
    try {
        const pembelajaran_mata_kuliah = await PembelajaranMataKuliah.findOne({
            where: { id: req.params.id }
        });

        if (!pembelajaran_mata_kuliah) {
            return res.status(404).json({ msg: "tidak ditemukan" });
        }

        await pembelajaran_mata_kuliah.destroy();

        res.status(200).json({ msg: "berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

