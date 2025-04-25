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
        let folder = "uploads/";
        if (file.fieldname === "file_pendukung") {
            folder += "bahan_ajar/";
        } else if (file.fieldname === "file_absensi") {
            folder += "absensi/";
        } else if (
            ["lembar_pengesahan", "laporan", "projek", "sertifikat", "konversi_nilai"].includes(file.fieldname)
        ) {
            folder += "msib/";
        } else if (file.fieldname === "file_rps") {
            folder += "rps/";
        } else if (file.fieldname === "file_kontrak_kuliah") {
            folder += "kontrak_kuliah/";
        } else if (file.fieldname === "file_laporan") {
            folder += "penelitian/";
        } else if (file.fieldname === "file_kegiatan") {
            folder += "pengabdian/";
        } else {
            folder += "misc/"; 
        }

        createFolderIfNotExists(folder);
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, ext);
        const newFileName = `${baseName}-${timestamp}${ext}`; 
        cb(null, newFileName);
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
});

export default upload;
