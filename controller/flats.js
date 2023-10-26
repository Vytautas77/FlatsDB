const flatModel = require("../models/flats");
const userModel = require("../models/user");

const ADD_FLAT = async (req, res) => {
  try {
    const flat = new flatModel({
      miestas: req.body.miestas,
      kaina: req.body.kaina,
      plotas: req.body.plotas,
      plotoVienetas: "m2",
      kambariuSkaicius: req.body.kambariuSkaicius,
    });
    const id = flat._id.toString();
    flat.id = id;
    const flatResponse = await flat.save();
    return res
      .status(201)
      .json({ response: "Flat was added", flat: flatResponse });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

// susikuriame objekta ir jo ID ipushiname i userio masyva
const ADD_FLAT_USER_ID = async (req, res) => {
  try {
    const flat = new flatModel({
      miestas: req.body.miestas,
      kaina: req.body.kaina,
      plotas: req.body.plotas,
      plotoVienetas: "m2",
      kambariuSkaicius: req.body.kambariuSkaicius,
    });
    const id = flat._id.toString();
    flat.id = id;
    const flatResponse = await flat.save();
    await userModel //objekto id ikeliame i userio masyva userFlatProducts
      .updateOne(
        { _id: req.body.userId },
        { $push: { userFlatProducts: flatResponse._id } }
      )
      .exec();
    return res
      .status(201)
      .json({ response: "Flat was added", flat: flatResponse });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

const GET_ALL_FLATS = async (req, res) => {
  try {
    const response = await flatModel.find();
    return res.send({ flats: response });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

const GET_FLAT_BY_ID = async (req, res) => {
  try {
    const response = await flatModel.findById(req.params.id);
    return res.json({ flats: response });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

const UPDATE_FLAT = async (req, res) => {
  try {
    const flatResponse = await flatModel.updateOne(
      { _id: req.params.id },
      { ...req.body }
    );
    return res
      .status(200)
      .json({ status: "Task was updated", response: flatResponse });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

const DELETE_FLAT = async (req, res) => {
  try {
    const flatResponse = await flatModel.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ response: flatResponse, status: "Task was deleted!" });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

module.exports = {
  ADD_FLAT,
  ADD_FLAT_USER_ID,
  GET_ALL_FLATS,
  GET_FLAT_BY_ID,
  UPDATE_FLAT,
  DELETE_FLAT,
};
