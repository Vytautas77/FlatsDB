const express = require("express");
const router = express.Router();
const {
  GET_ALL_USERS,
  ADD_USER,
  GET_USER_BY_ID,
  GET_USER_BY_ID_WITH_FLAT,
  UPDATE_USER,
  DELETE_USER,
  LOGIN,
} = require("../controller/user");

router.post("/users", ADD_USER);
router.post("/users/login", LOGIN);
router.get("/users", GET_ALL_USERS);
router.get("/users/:id", GET_USER_BY_ID);
router.get("/users/:id/flats", GET_USER_BY_ID_WITH_FLAT);
router.put("/users/:id", UPDATE_USER);
router.delete("/users/:id", DELETE_USER);

module.exports = router;
