const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ArticleSchema = new mongoose.Schema({
  title: String,
  author: String,
  published_date: Date,
  link: String,
  topic: String,
  clean_url: String,
  media: String,
  excerpt: String,
  summary: String,
});

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      // Validator function uses pattern matching to determine if email is valid
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(val),
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    // Double check interests and sources please. Do we need requirements?
    interests: {
      type: [String],
      required: [true, "Select at least 1 interest"],
    },
    favorites: [ArticleSchema],
  },
  { timestamps: true }
);

// Virtual 'confirm password' field
UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

// Check to make sure passwords match
// UserSchema.pre("validate", function (next) {
//   console.log("inside pre validate");
//   // If passwords don't match, send an error message
//   if (this.password !== this.confirmPassword) {
//     this.invalidate("confirmPassword", "Passwords must match");
//   }
//   next();
// });

// Hash the password
UserSchema.pre("save", function (next) {
  console.log("inside hash");
  bcrypt
    .hash(this.password, 10)
    .then((hash) => {
      // set mongo doc password to the hash
      this.password = hash;
      console.log("hashing password");
      // go to the next thing: the controller
      next();
    })
    .catch((err) => {
      console.log("Inside error block");
      console.log(err);
    });
});

module.exports = mongoose.model("User", UserSchema);
// module.exports = mongoose.model("Article", ArticleSchema);
