const express = require("express");
const {
    registerUser,
    loginUser,
    getUserProfile, getAllUsers,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.get("/", protect, getAllUsers);

module.exports = router;