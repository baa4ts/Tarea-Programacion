const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");
const withAuth = require("../middleware/withAuth");

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/user", withAuth, auth.user);
module.exports = router;
