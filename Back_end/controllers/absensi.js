import bcrypt from "bcrypt";
import Absensi from "../models/absensimodel.js";
import upload from "../middleware/upload.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";  // Tambahkan .js di akhir
import timezone from "dayjs/plugin/timezone.js"; 


dayjs.extend(utc);
dayjs.extend(timezone);



export const getAbsensi = async (req, res) => {
    try {
        const absensi = await Absensi.findAll({
            attributes: ['id', 'name', 'mata_kuliah', 'jam_pelajaran', 'foto', 'waktu_input']
        });

        const formattedAbsensi = absensi.map(item => ({
            ...item.toJSON(),
            waktu_input: dayjs.utc(item.waktu_input).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss")
        }));

        res.json(formattedAbsensi);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Gagal mengambil data Absensi" });
    }
};

export const getAbsensiById = async (req, res) => {
    try {
        const absensi = await Absensi.findOne({
            attributes: ['id', 'name', 'mata_kuliah', 'jam_pelajaran', 'foto', 'waktu_input'],
            where: { id: req.params.id }
        });

        if (!absensi) {
            return res.status(404).json({ msg: "Absensi tidak ditemukan" });
        }

        const formattedAbsensi = {
            ...absensi.toJSON(),
            waktu_input: dayjs.utc(absensi.waktu_input).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss")
        };

        res.status(200).json(formattedAbsensi);
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
        const waktu_input = dayjs().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");

        await Absensi.create({
            name,
            mata_kuliah,
            jam_pelajaran,
            foto,
            waktu_input
        });

        res.status(201).json({ msg: "Absensi berhasil dibuat!" });
    } catch (error) {
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
        const waktu_input = dayjs().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");

        await absensi.update({ name, mata_kuliah, jam_pelajaran, foto, waktu_input });

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
