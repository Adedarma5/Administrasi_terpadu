import Users from "../models/usermodel.js";


export const verifyUser = async (req, res, next) => {
    try {

        const user = await Users.findOne({
            where: {
                nip: req.user?.nip  
            }
        });

        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan" });
        }

        req.userId = user.id;
        req.role = user.role;
        req.nip = user.nip; 
        next(); 
    } catch (error) {
        return res.status(500).json({ msg: "Terjadi kesalahan server", error: error.message });
    }
};




export const adminOnly = async (req, res, next) => {
    try {
        const user = await Users.findOne({
            where: {
                nip: req.user?.nip  
            }
        });

        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan" });
        }

    
        if (user.role !== "admin") {
            return res.status(403).json({ msg: "Akses hanya untuk admin" });
        }

        next(); 
    } catch (error) {
        return res.status(500).json({ msg: "Terjadi kesalahan server", error: error.message });
    }
};

