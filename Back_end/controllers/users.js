const { Users } = require("../models/usermodel.js");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'nip', 'name', 'email', 'role']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
};

const getUserById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['nip', 'name', 'email', 'role'],
            where: { id: req.params.id }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const Register = async (req, res) => {
    const { nip, name, email, password, confPassword, role } = req.body;
    if (password !== confPassword)
        return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });

    try {
        const hashPassword = await bcrypt.hash(password, await bcrypt.genSalt());
        await Users.create({ nip, name, email, password: hashPassword, role });
        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const updateUser = async (req, res) => {
    const user = await Users.findOne({ where: { id: req.params.id } });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    const { nip, name, email, password, confPassword, role } = req.body;
    let hashPassword = user.password;

    if (password && password !== "") {
        if (password !== confPassword)
            return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });

        hashPassword = await bcrypt.hash(password, await bcrypt.genSalt());
    }

    try {
        await Users.update({ nip, name, email, password: hashPassword, role }, {
            where: { id: user.id }
        });
        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const deleteUser = async (req, res) => {
    const user = await Users.findOne({ where: { id: req.params.id } });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    try {
        await user.destroy();
        res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

module.exports = {
    getUsers,
    getUserById,
    Register,
    updateUser,
    deleteUser
};
