import Navbar from "../smallComponents/Navbar";
import FeedList from "../lists/FeedList";
import { useState } from "react";
import FeedCard from "../smallComponents/FeedCard"
const Feed = (props) => {
    const {userId} = props;
    const [user, setUser] = useState({})

    

    return (
        <div>
            <div>
                <Navbar userId={userId}/>
            </div>
            <div>
                <h1>Hi, {user.name} welcome to your feed</h1>
            </div>
            <div className="container">
                <div className="col-3">
                    <div>
                        <h2>Filter</h2>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                        <label className="form-check-label">
                            Top Stories
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                        <label className="form-check-label">
                            US
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                        <label className="form-check-label">
                            World
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                        <label className="form-check-label">
                            World
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                        <label className="form-check-label">
                            Sports
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                        <label className="form-check-label">
                            Entertainment
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                        <label className="form-check-label">
                            Money
                        </label>
                    </div>
                </div>
                <div className="col-9">
                    <FeedList userId={userId} />
                </div>
            </div>
        </div>
    )
}

export default Feed;