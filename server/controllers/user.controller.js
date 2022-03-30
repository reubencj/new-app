const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
  let id = userQuery.id
  console.log(id);
  const userToken = await jwt.sign(
    { id: id },
    process.env.SECRET_KEY
  );
  res.json({ userToken });
};

// Protected route
const protected = async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  try {
    let id = await handleAuth(token);
    res.json({id})
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
    return;
  }
//   let decodedToken;
//   try {
//     // Verify the usertoken using the secret key to get a decoded token
//     decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
//   } catch (error) {
//     console.log("error block");
//     res.status(401).json(error);
//     return;
//   }
//   console.log(decodedToken);
//   res.send("Check your terminal");
};

// Logout route
const logout = (req, res) => {
  console.log(req.cookie);
  res.clearCookie("userToken");
  res.json({ message: "logout successful" });
};

// Promise for handling authoriation
const handleAuth = (token) => {
    // const token = req.headers.authorization;
    console.log(token);
    return new Promise((resolve, reject) => {
        try {
            // Verify the usertoken using the secret key to get a decoded token
            let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            resolve(decodedToken.id)
        } catch (error) {
            console.log("error");
            reject(error)
        }
    });
};



// Get one profile
const getProfile = async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  try {
    let user = await handleAuth(token);
    let userObject = await User.findById(user);
    res.json({ 
        firstName: userObject.firstName, 
        lastName: userObject.lastName,
        email: userObject.email,
        // interests: userObject.interests
    })
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
    return;
  }
}

// Update profile
const updateProfile = async (req, res) => {
    await handleAuth();
    User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
            new: true,
            runValidators: true
        })
        .then((updatedProfile) => res.json(updatedProfile))
        .catch((err) => res.status(400).json(err))
    }

module.exports = {
  registerUser,
  login,
  protected,
  logout,
  getProfile,
  updateProfile
};
