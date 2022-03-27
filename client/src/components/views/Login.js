import Navbar from "../smallComponents/Navbar";
import { navigate } from "@reach/router";

const Login = (props) => {

    return (
        <div className="container">
            <Navbar />
            <div>
                <h1>News App</h1>
            </div>
            <div className="col align-self-start">
                <h3>Sign Up Here</h3>
                <button onClick={navigate(`/registration`)}>Sign Up</button>
            </div>
            <div className="col align-self-end">
                <h3>Login In Here</h3>
                <form>
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" ></input>
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" ></input>
                    <button type="submit" className="btn btn-success" onClick={(e) => handleLogin(e)}>Login</button>
                </form>
            </div>
        </div>
    )

}

export default Login;