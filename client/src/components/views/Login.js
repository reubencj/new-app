import Navbar from "../smallComponents/Navbar";
import { navigate } from "@reach/router";
import { useState } from "react";
import axios from "axios";

const Login = (props) => {
    const {errors, setErrors} = useState({});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        let dataSet = {email, password}
        axios.post('http://localhost:8000/api/login', dataSet)
            .then((res)=>{
                console.log(res.data);
                navigate('/feed');
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors)
        });
    };

    const handleNav = (e) => {
        navigate(`/registration`);
    }

    return (
        <div className="container">
            <Navbar />
            <div>
                <h1>News App</h1>
            </div>
            <div className="col align-self-start">
                <h3>Sign Up Here</h3>
                <button onClick={(e) => handleNav(e)}>Sign Up</button>
            </div>
            <div className="col align-self-end">
                <h3>Login In Here</h3>
                <form onSubmit={(e) => handleLogin(e)}>
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" onChange={(e) => setEmail(e.target.value)}></input>
                    <button type="submit" className="btn btn-success">Login</button>
                </form>
            </div>
        </div>
    )

}

export default Login;