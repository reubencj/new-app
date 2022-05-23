import Navbar from "../smallComponents/Navbar";
import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = (props) => {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [interests, setInterests] = useState([]);
  const navigate = useNavigate();

  const interestsOptions = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const handleCreate = (e) => {
    e.preventDefault();
    let dataSet = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      interests,
    };
    axios
      .post("http://localhost:8000/api/register", dataSet)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.dir(err.response);
        setErrors(err.response.data.errors);
      });
  };

  const handleSelect = function (selectedItems) {
    const interestList = [];
    for (let i = 0; i < selectedItems.length; i++) {
      interestList.push(selectedItems[i].value);
    }
    setInterests(interestList);
    console.log(interests);
  };

  return (
    <>
      <div className="col-fluid mx-0">
        <h1 className="text-center display-1 bg-dark shadow text-white">
          News App
        </h1>
      </div>
      <div className="container">
        <div>
          <h1>Sign Up Page</h1>
        </div>
        <form
          onSubmit={(e) => {
            handleCreate(e);
          }}
        >
          <div>
            <div>
              <label htmlFor="name" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.hasOwnProperty("firstName") && (
                <div className="alert alert-danger">
                  {errors.firstName.message}
                </div>
              )}

              <label htmlFor="name" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.hasOwnProperty("lastName") && (
                <div className="alert alert-danger">
                  {errors.lastName.message}
                </div>
              )}

              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.hasOwnProperty("email") && (
                <div className="alert alert-danger">{errors.email.message}</div>
              )}

              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.hasOwnProperty("password") && (
                <div className="alert alert-danger">
                  {errors.password.message}
                </div>
              )}

              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password:
              </label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
              {errors.hasOwnProperty("confirmPassword") && (
                <div className="alert alert-danger">
                  {errors.confirmPassword}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="interests" className="form-label">
                Interest:
                <span className="text-muted">
                  Press ctrl/cmd to select multiple options
                </span>
              </label>
              <select
                className="form-select"
                multiple
                aria-label="multiple select example"
                onChange={(e) => handleSelect(e.target.selectedOptions)}
              >
                {interestsOptions.map((interest, index) => {
                  return (
                    <option key={index} value={interest}>
                      {interest}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-dark mt-2">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default Registration;
