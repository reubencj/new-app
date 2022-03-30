const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//get axios and setup it's configuration
const axios = require("axios").default;
const CONFIG = {
  headers: { "x-api-key": process.env.NEWS_API_KEY },
  timeout: 1000,
};

// Register a new user
const registerUser = async (req, res) => {
  // check to see if user exists
  let query;
  try {
    // if user with that email exists, send an error message and return out of the function
    query = await User.findOne({ email: req.body.email });
    if (query) {
      res
        .status(400)
        .json({ errorMessage: "User with that email already exists" });
      return;
    }
  } catch (error) {
    res.status(400).json(error);
  }

  // Create user
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    console.log("error");
    res.status(400).json(error);
  }
};

// Login existing user
const login = async (req, res) => {
  // If email not sent from client send error message and return
  if (!req.body.email) {
    res.status(400).json({ error: "No email provided" });
    return;
  }

  // Find user with email

  // define userQuery globally
  let userQuery;
  try {
    userQuery = await User.findOne({ email: req.body.email });
  } catch (error) {
    res.status(400).json(error);
    return;
  }

  console.log("userQuery", userQuery);

  // Check if user with email exists
  if (userQuery === null) {
    res.status(400).json({ error: "Cannot find user with that email" });
    return;
  }

  // Check userQuery against the password with bcrypt compare function
  try {
    const compareBoolean = await bcrypt.compare(
      req.body.password,
      userQuery.password
    );
    if (!compareBoolean) {
      res.status(401).json({ error: "Incorrect email or password" });
      return;
    }
  } catch (error) {
    res.status(400).json(error);
    return;
  }

  const userToken = await jwt.sign(
    { id: userQuery._id },
    process.env.SECRET_KEY
  );
  res.json({ userToken });
};

// Protected route
const protected = async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  let decodedToken;
  try {
    // Verify the usertoken using the secret key to get a decoded token
    decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    console.log("error block");
    res.status(401).json(error);
    return;
  }
  console.log(decodedToken);
  res.send("Check your terminal");
};

// Logout route
const logout = (req, res) => {
  console.log(req.cookie);
  res.clearCookie("usertoken");
  res.json({ message: "logout successful" });
};

const feed = (req, res) => {
  axios
    .get(
      "https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=business&page_size=2",
      CONFIG
    )
    .then((response) => res.json(response.data))
    .catch((err) => console.log(err));
};

module.exports = {
  registerUser,
  login,
  protected,
  logout,
  feed,
};

// const test = async () => {
//   console.log(CONFIG);
//   try {
//     const latest_news = await axios.get(
//       "/latest_headlines?countries=US&topic=business&page_size=2",
//       CONFIG
//     );
//     res.json(latest_news);
//   } catch (err) {
//     console.log(err);
//   }
// };
// require("dotenv").config();
// console.log(process.env.PORT);
// // test();
