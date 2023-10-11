const express = require("express");
const router = express.Router();
const {
  GET_ALL_FLATS,
  ADD_FLAT,
  ADD_FLAT_USER_ID,
  GET_FLAT_BY_ID,
  UPDATE_FLAT,
  DELETE_FLAT,
} = require("../controller/flats");

router.post("/flats", ADD_FLAT);
router.post("/flats/:userId", ADD_FLAT_USER_ID);
router.get("/flats", GET_ALL_FLATS);
router.get("/flats/:id", GET_FLAT_BY_ID);
router.put("/flats/:id", UPDATE_FLAT);
router.delete("/flats/:id", DELETE_FLAT);

module.exports = router;
