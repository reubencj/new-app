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
    "news",
    "sport",
    "tech",
    "world",
    "finance",
    "politics",
    "business",
    "economics",
    "entertainment",
    "beauty",
    "travel",
    "music",
    "food",
    "science",
    "gaming",
    "energy",
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
        console.log(err);
        setErrors(err.response.data.errors);
      });
  };

  const handleSelect = function (selectedItems) {
      
    const interestList = [];
    for (let i = 0; i < selectedItems.length; i++) {
      interestList.push(selectedItems[i].value);
    }
    setInterests(interestList);
    console.log(interests)
  };

  return (
    <div className="container">
      <Navbar />
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
              id="name"
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
            <label htmlFor="name" className="form-label">
              Last Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={(e) => setLastName(e.target.value)}
            ></input>
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="interests" className="form-label">
              Interest:(Press ctrl/cmd to select multiple options) 
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
        <button type="submit" className="btn btn-success">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Registration;
