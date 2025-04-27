import bcrypt from "bcrypt";
import Prestasi from "../models/prestasimodel.js";
import upload from "../middleware/upload.js";


export const getPrestasi = async (req, res) => {
    try {
        const prestasi = await Prestasi.findAll({
            attributes: ['id', 'nama', 'nim', 'kategori_peserta', 'tingkatan', 'nama_perlombaan', 'bidang_perlombaan', 'sertifikat']
        });
        res.json(prestasi);
    } catch (error) {
        console.log(error);
    }
}

export const getPrestasiById = async (req, res) => {
    try {
        const prestasi = await Prestasi.findOne({
            attributes: ['id', 'nama', 'nim', 'kategori_peserta', 'tingkatan', 'nama_perlombaan', 'bidang_perlombaan', 'sertifikat'],
            where: {
                id: req.params.id
            }
        });

        if (!prestasi) {
            return res.status(404).json({ msg: "Prestasi tidak ditemukan" });
        }

        res.status(200).json(prestasi);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createPrestasi = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ msg: "File PDF harus diunggah!" });
      }
  
      const { nama, nim, kategori_peserta, tingkatan, nama_perlombaan, bidang_perlombaan } = req.body;
      const sertifikat = req.file.filename; 
  
      await Prestasi.create({
        nama,
        nim,
        kategori_peserta,
        tingkatan,
        nama_perlombaan, 
        bidang_perlombaan,
        sertifikat,
      });
  
      res.status(201).json({ msg: "Prestai berhasil dibuat!" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

export const updatePrestasi = async (req, res) => {
    try {
        const prestasi = await Prestasi.findOne({
            where: { id: req.params.id }
        });

        if (!prestasi) {
            return res.status(404).json({ msg: "Prestasi tidak ditemukan" });
        }

        const { nama, nim, kategori_peserta, tingkatan, nama_perlombaan, bidang_perlombaan } = req.body;
        let sertifikat = prestasi.sertifikat;
        if (req.file) {
            sertifikat = req.file.filename;
        }
        await prestasi.update({ nama, nim, kategori_peserta, tingkatan, nama_perlombaan, bidang_perlombaan, sertifikat });

        res.status(200).json({ msg: "Prestasi berhasil diperbarui" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


export const deletePrestasi = async (req, res) => {
    try {
        const prestasi = await Prestasi.findOne({
            where: { id: req.params.id }
        });

        if (!prestasi) {
            return res.status(404).json({ msg: "Prestasi tidak ditemukan" });
        }

        await prestasi.destroy();

        res.status(200).json({ msg: "Prestasi berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

