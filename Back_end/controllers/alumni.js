import Alumni from '../models/alumnimodel.js';


export const createAlumni = async (req, res) => {
  try {
    const result = await Alumni.create({ datajson: req.body });
    res.status(201).json({
      message: 'Data kuisioner alumni berhasil disimpan',
      id: result.id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAlumni = async (req, res) => {
  try {
    const list = await Alumni.findAll({ order: [['id', 'DESC']] });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAlumniById = async (req, res) => {
  try {
    const alumni = await Alumni.findByPk(req.params.id);
    if (!alumni) return res.status(404).json({ message: 'Data tidak ditemukan' });
    res.status(200).json(alumni);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.findByPk(req.params.id);
    if (!alumni) return res.status(404).json({ message: 'Data tidak ditemukan' });

    await alumni.update({ datajson: req.body });
    res.status(200).json({ message: 'Data berhasil diupdate' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.findByPk(req.params.id);
    if (!alumni) return res.status(404).json({ message: 'Data tidak ditemukan' });

    await alumni.destroy();
    res.status(200).json({ message: 'Data berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
