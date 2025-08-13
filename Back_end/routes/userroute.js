import express from "express";
import {
    getUsers,
    getUserById,
    Register,
    updateUser,
    deleteUser,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/verifytoken.js";
import { refreshToken } from "../controllers/refreshtoken.js";
import { adminOnly } from "../middleware/AuthUser.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.get('/token', refreshToken);
router.get('/users/:id', getUserById);
router.post('/users', upload.single("foto_users"), Register);
router.patch('/users/:id', upload.single("foto_users"), updateUser);
router.delete('/users/:id', deleteUser);

export default router;
