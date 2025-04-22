import bcrypt from "bcrypt";
import Dosen from "../models/dosenmodel.js";

export const getDosen = async(req, res) => {
    try {
        const dosen = await Dosen.findAll({
         attributes: ['id','nip','name', 'keahlian', 'jabatan_struktural', 'jabatan_fungsional', 'status']
        });
        res.json(dosen);
    } catch (error){
        console.log(error);
    }
}

export const getDosenById = async (req, res) => {
    try {
        const dosen = await Dosen.findOne({
            attributes: ['id', 'nip', 'name', 'keahlian', 'jabatan_struktural', 'jabatan_fungsional', 'status'],
            where: {
                id: req.params.id
            }
        });

        if (!dosen) {
            return res.status(404).json({ msg: "Dosen tidak ditemukan" });
        }

        res.status(200).json(dosen);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createDosen = async(req, res) =>{
    const {nip, name, keahlian, jabatan_struktural, jabatan_fungsional, status} = req.body;
    try {
        await Dosen.create({
            nip: nip,
            name: name,
            keahlian: keahlian,
            jabatan_struktural: jabatan_struktural,
            jabatan_fungsional: jabatan_fungsional,
            status: status
        });
        res.status(201).json({msg: "dosen Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateDosen = async (req, res) => {
    try {
        const dosen = await Dosen.findOne({
            where: { id: req.params.id }
        });

        if (!dosen) {
            return res.status(404).json({ msg: "Dosen tidak ditemukan" });
        }

        const { nip, name, keahlian, jabatan_struktural, jabatan_fungsional, status } = req.body;
        await dosen.update({ nip, name, keahlian, jabatan_struktural, jabatan_fungsional, status });

        res.status(200).json({ msg: "Dosen berhasil diperbarui" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


export const deleteDosen = async (req, res) => {
    try {
        const dosen = await Dosen.findOne({
            where: { id: req.params.id }
        });

        if (!dosen) {
            return res.status(404).json({ msg: "Dosen tidak ditemukan" });
        }

        await dosen.destroy(); 

        res.status(200).json({ msg: "Dosen berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

