const express = require("express");
const {signup,signin,getUser} =require('./../controller/user');
const router = express.Router();

// POST /api/user/signup - User signup
router.post("/signup", signup);

// POST /api/user/login - User login
router.post("/login", signin);

router.get("/getuser", getUser);

module.exports = router;
