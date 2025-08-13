import Survei from '../models/surveimodel.js';
import { kirimEmailSurvei } from './kirimemailsurvei.js';

export const createSurvei = async (req, res) => {
  try {
    const result = await Survei.create({ datajson: req.body });
    await kirimEmailSurvei(req.body);

    res.status(201).json({
      message: 'Data kuisioner survei berhasil disimpan & email telah dikirim',
      id: result.id
    });
  } catch (error) {
    console.error('Gagal proses survei:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getSurvei = async (req, res) => {
  try {
    const list = await Survei.findAll({ order: [['id', 'DESC']] });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSurveiById = async (req, res) => {
  try {
    const survei = await Survei.findByPk(req.params.id);
    if (!survei) return res.status(404).json({ message: 'Data tidak ditemukan' });
    res.status(200).json(survei);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSurvei = async (req, res) => {
  try {
    const survei = await Survei.findByPk(req.params.id);
    if (!survei) return res.status(404).json({ message: 'Data tidak ditemukan' });

    await survei.update({ datajson: req.body });
    res.status(200).json({ message: 'Data berhasil diupdate' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSurvei = async (req, res) => {
  try {
    const survei = await Survei.findByPk(req.params.id);
    if (!survei) return res.status(404).json({ message: 'Data tidak ditemukan' });

    await survei.destroy();
    res.status(200).json({ message: 'Data berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
