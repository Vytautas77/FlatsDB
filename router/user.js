const express = require("express");
const router = express.Router();
const {
  GET_ALL_USERS,
  ADD_USER,
  GET_USER_BY_ID,
  GET_USER_BY_ID_WITH_FLAT,
} = require("../controller/user");

router.post("/users", ADD_USER);
router.get("/users", GET_ALL_USERS);
router.get("/users/:id", GET_USER_BY_ID);
router.get("/users/:id/flats", GET_USER_BY_ID_WITH_FLAT);

module.exports = router;
