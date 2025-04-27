import TugasAkhir from "../models/tgamodel.js";
import upload from "../middleware/upload.js";


export const getTugasAkhir = async (req, res) => {
  try {
    const tugas_akhir = await TugasAkhir.findAll({
      attributes: ['id', 'nama', 'nim', 'no_hp', 'skripsi', 'program_tga', 'jurnal_sisfo' ],
    });
    res.json(tugas_akhir);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const getTugasAkhirById = async (req, res) => {
  try {
    const tugas_akhir = await TugasAkhir.findOne({
      attributes: ['id', 'nama', 'nim', 'no_hp', 'skripsi', 'program_tga', 'jurnal_sisfo' ],
      where: { id: req.params.id },
    });

    if (!tugas_akhir) {
      return res.status(404).json({ msg: "Tugas Akhir tidak ditemukan" });
    }

    res.json(tugas_akhir);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const createTugasAkhir = async (req, res) => {
  const { nama, nim, no_hp } = req.body;
  const files = req.files;

  try {
      const Skripsi = files.skripsi?.[0]?.filename || null;
      const program_tga = files.program_tga?.[0]?.filename || null;
      const JurnalSisfo = files.jurnal_sisfo?.[0]?.filename || null;

    await TugasAkhir.create({
      nama,
      nim,
      no_hp,
      jurnal_sisfo: JurnalSisfo,
      program_tga,
      skripsi: Skripsi
    });

    res.status(201).json({ message: "Data TGA berhasil ditambahkan" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menambahkan data TGA" });
  }
};


export const updateTugasAkhir = async (req, res) => {
  try {
    const tugas_akhir = await TugasAkhir.findOne({ where: { id: req.params.id } });

    if (!tugas_akhir) {
      return res.status(404).json({ msg: "TGA tidak ditemukan" });
    }

    const { nama, nim, no_hp } = req.body;
    const files = req.files || {};

    const updatedData = {
      nama,
      nim,
      no_hp,
      Skripsi: files.skripsi?.[0]?.filename || tugas_akhir.skripsi,
      ProgramTga: files.program_tga?.[0]?.filename || tugas_akhir.program_tga,
      JurnalSisfo: files.jurnal_sisfo?.[0]?.filename || tugas_akhir.jurnal_sisfo,
    };

    await tugas_akhir.update(updatedData);

    res.status(200).json({ msg: "Program Magang Mandiri berhasil diperbarui" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};



export const deleteTugasAkhir = async (req, res) => {
  try {
    const tugas_akhir = await TugasAkhir.findOne({ where: { id: req.params.id } });

    if (!tugas_akhir) {
      return res.status(404).json({ msg: "Program Magang Mandiri tidak ditemukan" });
    }

    await tugas_akhir.destroy();

    res.status(200).json({ msg: "Program Magang Mandiri berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
