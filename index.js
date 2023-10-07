const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const flatRouter = require("./router/flats");
const userRouter = require("./router/user");

require("dotenv").config();
mongoose
  // eslint-disable-next-line no-undef
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log("ERROR :", err);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use(flatRouter);
app.use(userRouter);

app.use((req, res) => {
  return res.status(404).json({ response: "Indpoint not exis!" });
});

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () =>
  // eslint-disable-next-line no-undef
  console.log(`APP ${process.env.PORT} start work`)
);
