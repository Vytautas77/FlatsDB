const express = require("express");
const router = express.Router();
const { GET_ALL_USERS, ADD_USER } = require("../controller/user");

router.post("/users", ADD_USER);
router.get("/users", GET_ALL_USERS);

module.exports = router;
