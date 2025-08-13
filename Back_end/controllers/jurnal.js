import Jurnal from "../models/jurnalmodel.js";

export const getJurnal = async (req, res) => {
    try {
        const { role, id } = req.user;

        let jurnal;
        if (role === 'admin') {
            jurnal = await Jurnal.findAll({
                attributes: ['id', 'userId', 'penulis', 'judul_jurnal', 'link_jurnal', 'tahun_terbit', 'volume', 'penerbit']
            });
        } else if (role === 'user') {
            jurnal = await Jurnal.findAll({
                attributes: ['id', 'userId', 'penulis', 'judul_jurnal', 'link_jurnal', 'tahun_terbit', 'volume', 'penerbit'],
                where: { userId: id }
            });
        }
        res.json(jurnal);
    } catch (error) {
        console.log(error);
    }
}

export const getJurnalById = async (req, res) => {
    try {
        const response = await Jurnal.findOne({
            attributes: ['id', 'userId', 'penulis', 'judul_jurnal', 'link_jurnal', 'tahun_terbit', 'volume', 'penerbit'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createJurnal = async (req, res) => {
    const { id, penulis, judul_jurnal, link_jurnal, tahun_terbit, volume, penerbit } = req.body;

    try {
        await Jurnal.create({
            userId: req.user.id,
            penulis: penulis,
            judul_jurnal: judul_jurnal,
            link_jurnal: link_jurnal,
            tahun_terbit: tahun_terbit,
            volume: volume,
            penerbit: penerbit
        });

        res.status(201).json({ msg: "Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const updateJurnal = async (req, res) => {
    try {
        const jurnal = await Jurnal.findOne({
            where: { id: req.params.id }
        });

        if (!jurnal) {
            return res.status(404).json({ msg: "tidak ditemukan" });
        }

        const { penulis, judul_jurnal, link_jurnal, tahun_terbit, volume, penerbit } = req.body;
        await jurnal.update({ penulis, judul_jurnal, link_jurnal, tahun_terbit, volume, penerbit });

        res.status(200).json({ msg: "berhasil diperbarui" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deleteJurnal = async (req, res) => {
    const jurnal = await Jurnal.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!jurnal) return res.status(404).json({ msg: "jurnal tidak ditemukan" });
    try {
        await jurnal.destroy({
            where: {
                id: jurnal.id
            }
        });
        res.status(200).json({ msg: "jurnal Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};