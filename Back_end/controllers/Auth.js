import Users from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const Login = async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        const user = await Users.findOne({
            where: { email: req.body.email }
        });

        if (!user) {
            return res.status(404).json({ msg: "Email tidak ditemukan" });
        }

        // Cek password
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return res.status(400).json({ msg: "Password salah" });
        }

        // Generate token
        const userId = user.id;
        const name = user.name;
        const email = user.email;
        const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1d"
        });
        const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "1d"
        });

        // Simpan refresh token ke database
        await Users.update({ refresh_token: refreshToken }, {
            where: { id: userId }
        });

        // Set refresh token di cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ accessToken });
    } catch (error) {
        console.error("Error in Login:", error);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};

// export const Me = async (req, res) => {
//     if (!req.session.userId) {
//         return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
//     }
//     const user = await Users.findOne({
//         attributes: ['uuid', 'name', 'email', 'role'],
//         where: {
//             uuid: req.session.userId
//         }
//     });
//     if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
//     res.status(200).json(user);
// };

export const logOut = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(204).json({ msg: "Tidak ada token untuk logout" });
        }

        const user = await Users.findOne({
            where: { refresh_token: refreshToken }
        });

        if (!user) {
            return res.status(204).json({ msg: "Token tidak ditemukan" });
        }

        // Menggunakan user.id langsung (bukan user[0].id)
        await Users.update({ refresh_token: null }, {
            where: { id: user.id }
        });

        // Hapus cookie refreshToken
        res.clearCookie("refreshToken", { httpOnly: true, secure: false });
        res.status(200).json({ msg: "Anda telah logout" });

    } catch (error) {
        console.error("Error in logOut:", error);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};

