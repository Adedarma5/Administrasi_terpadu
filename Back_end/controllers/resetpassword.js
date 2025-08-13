  import jwt from 'jsonwebtoken';
  import bcrypt from 'bcryptjs';
  import Users from '../models/usermodel.js';
  import nodemailer from 'nodemailer';

  export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const RESET_PASSWORD_SECRET = process.env.RESET_PASSWORD_SECRET;

    try {
      const user = await Users.findOne({ where: { email } });
      if (!user) return res.status(404).json({ message: "Email tidak ditemukan" });

      const token = jwt.sign({ id: user.id, email: user.email }, RESET_PASSWORD_SECRET, { expiresIn: "5m" });

      const resetLink = `http://localhost:5173/FormReset?token=${token}`;
      // const resetLink = `https://satuakademik.my.id/FormReset?token=${token}`;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"Sistem Informasi Terpadu" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Reset Password Link",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;">
        <h2 style="color: #2d6a4f;">Reset Password</h2>
        <p>Halo <strong>${user.name}</strong>,</p>
        <p>Kamu telah meminta untuk mengatur ulang password akunmu. Klik tombol di bawah ini untuk melanjutkan:</p>
        <p style="text-align: center; margin: 20px 0;">
          <a href="${resetLink}" style="
            background-color: #2d6a4f;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 8px;
            font-size: 16px;
            display: inline-block;
          ">
            Reset Password
          </a>
        </p>
        <p>Link akan kadaluarsa dalam <strong>5 menit</strong>.</p>
        <hr />
        <p style="font-size: 12px; color: #888;">Jika kamu tidak meminta ini, abaikan saja email ini.</p>
      </div>
        `,
      };

      await transporter.sendMail(mailOptions);

      return res.json({ message: "Link reset password telah dikirim ke email kamu." });

    } catch (err) {
      console.error("Error forgotPassword:", err);
      return res.status(500).json({ message: "Terjadi kesalahan", error: err.message });
    }
  };

  export const verifyResetToken = (req, res) => {
    const { token } = req.body;
    try {
      const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
      return res.json({ valid: true, userId: decoded.id });
    } catch (err) {
      return res.status(400).json({ valid: false, message: "Token tidak valid atau sudah kadaluarsa" });
    }
  };


  export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    const RESET_PASSWORD_SECRET = process.env.RESET_PASSWORD_SECRET;

    try {
      const decoded = jwt.verify(token, RESET_PASSWORD_SECRET);
      const user = await Users.findOne({ where: { id: decoded.id } });
      if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await Users.update({ password: hashedPassword }, { where: { id: user.id } });

      return res.json({ message: "Password berhasil direset" });
    } catch (err) {
      return res.status(400).json({ message: "Token tidak valid atau kadaluarsa", error: err.message });
    }
  };

