import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileForm = (props) => {
  const { userToken } = props;
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [interests, setInterests] = useState([]);
  //const [newsSource, setNewsSource] = useState("");
  const navigate = useNavigate();

  useEffect((userToken) => {
    if (userToken) {
      axios
        .get(`http://localhost:8000/api/users/${userToken}`)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    let dataSet = { firstName, lastName, email, password, confirmPassword, interests};
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

  const handleEdit = (e) => {
    e.preventDefault();
    let dataSet = { firstName, lastName, email, password, confirmPassword, interests};
    axios
      .put(`http://localhost:8000/api/profile/${userToken}`, dataSet)
      .then((res) => {
        
        console.log(res.data);
        navigate("/feed");
      })
      .catch((err) => {
        
        console.log(err);
        setErrors(err.response.data.errors);
      });
  };

  // WIll check if a item is in the interests, if it exists then it takes it out and the comma, if it doesn't exist then it adds it with a comma and no space.
  const handleOnChangeSetInterests = (e) => {
    e.preventDefault();
    let targetInterest = e.target.value;
    if (interests.indexOf(targetInterest) !== -1) {
      let tempInterests = interests.replace(`${targetInterest},`, "");
      setInterests(tempInterests);
    } else {
      let tempInterests = interests + "," + targetInterest;
      setInterests(tempInterests);
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          userToken ? handleEdit(e) : handleCreate(e);
        }}
      >
        <div>
          <div>
          <label htmlFor="name" className="form-label">
            First Name:
          </label>
          {userToken ? (
            <input
              type="text"
              className="form-control"
              id="name"
              value={user.firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          ) : (
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          )}
          <label htmlFor="name" className="form-label">
            Last Name:
          </label>
          {userToken ? (
            <input
              type="text"
              className="form-control"
              id="name"
              value={user.lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          ) : (
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          )}
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          {userToken ? (
            <input
              type="email"
              className="form-control"
              id="email"
              value={user.email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          ) : (
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          )}
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          {userToken ? (
            <input
              type="password"
              className="form-control"
              id="password"
              value={user.password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          ) : (
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          )}
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password:
          </label>
          {userToken ? (
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={user.confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          ) : (
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          )}
          </div>
          <div>
            <label htmlFor="interests" className="form-label">
            Interests:
          </label>
          {userToken ? (
            <input
              type="interests"
              className="form-control"
              id="interests"
              value={user.interests}
              onChange={(e) => setInterests(e.target.value)}
            ></input>
          ) : (
            <input
              type="interests"
              className="form-control"
              onChange={(e) => setInterests(e.target.value)}
            ></input>
          )}
            

          </div>
        

        </div>
        
        {userToken ? (
          <button type="submit" className="btn btn-success">
            Submit Changes
          </button>
        ) : (
          <button type="submit" className="btn btn-success">
            Sign Up
          </button>
        )}
      </form>
    </div>
  );
};

export default ProfileForm;
