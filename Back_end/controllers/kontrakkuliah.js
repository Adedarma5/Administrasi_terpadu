import bcrypt from "bcrypt";
import KontrakKuliah from "../models/kontrakkuliahmodel.js";
import upload from "../middleware/upload.js";


export const getKontrakKuliah = async (req, res) => {
    try {
        const  { role, id } = req.user;

        let kontrak_kuliah;
        if (role === 'admin') {
        kontrak_kuliah = await KontrakKuliah.findAll({
            attributes: ['id', 'nama_dosen', 'mata_kuliah', 'semester',  'file_kontrak_kuliah']
        });
    } else if (role === 'user') {
        kontrak_kuliah = await KontrakKuliah.findAll({
            attributes: ['id', 'nama_dosen', 'mata_kuliah', 'semester',  'file_kontrak_kuliah'],
            where: { userId: id }
        });
    }
        res.json(kontrak_kuliah);
    } catch (error) {
        console.log(error);
    }
}

export const getKontrakKuliahById = async (req, res) => {
    try {
        const { role, id } = req.user;
        const kontrak_kuliah = await KontrakKuliah.findOne({
            attributes: ['id', 'nama_dosen', 'mata_kuliah', 'semester', 'file_kontrak_kuliah'],
            where: {
                id: req.params.id
            }
        });

        if (!kontrak_kuliah) {
            return res.status(404).json({ msg: "kontrak kuliah tidak ditemukan" });
        }
        
        if (role === 'user' && absensi.userId !== id) {
            return res.status(403).json({ msg: "Akses ditolak" });
        }

        res.status(200).json(kontrak_kuliah);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createKontrakKuliah = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ msg: "File PDF harus diunggah!" });
      }
  
      const { nama_dosen, mata_kuliah, semester,} = req.body;
      const file_kontrak_kuliah = req.file.filename; 
  
      await KontrakKuliah.create({
        userId: req.user.id,
        nama_dosen,
        mata_kuliah,
        semester,
        file_kontrak_kuliah,
      });
  
      res.status(201).json({ msg: "kontrak kuliah berhasil dibuat!" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

export const updateKontrakKuliah = async (req, res) => {
    try {
        const kontrak_kuliah = await KontrakKuliah.findOne({
            where: { id: req.params.id }
        });

        if (!kontrak_kuliah) {
            return res.status(404).json({ msg: "kontrak kuliah tidak ditemukan" });
        }

        const { nama_dosen, mata_kuliah, semester,} = req.body;
        let file_kontrak_kuliah = kontrak_kuliah.file_kontrak_kuliah;
        if (req.file) {
            file_kontrak_kuliah = req.file.filename;
        }
        await kontrak_kuliah.update({ nama_dosen, mata_kuliah, semester, file_kontrak_kuliah });

        res.status(200).json({ msg: "kontrak kuliah berhasil diperbarui" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


export const deleteKontrakKuliah = async (req, res) => {
    try {
        const kontrak_kuliah = await KontrakKuliah.findOne({
            where: { id: req.params.id }
        });

        if (!kontrak_kuliah) {
            return res.status(404).json({ msg: "Bahan Ajar tidak ditemukan" });
        }

        await kontrak_kuliah.destroy();

        res.status(200).json({ msg: "Bahan Ajar berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

