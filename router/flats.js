const express = require("express");
const router = express.Router();
const { GET_ALL_FLATS, ADD_FLAT } = require("../controller/flats");

router.post("/flats", ADD_FLAT);
router.get("/flats", GET_ALL_FLATS);

module.exports = router;
