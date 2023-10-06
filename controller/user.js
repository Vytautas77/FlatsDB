const userModel = require("../models/user");

const ADD_USER = (req, res) => {
  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
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

module.exports = {
  ADD_USER,
  GET_ALL_USERS,
};
