const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const clientRoutes = require("./routes/ClientRoutes");
const ratingRoutes = require("./routes/RatingRoutes");

const app = express();

mongoose
  .connect("mongodb+srv://rajkrishnam120:Admin123@royal-traders.fsnnlei.mongodb.net/")
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(cors())

app.use("/client", clientRoutes);
app.use("/rating", ratingRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server Running On http://localhost:${PORT}`);
});