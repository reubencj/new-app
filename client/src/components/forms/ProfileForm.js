import axios from "axios";
import { useState } from "react";

const ProfileForm = (props) => {
    const {userId} = props;
    const [user, setUser] = useState({});

    const handleEdit = () => {}

    const handleCreate= () => {}

    return (
        <div>
            <form>
                <div>
                    <label htmlFor="name" className="form-label">Name:</label>
                    {userId?
                    <input type="text" className="form-control" id="name" value={user.name}></input>
                    :
                    <input type="text" className="form-control" id="name" ></input>
                    }
                    <label htmlFor="email" className="form-label">Email:</label>
                    {userId?
                    <input type="email" className="form-control" id="email" value={user.email}></input>
                    :
                    <input type="email" className="form-control" id="email" ></input>
                    }
                    <label htmlFor="password" className="form-label">Password:</label>
                    {userId?
                    <input type="password" className="form-control" id="password" value={user.password}></input>
                    :
                    <input type="password" className="form-control" id="password" ></input>
                    }
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                    {userId?
                    <input type="password" className="form-control" id="confirmPassword" value={user.name}></input>
                    :
                    <input type="password" className="form-control" id="confirmPassword" ></input>
                    }
                </div>
                <div>
                    {/* We will need to get both the interests and the news source options from a call to the news api that way users only see those options */}
                    {/* The information here is currently a placeholder */}
                    <label htmlFor="interests" className="form-label">Interests:</label>
                    {userId?
                    <select className="form-select">
                        {/* Going to have to map all the favorites that were selected so that they appear in this menu */}
                        {/* Replace this with a map of the api */}
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    :
                    <select className="form-select">
                        {/* Replace this with a map of the api */}
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    }
                    {/* The information here is currently a placeholder */}
                    <label htmlFor="newsSource" className="form-label">News Source:</label>
                    {userId?
                    <select className="form-select" value={user.newsSource}>
                        {/* Replace this with a map of the api */}
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    :
                    <select className="form-select">
                        {/* Replace this with a map of the api */}
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    }
                </div>
                {userId?
                    <button type="submit" className="btn btn-success" onClick={(e) => handleEdit(e)}>Submit Changes</button>
                    :
                    <button type="submit" className="btn btn-success" onClick={(e) => handleCreate(e)}>Sign Up</button>
            }
            </form>
        </div>
    )
}

export default ProfileForm;