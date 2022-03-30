const UserController = require("../controllers/user.controller");

module.exports = (app) => {
  app.post("/api/register", UserController.registerUser);
  app.post("/api/login", UserController.login);
  app.post("/api/logout", UserController.logout);
  app.get("/api/profile", UserController.getProfile);
  app.put("/api/profile", UserController.updateProfile);
  app.get("/api/feed/:interest?/:page?", UserController.feed);
  // app.post("/api/test", (req, res) => {
  //   let interest = req.body.interest;
  //   console.log(interest);
  //   console.log(typeof interest);
  //   interest_arr = interest.split(",");
  //   console.log(interest_arr);
  //   res.json(interest);
  // });
};
