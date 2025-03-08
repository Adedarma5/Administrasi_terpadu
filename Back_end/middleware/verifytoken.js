import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        console.error("Token tidak ditemukan di header.");
        return res.status(401).json({ message: "Tidak ada token yang tersedia. Silakan login." });
    }

    // Ambil token dari header "Authorization: Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token) {
        console.error("Format token tidak valid.");
        return res.status(401).json({ message: "Token tidak valid" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.error("JWT Error:", err.message);
            return res.status(403).json({ message: "Invalid atau token kadaluarsa" });
        }

        console.log("Token valid. Data decoded:", decoded);

        // Simpan informasi user ke req agar bisa digunakan di endpoint lain
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };

        next();
    });
};
