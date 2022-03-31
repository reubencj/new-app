const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//get axios and setup it's configuration
const axios = require("axios").default;

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

  data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    email: req.body.email,
    interests: req.body.interests //Removed .split was getting an error when registering
  };

  if (data.password !== data.confirmPassword) {
    res
        .status(400)
        .json({ errorMessage: "Passwords must match" });
  }

  // Create user
  try {
    const newUser = await User.create(data);
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
  let id = userQuery.id;
  console.log(id);
  const userToken = await jwt.sign({ id: id }, process.env.SECRET_KEY);
  res.json({ userToken });
};

// Logout route
const logout = (req, res) => {
  console.log(req.cookie);
  res.clearCookie("userToken");
  res.json({ message: "logout successful" });
};

const feed = async (req, res) => {
  try {
    const token = req.headers.authorization;
    let user = await handleAuth(token);
    let userObject = await User.findById(user);
    let interest = userObject.interests[0];
    console.log(userObject);
    let page = 1;
    console.log(req.params);
    if (req.params.interest) {
      interest = req.params.interest;
    }

    if (req.params.page) {
      page = req.params.page;
    }
    let config = {
      headers: { "x-api-key": process.env.NEWS_API_KEY },
      timeout: 1000,
      params: {
        countries: "US",
        lang: "en",
        page_size: 10,
        page: page,
        topic: interest,
      },
    };

    let result = await axios.get(
      `https://api.newscatcherapi.com/v2/latest_headlines`,
      config
    );
    result = result.data;
    let data = {
      select_interest: interest,
      user_interests: userObject.interests,
      page: result.page,
      total_pages: result.total_pages,
      page_size: result.page_size,
      articles: result.articles,
    };
    console.log("interest: ", interest);
    console.log("page ", page);
    console.log(data);
    res.json({ message: data });
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
};

// Promise for handling authoriation
const handleAuth = (token) => {
  // const token = req.headers.authorization;
  console.log(token);
  return new Promise((resolve, reject) => {
    try {
      // Verify the usertoken using the secret key to get a decoded token
      let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      resolve(decodedToken.id);
    } catch (error) {
      console.log("error");
      reject(error);
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
      interests: userObject.interests,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
    return;
  }
};

// Update profile
const updateProfile = async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  let data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    interests: req.body.interests
  };
  try {
    let user = await handleAuth(token);
    let userObject = await User.findByIdAndUpdate(user, data);
    res.json({ userObject })
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
    return;
  }
  // await handleAuth();
  // User.findOneAndUpdate({ _id: req.params.id }, req.body, {
  //   new: true,
  //   runValidators: true,
  // })
  //   .then((updatedProfile) => res.json(updatedProfile))
  //   .catch((err) => res.status(400).json(err));
};

// Get favorites
const getFavorites = async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  try {
    let user = await handleAuth(token);
    let userObject = await User.findById(user);
    res.json({
      favorites: userObject.favorites
    });
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
    return;
  }
}

// Add favorite
const addFavorite = async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  try {
    let user = await handleAuth(token);
    let userObject = await User.findById(user);

    // let data = {
    //   req.body
    // }
    // push new favorite into user's array
    userObject.favorites.push( req.body )
    
    // save updated user to the db
    const updated = await userObject.save()
    console.log(updated);
    res.json({updated});
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
    return;
  }
}

const removeFavorite = async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  try {
    let user = await handleAuth(token);
    let userObject = await User.findById(user);
    userObject.favorites.id( req.params.id ).remove();
    const updated = await userObject.save()
    console.log(updated);
    res.json({updated})
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
    return;
  }
}

module.exports = {
    registerUser,
    login,
    logout,
    feed,
    getProfile,
    getFavorites,
    addFavorite,
    removeFavorite,
    updateProfile
};