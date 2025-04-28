import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    console.error("Token tidak ditemukan di header.");
    return res.status(401).json({ message: "Tidak ada token. Silakan login." });
  }

  console.log("Authorization Header:", authHeader);

  const tokenParts = authHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    console.error("Format authorization header tidak valid.");
    return res.status(401).json({ message: "Format token tidak valid (seharusnya 'Bearer <token>')." });
  }

  const token = tokenParts[1];
  console.log("Extracted Token:", token); 

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT Error:", err.message);

      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ message: "Token sudah kadaluarsa. Silakan login kembali." });
      }

      return res.status(403).json({ message: "Token tidak valid" });
    }

    console.log("Token valid. Data decoded:", decoded);

    req.user = {
      id: decoded.userId,
      nip: decoded.nip,
      name: decoded.name,
      role: decoded.role
    };

    next();
  });
};
