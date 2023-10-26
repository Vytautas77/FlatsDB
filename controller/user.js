// eslint-disable-next-line no-unused-vars
const { response } = require("express");
const userModel = require("../models/user");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const ADD_USER = async (req, res) => {
//   try {
//     const user = new userModel({
//       name: req.body.name,
//       email: req.body.email,
//       userFlatProducts: [],
//     });
//     const userResponse = await user.save();
//     return res
//       .status(201)
//       .json({ response: "User was added", user: userResponse });
//   } catch (err) {
//     console.log("ERROR: ", err);
//     res.status(500).json({ response: "Something went wrong!" });
//   }
// };
// add su hash password
// const ADD_USER = (req, res) => {
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) {
//       res.status(500).json({ response: "something went wrong in generate" });
//     }
//     bcrypt.hash(req.body.password, salt, (err, hash) => {
//       if (err) {
//         res.status(500).json({ response: "something went wrong in hash" });
//       }
//       const user = new userModel({
//         name: req.body.name,
//         email: req.body.email,
//         userFlatProducts: [],
//         password: hash,
//       });
//       user
//         .save()
//         .then((dbResponse) => {
//           return res
//             .status(201)
//             .json({ response: "User was added", user: dbResponse });
//         })
//         .catch((err) => {
//           console.log("ERROR: ", err);
//           res.status(500).json({ response: "something went wrong" });
//         });
//     });
//   });
// };

// const ADD_USER = (req, res) => {
//   try {
//     const salt = bcrypt.genSaltSync(10);
//     var hash = bcrypt.hashSync(req.body.password, salt);
//     const user = new userModel({
//       name: req.body.name,
//       email: req.body.email,
//       user_tasks: [],
//       password: hash,
//     });
//     user
//       .save()
//       .then((dbResponse) => {
//         return res
//           .status(201)
//           .json({ response: "User was added", user: dbResponse });
//       })
//       .catch((err) => {
//         console.log("ERROR: ", err);
//         res.status(500).json({ response: "something went wrong" });
//       });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ response: "something went wrong" });
//   }
// };

const ADD_USER = (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const user = new userModel({
      name: req.body.name,
      email: req.body.email,
      user_tasks: [],
      password: hash,
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
        res.status(500).json({ response: "something went wrong" });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ response: "something went wrong" });
  }
};

const LOGIN = async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  console.log(user);

  if (!user) {
    return res.status(404).json({ response: "Bad auth User does not exist!" });
  }

  bcrypt.compare(req.body.password, user.password, (err, isPasswordMatch) => {
    if (!isPasswordMatch || err) {
      return res.status(401).json({ response: "Bad auth" });
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "12h" },
      { algorithm: "R5256" }
    );
    return res.status(201).json({ jwt: token });
  });
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
    // eslint-disable-next-line no-unused-vars
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
      .exec()
      .then((response) => {
        return res.status(201).json({ user: response });
      });
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
    console.log("ERROR: ", err);
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
    console.log("ERROR: ", err);
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
  LOGIN,
};
