const express = require("express");
const router = express.Router();
const {
  GET_ALL_FLATS,
  ADD_FLAT,
  ADD_FLAT_USER_ID,
} = require("../controller/flats");

router.post("/flats", ADD_FLAT);
router.post("/flats/:userId", ADD_FLAT_USER_ID);
router.get("/flats", GET_ALL_FLATS);

module.exports = router;
