import express from "express";
import {
  getAbsensiPertemuan,
  getAbsensiPertemuanByUserAndAbsensi,
  getAbsensiPertemuanById,
  createAbsensiPertemuan,
  updateAbsensiPertemuan,
  deleteAbsensiPertemuan
} from "../controllers/absensipertemuan.js";
import upload from "../middleware/upload.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();

router.get("/", verifyToken, getAbsensiPertemuan);
router.get("/byuser", verifyToken, getAbsensiPertemuanByUserAndAbsensi);
router.get("/:id", verifyToken, getAbsensiPertemuanById);
router.post("/", verifyToken, upload.single("foto"), createAbsensiPertemuan);
router.patch("/:id", verifyToken, upload.single("foto"), updateAbsensiPertemuan);
router.delete("/:id", verifyToken, deleteAbsensiPertemuan);

export default router;
