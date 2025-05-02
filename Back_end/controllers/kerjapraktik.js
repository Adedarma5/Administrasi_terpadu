import KerjaPraktik from "../models/kerjapraktikmodel.js";
import upload from "../middleware/upload.js";


export const getKerjaPraktik = async (req, res) => {
    try {
        const kerja_praktik = await KerjaPraktik.findAll({
            attributes: ['id', 'nama', 'nim', 'dosen_pembimbing', 'judul', 'tempat_kp', 'tanggal_mulai', 'tanggal_selesai', 'krs_terakhir', 'pengesahan_prodi', 'pengesahan_pembimbing', 'nilai_perusahaan', 'daftar_hadir', 'laporan', 'projek'],
        });
        res.json(kerja_praktik);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const getKerjaPraktikById = async (req, res) => {
    try {
        const kerja_praktik = await KerjaPraktik.findOne({
            attributes: ['id', 'nama', 'nim', 'dosen_pembimbing', 'judul', 'tempat_kp', 'tanggal_mulai', 'tanggal_selesai', 'krs_terakhir', 'pengesahan_prodi', 'pengesahan_pembimbing', 'nilai_perusahaan', 'daftar_hadir', 'laporan', 'projek'],
            where: { id: req.params.id },
        });

        if (!kerja_praktik) {
            return res.status(404).json({ msg: "Kerja Praktik tidak ditemukan" });
        }

        res.json(kerja_praktik);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const createKerjaPraktik = async (req, res) => {
    const { nama, nim, dosen_pembimbing, judul, tempat_kp, tanggal_mulai, tanggal_selesai } = req.body;
    const files = req.files;

    try {
        const KrsTerakhir = files?.krs_terakhir?.[0]?.filename || null;
        const PengesahanProdi = files?.pengesahan_prodi?.[0]?.filename || null;
        const PengesahanPembimbing = files?.pengesahan_pembimbing?.[0]?.filename || null;
        const NilaiPerusahaan = files?.nilai_perusahaan?.[0]?.filename || null;
        const DaftarHadir = files?.daftar_hadir?.[0]?.filename || null;
        const Laporan = files?.laporan?.[0]?.filename || null;
        const projek = files?.projek?.[0]?.filename || null; 

        await KerjaPraktik.create({
            nama,
            nim,
            dosen_pembimbing,
            judul,
            tempat_kp,
            tanggal_mulai,
            tanggal_selesai,
            krs_terakhir: KrsTerakhir,
            pengesahan_prodi: PengesahanProdi,
            pengesahan_pembimbing: PengesahanPembimbing,
            nilai_perusahaan: NilaiPerusahaan,
            daftar_hadir: DaftarHadir,
            laporan: Laporan,
            projek: projek  
        });

        res.status(201).json({ message: "Kerja Praktik berhasil ditambahkan" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Gagal menambahkan data Kerja Praktik" });
    }
};


export const updateKerjaPraktik = async (req, res) => {
    try {
        const kerja_praktik = await KerjaPraktik.findOne({ where: { id: req.params.id } });

        if (!kerja_praktik) {
            return res.status(404).json({ msg: "Projek Kerja Praktiktidak ditemukan" });
        }

        const { nama, nim, dosen_pembimbing, judul, tempat_kp, tanggal_mulai, tanggal_selesai } = req.body;
        const files = req.files || {};

        const updatedData = {
            nama,
            nim,
            dosen_pembimbing,
            judul,
            tempat_kp,
            tanggal_mulai,
            tanggal_selesai,
            KrsTerakhir: files.krs_terakhir?.[0]?.filename || kerja_praktik.krs_terakhir,
            PengesahanProdi: files.pengesahan_prodi?.[0]?.filename || kerja_praktik.pengesahan_prodi,
            PengesahanPembimbing: files.pengesahan_pembimbing?.[0]?.filename || kerja_praktik.pengesahan_pembimbing,
            NilaiPerusahaan: files.nilai_perusahaan?.[0]?.filename || kerja_praktik.nilai_perusahaan,
            DaftarHadir: files.daftar_hadir?.[0]?.filename || kerja_praktik.daftar_hadir,
            Laporan: files.laporan?.[0]?.filename || kerja_praktik.laporan,
            Projek: files.projek?.[0]?.filename || kerja_praktik.projek
        };

        await kerja_praktik.update(updatedData);

        res.status(200).json({ msg: "Projek Kerja Praktikberhasil diperbarui" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: error.message });
    }
};



export const deleteKerjaPraktik = async (req, res) => {
    try {
        const kerja_praktik = await KerjaPraktik.findOne({ where: { id: req.params.id } });

        if (!kerja_praktik) {
            return res.status(404).json({ msg: "Projek Magang Mandiri tidak ditemukan" });
        }

        await kerja_praktik.destroy();

        res.status(200).json({ msg: "Projek Magang Mandiri berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
