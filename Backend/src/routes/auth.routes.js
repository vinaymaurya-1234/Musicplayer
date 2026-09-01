const express = require("express");
const aa  = require("../controllers/auth.controllers");

const router = express.Router();



router.post('/register', aa.registerUser)
router.post('/login',aa.loginUser)



module.exports = router;