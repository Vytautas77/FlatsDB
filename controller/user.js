const { response } = require("express");
const userModel = require("../models/user");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const ADD_USER = (req, res) => {
  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    userFlatProducts: [],
  });
  user
    .save()
    .then((dbResponse) => {
      return res
        .status(201)
        .json({ response: "User was added", user: dbResponse });
    })
    .catch((err) => {
      console.log("ERROR: ", err);
      res.status(500).json({ response: "Something went wrong!" });
    });
};

const GET_ALL_USERS = (req, res) => {
  userModel.find().then((response) => {
    return res.send({ users: response });
  });
};
const GET_USER_BY_ID = (req, res) => {
  userModel.findById(req.params.id).then((response) => {
    return res.status(200).json({ user: response });
  });
};

const GET_USER_BY_ID_WITH_FLAT = (req, res) => {
  userModel
    .aggregate([
      {
        $lookup: {
          from: "flats",
          localField: "userFlatProducts",
          foreignField: "id",
          as: "user_flats",
        },
      },
      { $match: { _id: new ObjectId(req.params.id) } }, // useris su musu nurodytu id
    ])
    .exec()
    .then((dbResponse) => {
      return res.status(201).json({ user: dbResponse });
    })
    .catch((err) => {
      console.log("ERROR: ", err);
      res.status(500).json({ response: "Something went wrong!" });
    });
};

module.exports = {
  ADD_USER,
  GET_ALL_USERS,
  GET_USER_BY_ID,
  GET_USER_BY_ID_WITH_FLAT,
};
