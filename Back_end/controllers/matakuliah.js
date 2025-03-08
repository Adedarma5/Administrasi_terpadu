import bcrypt from "bcrypt";
import MataKuliah from "../models/matakuliahmodel.js";

export const getMataKuliah = async(req, res) => {
    try {
        const mata_kuliah = await MataKuliah.findAll({
         attributes: ['id','name', 'sks', 'semester']
        });
        res.json(mata_kuliah);
    } catch (error){
        console.log(error);
    }
}

export const getMataKuliahById = async (req, res) => {
    try {
        const mata_kuliah = await MataKuliah.findOne({
            attributes: ['id','name', 'sks', 'semester'],
            where: {
                id: req.params.id
            }
        });

        if (!mata_kuliah) {
            return res.status(404).json({ msg: "Mata Kuliah tidak ditemukan" });
        }

        res.status(200).json(mata_kuliah);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createMataKuliah = async(req, res) =>{
    const { name, sks, semester} = req.body;
    try {
        await MataKuliah.create({
            name: name,
            sks: sks,
            semester: semester,
        });
        res.status(201).json({msg: "Mata Kuliah Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateMataKuliah = async (req, res) => {
    try {
        const mata_kuliah = await MataKuliah.findOne({
            where: { id: req.params.id }
        });

        if (!mata_kuliah) {
            return res.status(404).json({ msg: "Mata Kuliah tidak ditemukan" });
        }

        const { name, sks, semester } = req.body;
        await mata_kuliah.update({ name, sks, semester });

        res.status(200).json({ msg: "Mata Kuliah berhasil diperbarui" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


export const deleteMataKuliah = async (req, res) => {
    try {
        const mata_kuliah = await MataKuliah.findOne({
            where: { id: req.params.id }
        });

        if (!mata_kuliah) {
            return res.status(404).json({ msg: "Mata Kuliah tidak ditemukan" });
        }

        await mata_kuliah.destroy(); 

        res.status(200).json({ msg: "Mata Kuliah berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

