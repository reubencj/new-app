const mongoose = require("mongoose");
require("dotenv").config();

// db name needed
const dbName = "news";

mongoose
  .connect(`${process.env.MONGO_HOST}${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to database: ${dbName}`);
  })
  .catch((err) => {
    console.log(err);
  });
