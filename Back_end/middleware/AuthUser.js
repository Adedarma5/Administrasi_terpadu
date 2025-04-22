import users from "../models/usermodel.js";

export const verifyUser = async (req, res, next) => {
    try {
        // Pastikan req.user sudah diset oleh middleware verifyToken
        const user = await users.findOne({
            where: {
                id: req.user.id
            }
        });

        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

        req.userId = user.id;
        req.role = user.role;
        next();
    } catch (error) {
        return res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};


export const adminOnly = async (req, res, next) => {
    try {
        const user = await users.findOne({
            where: {
                id: req.user.id
            }
        });

        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
        if (user.role !== "admin") return res.status(403).json({ msg: "Akses hanya untuk admin" });

        next();
    } catch (error) {
        return res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};