const flatModel = require("../models/flats");

const ADD_FLAT = (req, res) => {
  const flat = new flatModel({
    miestas: req.body.miestas,
    kaina: req.body.kaina,
    plotas: req.body.plotas,
    plotoVienetas: req.body.plotoVienetas,
    kambariuSkaicius: req.body.kambariuSkaicius,
  });
  flat
    .save()
    .then((dbResponse) => {
      return res
        .status(201)
        .json({ response: "Flat was added", flat: dbResponse });
    })
    .catch((err) => {
      console.log("ERROR: ", err);
      res.status(500).json({ response: "Something went wrong!" });
    });
};

const GET_ALL_FLATS = (req, res) => {
  flatModel.find().then((response) => {
    return res.send({ flats: response });
  });
};

module.exports = {
  ADD_FLAT,
  GET_ALL_FLATS,
};
