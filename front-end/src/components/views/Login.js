import Navbar from "../smallComponents/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Login = (props) => {
  const [errors, setErrors] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    let dataSet = { email, password };
    axios
      .post("http://localhost:8000/api/login", dataSet)
      .then((res) => {
        console.log(res.data);
        sessionStorage.setItem("userToken", res.data.userToken);
        navigate("/feed");
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setErrors(err.response.data.error);
      });
  };

  useEffect(() => sessionStorage.removeItem("userToken"), []);

  const handleNav = (e) => {
    navigate(`/registration`);
  };

  return (
    <>
      <div className="col-fluid mx-0">
        <h1 className="text-center display-1 bg-dark shadow text-white">
          News App
        </h1>
      </div>
      <form onSubmit={(e) => handleLogin(e)}>
        <div className="container-md">
          <div className="row">
            <div className="col-md-5">
              <h3>Login</h3>
              <label htmlFor="email" className="form-label text-start">
                Email:
              </label>
              <input
                type="email"
                className="form-control form-control-sm"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              ></input>

              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control form-control-sm"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-2">
              <button type="submit" className="btn btn-dark">
                Login
              </button>
            </div>
            <div className="col-md-2">
              <button
                onClick={(e) => handleNav(e)}
                className="btn btn-outline-dark"
              >
                Sign Up
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 mt-2">
              {errors && <div className="alert alert-danger">{errors}</div>}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
