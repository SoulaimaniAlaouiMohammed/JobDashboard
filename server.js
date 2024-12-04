const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const jobRoutes = require("./routes/jobRoutes");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use("/api/jobs", jobRoutes);


sequelize.sync().then(() => {
  console.log("Database connected!");
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
