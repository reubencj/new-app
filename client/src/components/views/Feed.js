import Navbar from "../smallComponents/Navbar";

import FeedList from "../lists/FeedList";

const Feed = (props) => {
    const {userId} = props;

    return (
        <div>
            <FeedList userId={userId} />
        </div>
    )
}

export default Feed;