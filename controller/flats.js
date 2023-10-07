const flatModel = require("../models/flats");
const userModel = require("../models/user");

const ADD_FLAT = (req, res) => {
  const flat = new flatModel({
    miestas: req.body.miestas,
    kaina: req.body.kaina,
    plotas: req.body.plotas,
    plotoVienetas: req.body.plotoVienetas,
    kambariuSkaicius: req.body.kambariuSkaicius,
  });
  const id = flat._id.toString();
  flat.id = id;
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
// susikuriame objekta ir jo ID ipushiname i userio masyva
const ADD_FLAT_USER_ID = (req, res) => {
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
      userModel //objekto id ikeliame i userio masyva userFlatProducts
        .updateOne(
          { _id: req.params.userId },
          { $push: { userFlatProducts: dbResponse._id } }
        )
        .exec();

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
  ADD_FLAT_USER_ID,
  GET_ALL_FLATS,
};
