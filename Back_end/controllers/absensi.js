import Absensi from "../models/absensimodel.js";
import AbsensiPertemuan from "../models/absensipertemuanmodel.js";

export const getAbsensi = async (req, res) => {
  try {
    const { role, id } = req.user; 

    let absensi;
    if (role === 'admin') {
      absensi = await Absensi.findAll({
        attributes: ['id', 'userId', 'name', 'mata_kuliah', 'kelas', 'hari', 'jam']
      });
    } else if (role === 'user') {
      absensi = await Absensi.findAll({
        attributes: ['id', 'userId', 'name', 'mata_kuliah', 'kelas', 'hari', 'jam'],
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

        const absensi = await Absensi.findOne({
            attributes: ['id', 'name', 'mata_kuliah', 'kelas', 'hari', 'jam'],
            where: { id: req.params.id }
        });

        if (!absensi) {
            return res.status(404).json({ msg: "Absensi tidak ditemukan" });
        }

        res.status(200).json(absensi);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createAbsensi = async (req, res) => {
    const { name, mata_kuliah, kelas, hari, jam } = req.body;
    try {
        await Absensi.create({
            userId: req.user.id,
            name,
            mata_kuliah,
            kelas,
            hari,
            jam
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

        const { name, mata_kuliah, kelas, hari, jam} = req.body;
        await absensi.update({ name, mata_kuliah, kelas, hari, jam});

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
        await AbsensiPertemuan.destroy({ where: { absensi_id: req.params.id } });

        await absensi.destroy();
        res.status(200).json({ msg: "Absensi berhasil dihapus" });
    } catch (error) {
        console.log("Delete absensi error:", error);
        res.status(400).json({ msg: error.message });
    }
};

