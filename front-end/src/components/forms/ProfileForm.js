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
    
// WIll check if a item is in the interests, if it exists then it takes it out and the comma, if it doesn't exist then it adds it with a comma and no space.
    const handleOnChangeSetInterests = (e) => {
        let targetInterest = e.target.value;
        if(interests.indexOf(targetInterest) !== -1) {
            let tempInterests = interests.replace(`${targetInterest},`, '');
            setInterests(tempInterests);
        }
        else {
            let tempInterests = interests + ',' + targetInterest;
            setInterests(tempInterests);
        }
    }

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
                    <label htmlFor="interests" className="form-label">Interests:</label>
                    {userToken?
                    <div className="form-check">
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleOnChangeSetInterests(e)}>
                        <label className="form-check-label" disabled>Open this select menu</label>
                    </input>
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleOnChangeSetInterests(e)}>
                        <label className="form-check-label" value="news">News</label>
                    </input>
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleOnChangeSetInterests(e)}>
                        <label className="form-check-label" value="sport">Sports</label>
                    </input>
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleOnChangeSetInterests(e)}>
                        <label className="form-check-label" value="tech">Tech</label>
                    </input>
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleOnChangeSetInterests(e)}>
                        <label className="form-check-label" value="world">World</label>
                    </input>
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleOnChangeSetInterests(e)}>
                        <label className="form-check-label" value="finance">Finance</label>
                    </input>
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleOnChangeSetInterests(e)}>
                        <label className="form-check-label" value="politics">Politics</label>
                    </input>
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleOnChangeSetInterests(e)}>
                        <label className="form-check-label" value="business">Business</label>
                    </input>
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleOnChangeSetInterests(e)}>
                        <label className="form-check-label" value="economics">Econimics</label>
                    </input>
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleOnChangeSetInterests(e)}>
                        <label className="form-check-label" value="entertainment">Entertainment</label>
                    </input>
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleOnChangeSetInterests(e)}>
                        <label className="form-check-label" value="beauty">Beauty</label>
                    </input>
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleOnChangeSetInterests(e)}>
                        <label className="form-check-label" value="gaming">Gaming</label>
                    </input>
                    </div>
                    :
                    <div className="form-check">
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleOnChangeSetInterests(e)}>
                        <label className="form-check-label" disabled>Open this select menu</label>
                    </input>
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleOnChangeSetInterests(e)}>
                        <label className="form-check-label" value="news">News</label>
                    </input>
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleOnChangeSetInterests(e)}>
                        <label className="form-check-label" value="sport">Sports</label>
                    </input>
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleOnChangeSetInterests(e)}>
                        <label className="form-check-label" value="tech">Tech</label>
                    </input>
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleOnChangeSetInterests(e)}>
                        <label className="form-check-label" value="world">World</label>
                    </input>
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleOnChangeSetInterests(e)}>
                        <label className="form-check-label" value="finance">Finance</label>
                    </input>
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleOnChangeSetInterests(e)}>
                        <label className="form-check-label" value="politics">Politics</label>
                    </input>
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleOnChangeSetInterests(e)}>
                        <label className="form-check-label" value="business">Business</label>
                    </input>
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleOnChangeSetInterests(e)}>
                        <label className="form-check-label" value="economics">Econimics</label>
                    </input>
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleOnChangeSetInterests(e)}>
                        <label className="form-check-label" value="entertainment">Entertainment</label>
                    </input>
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleOnChangeSetInterests(e)}>
                        <label className="form-check-label" value="beauty">Beauty</label>
                    </input>
                    <input type="checkbox" className="form-check-input" onChange={(e) => handleOnChangeSetInterests(e)}>
                        <label className="form-check-label" value="gaming">Gaming</label>
                    </input>
                    </div>
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