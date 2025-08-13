import AbsensiPertemuan from "../models/absensipertemuanmodel.js";
import Absensi from "../models/absensimodel.js";

export const getAbsensiPertemuan = async (req, res) => {
  try {
    const { role, id: userId } = req.user;

    const whereCondition = role === "admin" ? {} : { userId };

    const data = await AbsensiPertemuan.findAll({
      where: whereCondition,
      order: [['pertemuan', 'ASC']],
      attributes: ['id', 'userId', 'absensi_id', 'pertemuan', 'foto', 'keterangan', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Absensi,
          attributes: ['mata_kuliah', 'kelas', 'hari', 'jam']
        }
      ]
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Gagal memuat data absensi pertemuan." });
  }
};

export const getAbsensiPertemuanByUserAndAbsensi = async (req, res) => {
  try {
    const { role, id: userId } = req.user;
    const { absensi_id } = req.query;

    if (!absensi_id) {
      return res.status(400).json({ msg: "Parameter absensi_id diperlukan." });
    }

    const whereCondition = role === "admin"
      ? { absensi_id }
      : { absensi_id, userId };

    const data = await AbsensiPertemuan.findAll({
      where: whereCondition,
      order: [['pertemuan', 'ASC']]
    });

    res.json(data);
  } catch (error) {
    console.error("Gagal memuat data absensi pertemuan:", error);
    res.status(500).json({ msg: "Gagal memuat data absensi pertemuan." });
  }
};


export const getAbsensiPertemuanById = async (req, res) => {
  try {
    const data = await AbsensiPertemuan.findByPk(req.params.id);
    if (!data) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Gagal memuat data absensi pertemuan." });
  }
};

export const createAbsensiPertemuan = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "File Foto harus diunggah!" });
    }

    const { id: userId } = req.user;
    const { absensi_id, pertemuan } = req.body;

    if (!absensi_id || !pertemuan) {
      return res.status(400).json({ msg: "Data tidak lengkap." });
    }

    const existing = await AbsensiPertemuan.findOne({
      where: { userId, absensi_id, pertemuan }
    });

    if (existing) {
      return res.status(409).json({
        msg: `Anda sudah mengupload absensi untuk pertemuan ke-${pertemuan}.`
      });
    }

    const absensi = await Absensi.findByPk(absensi_id);
    if (!absensi) {
      return res.status(404).json({ msg: "Jadwal absensi tidak ditemukan." });
    }

    const hariMengajar = absensi.hari.toLowerCase();
    const hariUpload = new Date().toLocaleDateString("id-ID", { weekday: "long" }).toLowerCase();

    const hariKeIndex = {
      'minggu': 0,
      'senin': 1,
      'selasa': 2,
      'rabu': 3,
      'kamis': 4,
      'jumat': 5,
      'sabtu': 6
    };

    const isLate = hariKeIndex[hariUpload] > hariKeIndex[hariMengajar];
    const keterangan = isLate ? "Telat" : "Tepat Waktu";
    const foto = req.file.filename;

    const newAbsensi = await AbsensiPertemuan.create({
      userId,
      absensi_id,
      pertemuan,
      foto,
      keterangan
    });

    res.status(201).json({
      msg: "Absensi berhasil diupload",
      data: newAbsensi
    });

  } catch (error) {
    console.error("Error saat menyimpan absensi pertemuan:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat menyimpan absensi." });
  }
};


export const updateAbsensiPertemuan = async (req, res) => {
  try {
    const data = await AbsensiPertemuan.findByPk(req.params.id);
    if (!data) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    let foto = data.foto;
    if (req.file) {
      foto = req.file.filename;
    }

    const { pertemuan } = req.body;

    await data.update({ pertemuan, foto });

    res.json({ msg: "Data absensi pertemuan berhasil diupdate", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

export const deleteAbsensiPertemuan = async (req, res) => {
  try {
    const data = await AbsensiPertemuan.findByPk(req.params.id);
    if (!data) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    await data.destroy();

    res.json({ msg: "Data absensi pertemuan berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};
