const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  GET_ALL_FLATS,
  ADD_FLAT,
  ADD_FLAT_USER_ID,
  GET_FLAT_BY_ID,
  UPDATE_FLAT,
  DELETE_FLAT,
} = require("../controller/flats");

router.post("/flats", auth, ADD_FLAT);
router.post("/flats/", auth, ADD_FLAT_USER_ID);
router.get("/flats", auth, GET_ALL_FLATS);
router.get("/flats/:id", GET_FLAT_BY_ID);
router.put("/flats/:id", auth, UPDATE_FLAT);
router.delete("/flats/:id", auth, DELETE_FLAT);

module.exports = router;
