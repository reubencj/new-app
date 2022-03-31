import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { disabled } from "express/lib/application";

const ProfileForm = (props) => {
    const {userToken} = props;
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [interests, setInterests] = useState([]);
    const [newsSource, setNewsSource] = useState("");
    const navigate = useNavigate();

    useEffect((userToken)=>{
        if (userToken) {
            axios.get(`http://localhost:8000/api/players/${userToken}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setUser(res.data)
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }, [])

    const handleCreate = (e) => {
        e.preventDefault();
        let dataSet = {name, email, password, interests, newsSource}
        axios.post('http://localhost:8000/api/users', dataSet)
            .then((res)=>{
                console.log(res.data);
                navigate('/feed');
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors)
        });
    };

    const handleEdit = (e) => {
        e.preventDefault();
        let dataSet = {name, email, password, interests, newsSource}
        axios.put(`http://localhost:8000/api/users/${userToken}`, dataSet)
            .then((res)=>{
                console.log(res.data);
                navigate('/feed');
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors)
        });
    };


    return (
        <div>
            <form onSubmit={(e) => {userToken? handleEdit(e) : handleCreate(e)}}>
                <div>
                    <label htmlFor="name" className="form-label">Name:</label>
                    {userToken?
                    <input type="text" className="form-control" id="name" value={user.name} onChange={(e) => setName(e.target.value)}></input>
                    :
                    <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)}></input>
                    }
                    <label htmlFor="email" className="form-label">Email:</label>
                    {userToken?
                    <input type="email" className="form-control" id="email" value={user.email} onChange={(e) => setEmail(e.target.value)}></input>
                    :
                    <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                    }
                    <label htmlFor="password" className="form-label">Password:</label>
                    {userToken?
                    <input type="password" className="form-control" id="password" value={user.password} onChange={(e) => setPassword(e.target.value)}></input>
                    :
                    <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)}></input>
                    }
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                    {userToken?
                    <input type="password" className="form-control" id="confirmPassword" value={user.name} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                    :
                    <input type="password" className="form-control" id="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)}></input>
                    }
                </div>
                <div>
                    {/* We will need to get both the interests and the news source options from a call to the news api that way users only see those options */}
                    {/* The information here is currently a placeholder */}
                    <label htmlFor="interests" className="form-label">Interests:</label>
                    {userToken?
                    <select className="form-select">
                        {/* Going to have to map all the favorites that were selected so that they appear in this menu */}
                        {/* Replace this with a map of the api */}
                        <option disabled>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    :
                    <select className="form-select">
                        {/* Replace this with a map of the api */}
                        <option disabled>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    }
                    {/* The information here is currently a placeholder */}
                    <label htmlFor="newsSource" className="form-label">News Source:</label>
                    {userToken?
                    <select className="form-select" value={user.newsSource} onChange={(e) => setNewsSource(e.target.value)}>
                        {/* Replace this with a map of the api */}
                        <option disabled>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    :
                    <select className="form-select" onChange={(e) => setNewsSource(e.target.value)}>
                        {/* Replace this with a map of the api */}
                        <option disabled>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    }
                </div>
                {userToken?
                    <button type="submit" className="btn btn-success">Submit Changes</button>
                    :
                    <button type="submit" className="btn btn-success">Sign Up</button>
            }
            </form>
        </div>
    )
}

export default ProfileForm;