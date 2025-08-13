import BahanAjar from "../models/bahanajarmodel.js";

export const getBahanAjar = async (req, res) => {
    try {
        const bahan_ajar = await BahanAjar.findAll({
            attributes: ['id', 'userId', 'judul_materi', 'file_pendukung', 'pertemuan', 'pembelajaran_id']
        });
        res.json(bahan_ajar);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Gagal memuat data bahan ajar." });
    }
};

export const getBahanAjarByUserAndPembelajaran = async (req, res) => {
    const { userId, pembelajaran_id } = req.query;

    try {
        const bahan_ajar = await BahanAjar.findAll({
            where: {
                userId,
                pembelajaran_id
            },
            attributes: ['id', 'userId', 'judul_materi', 'file_pendukung', 'pertemuan', 'pembelajaran_id'],
            order: [['pertemuan', 'ASC']]
        });

        res.json(bahan_ajar);
    } catch (error) {
        console.error("Gagal memuat bahan ajar:", error);
        res.status(500).json({ msg: "Gagal memuat data bahan ajar." });
    }
};

export const getBahanAjarById = async (req, res) => {
    try {
        const bahan_ajar = await BahanAjar.findOne({
            attributes: ['id', 'userId', 'judul_materi', 'file_pendukung', 'pertemuan', 'pembelajaran_id'],
            where: { id: req.params.id }
        });

        if (!bahan_ajar) {
            return res.status(404).json({ msg: "Bahan Ajar tidak ditemukan" });
        }

        res.status(200).json(bahan_ajar);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createBahanAjar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: "File Foto harus diunggah!" });
        }

        const { judul_materi, pertemuan, pembelajaran_id } = req.body;
        const file_pendukung = req.file.filename;

        await BahanAjar.create({
            userId: req.user.id,
            pembelajaran_id,
            judul_materi,
            pertemuan,
            file_pendukung

        });

        res.status(201).json({ msg: "Absensi berhasil dibuat!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: error.message });
    }
};




export const updateBahanAjar = async (req, res) => {
    try {
        const bahan_ajar = await BahanAjar.findOne({ where: { id: req.params.id } });

        if (!bahan_ajar) {
            return res.status(404).json({ msg: "Bahan Ajar tidak ditemukan" });
        }

        const { judul_materi } = req.body;
        let file_pendukung = bahan_ajar.file_pendukung;

        if (req.file) {
            file_pendukung = req.file.filename;
        }

        await bahan_ajar.update({ judul_materi, file_pendukung });

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
