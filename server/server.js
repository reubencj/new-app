// Load environment variables from .env file into process.env
require("dotenv").config();

// Other imports/requirements
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("./config/mongoose.config");

app.use(cookieParser());

// credentials: true sets up express to get cookie in request header. Origin sets the client url for server to accept requests from.
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/user.routes")(app);


app.listen(process.env.PORT, () => console.log("Express running on", process.env.PORT));