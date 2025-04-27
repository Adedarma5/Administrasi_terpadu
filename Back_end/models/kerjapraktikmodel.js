
import Sequelize from 'sequelize';
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const KerjaPraktik = db.define('kerja_praktik', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nim: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    dosen_pembimbing: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    judul: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    tempat_kp: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    tanggal_mulai: {
        type: DataTypes.DATE,
        allowNull: false,

    },
    tanggal_selesai: {
        type: DataTypes.DATE,
        allowNull: false,

    },
    krs_terakhir: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    pengesahan_prodi: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    pengesahan_pembimbing: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    nilai_perusahaan: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    daftar_hadir: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    laporan: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    projek: {
        type: DataTypes.STRING,
        allowNull: true,

    },
}, {
    freezeTableName: true,
    timestamps: false,
});

export default KerjaPraktik;