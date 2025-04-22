import multer from "multer";
import path from "path";
import fs from "fs";

const createFolderIfNotExists = (folder) => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        let folder = "uploads/";

        if (ext === ".pdf") {
            if (req.body.type === "rps") {
                folder += "rps/";
            } else if (req.body.type === "msib") {
                folder += "msib/";
            } else {
                folder += "bahan_ajar/";
            }
        } else if ([".jpg", ".jpeg", ".png"].includes(ext)) {
            folder += "absensi/";
        } else {
            return cb(new Error("Format file tidak didukung"), false);
        }

        createFolderIfNotExists(folder);
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".pdf"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(ext)) {
        return cb(new Error("Format file tidak diizinkan"), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

export default upload;