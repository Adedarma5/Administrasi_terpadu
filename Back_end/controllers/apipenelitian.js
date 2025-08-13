import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/:tahun/:kode_fakultas/:kode_sumber_dana', async (req, res) => {
  const { tahun, kode_fakultas, kode_sumber_dana } = req.params;

  const url = `https://sipp.unimal.ac.id/api/penelitian/${tahun}/${kode_fakultas}/${kode_sumber_dana}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching from SIPP:", error.message);
    res.status(500).json({
      message: "Gagal mengambil data dari SIPP",
      error: error.message,
    });
  }
});

export default router;
