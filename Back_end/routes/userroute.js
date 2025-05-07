const express = require("express");
const {
    getUsers,
    getUserById,
    Register,
    updateUser,
    deleteUser,
} = require("../controllers/users.js");
const { verifyToken } = require("../middleware/verifytoken.js");
const { refreshToken } = require("../controllers/refreshtoken.js");
const { adminOnly } = require("../middleware/AuthUser.js"); 

const router = express.Router();

router.get('/users', verifyToken,  getUsers);  
router.get('/token', refreshToken);
router.get('/users/:id', getUserById);  
router.post('/users', Register);
router.patch('/users/:id', updateUser); 
router.delete('/users/:id',  deleteUser); 

module.exports = router;
