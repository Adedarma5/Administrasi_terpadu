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
        } else if (file.fieldname === "foto") {
            folder += "absensi/";
        } else if (
            ["lembar_pengesahan", "laporan", "projek",
                "sertifikat", "pengesahan_prodi", "pengesahan_pembimbing",
                "nilai_perusahaan", "daftar_hadir", "krs_terakhir", "konversi_nilai",
                "skripsi", "program_tga", "jurnal_sisfo"].includes(file.fieldname)
        ) {
            folder += "kegiatan_mahasiswa/";
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

const handleFileUploads = (req) => {
    const files = req.files || {};

    return {

        projek: files.projek ? files.projek[0].filename : null,
    };
};

const upload = multer({
    storage: storage,
});

export default upload;
