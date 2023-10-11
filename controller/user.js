const { response } = require("express");
const userModel = require("../models/user");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const ADD_USER = async (req, res) => {
  try {
    const user = new userModel({
      name: req.body.name,
      email: req.body.email,
      userFlatProducts: [],
    });
    const userResponse = await user.save();
    return res
      .status(201)
      .json({ response: "User was added", user: userResponse });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

const GET_ALL_USERS = async (req, res) => {
  try {
    const userResponse = await userModel.find();
    return res.send({ users: userResponse });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};
const GET_USER_BY_ID = async (req, res) => {
  try {
    const userResponse = await userModel.findById(req.params.id);
    return res.status(200).json({ user: userResponse });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

const GET_USER_BY_ID_WITH_FLAT = async (req, res) => {
  try {
    const useResponse = await userModel
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
      .exec();
    return res.status(201).json({ user: userResponse });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

const UPDATE_USER = async (req, res) => {
  try {
    const userResponse = await userModel.updateOne(
      { _id: req.params.id },
      { ...req.body }
    );
    return res
      .status(200)
      .json({ status: "Task was updated", response: userResponse });
  } catch (err) {
    console.log("ERROS: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

const DELETE_USER = async (req, res) => {
  try {
    const userResponse = await userModel.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ response: userResponse, status: "Task was deleted!" });
  } catch (err) {
    console.log("ERROS: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

module.exports = {
  ADD_USER,
  GET_ALL_USERS,
  GET_USER_BY_ID,
  GET_USER_BY_ID_WITH_FLAT,
  UPDATE_USER,
  DELETE_USER,
};
