import Users from "../models/usermodel.js";
import bcrypt from "bcrypt";
import users from "../models/usermodel.js";

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
         attributes: ['id','nip','name','email', 'role']
        });
        res.json(users);
    } catch (error){
        console.log(error);
    }
}

export const getUserById = async(req, res) =>{
    try {
        const response = await Users.findOne({
            attributes:['nip','name','email','role'],
            where: {
                nip: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const Register = async (req, res) => {
    const { nip, name, email, password, confPassword, role } = req.body;
    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    }
    try {
        const hashPassword = await bcrypt.hash(password, await bcrypt.genSalt());

        await Users.create({
            nip: nip,
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });

        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const updateUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            nip: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    const { name, email, password, confPassword, role } = req.body;
    let hashPassword = user.password; 

    if (password && password !== "") {
        if (password !== confPassword) {
            return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
        }
        hashPassword = await bcrypt.hash(password, await bcrypt.genSalt()); 
    }

    try {
        await Users.update(
            {
                name: name,
                email: email,
                password: hashPassword,
                role: role
            },
            {
                where: {
                    id: user.id
                }
            }
        );
        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deleteUser = async(req, res) =>{
    const user = await users.findOne({
        where: {
            nip: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    try {
        await user.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
};



