import Navbar from "../smallComponents/Navbar";
import ProfileForm from "../forms/ProfileForm";
import { useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CONFIG =  {headers: {Authorization: sessionStorage.getItem("user_token")}}

const EditProfile = (props) => {
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({});
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [interests, setInterests] = useState([]);
    const navigate = useNavigate();

    // useEffect((userToken) => {
    //     if (userToken) {
    //       axios
    //         .get(`http://localhost:8000/api/users/${userToken}`)
    //         .then((res) => {
    //           console.log(res);
    //           console.log(res.data);
    //           setUser(res.data);
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //     }
    //   }, []);

    // const handleEdit = (e) => {
    //     e.preventDefault();
    //     let dataSet = { firstName, lastName, email, password, confirmPassword, interests};
    //     axios
    //       .put(`http://localhost:8000/api/profile/${userToken}`, dataSet)
    //       .then((res) => {
            
    //         console.log(res.data);
    //         navigate("/feed");
    //       })
    //       .catch((err) => {
            
    //         console.log(err);
    //         setErrors(err.response.data.errors);
    //       });
    //   };
    
    const handleSelect = function(selectedItems) {
        const interestList = [];
        for (let i=0; i<selectedItems.length; i++) {
            interestList.push(selectedItems[i].value);
        }
        setInterests(interestList);
    }

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

return (
    <div className="container">
        <Navbar userToken={CONFIG}/>
        {/* <ProfileForm userToken={CONFIG}/> */}
        <div>
        <h1>Edit Profile</h1>
      </div>
      <form
        onSubmit={(e) => {
        //   handleEdit(e);
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
              id="firstName"
              value={user.firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
            <label htmlFor="name" className="form-label">
              Last Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={user.lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={user.email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={user.password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={user.confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="interests" className="form-label">
            Interest: Press ctrl/cmd to select multiple options
            </label>
            <select
              className="form-select"
              multiple
              aria-label="multiple select example"
              onChange={(e) => handleSelect(e.target.selectedOptions)}
            >
              {interestsOptions.map((interest) => {
                return <option value={interest} >{interest}</option>;
              })}
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          Submit Changes
        </button>
      </form>
    </div>
)
}

export default EditProfile;