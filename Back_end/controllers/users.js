import Users from "../models/usermodel.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'nip', 'nidn', 'foto_users', 'name', 'email', 'role']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
};

export const getUserById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: [ 'foto_users', 'nip', 'nidn', 'name', 'email', 'role'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const Register = async (req, res) => {
    const { nip, name, email, password, confPassword, role } = req.body;

    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    }

    if (!req.file) {
        return res.status(400).json({ msg: "Foto wajib diupload" });
    }

    try {
        const hashPassword = await bcrypt.hash(password, await bcrypt.genSalt());
        const foto_users = req.file.filename;

        await Users.create({
            foto_users,
            nip,
            nidn,
            name,
            email,
            password: hashPassword,
            role,
        });

        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


export const updateUser = async (req, res) => {
    const user = await Users.findOne({
        where: { id: req.params.id }
    });

    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    const { nip, nidn, name, email, password, confPassword, role } = req.body;

    let hashPassword = user.password;
    if (password && password !== "") {
        if (password !== confPassword) {
            return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
        }
        hashPassword = await bcrypt.hash(password, await bcrypt.genSalt());
    }

    let foto_users = user.foto_users;
    if (req.file) {
        foto_users = req.file.filename;
    }

    try {
        await Users.update({
            nip,
            nidn,
            name,
            email,
            password: hashPassword,
            role,
            foto_users
        }, {
            where: { id: user.id }
        });

        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const user = await Users.findOne({
        where: { id: req.params.id }
    });

    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    try {

        await user.destroy();
        res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
