import { useState } from "react";

const FeedCard = (props) => {
    
    const [news, setNews] = useState([]); //The state that we could set when we pull from the Api
    const [favorite, setFavorite] = useState(false);

    const setButtonState = () => { //To make the button toggle from filled to filled star if favorited or unfilled star
                                   //We can add the addtional code to this function
        setFavorite(!favorite);
    }

    return (
        <div  className="container border border-dark">
            <div>
                <h1>{news.title}</h1> 
            </div>
            <div>
                <img src={news.image} alt=""></img>
            </div>
            <div>
                {favorite?
                <button type="button" className="btn btn-warning"><span className="bi bi-star-fill" onClick={(e) => {setButtonState()}}></span>Favorite</button>
                :
                <button type="button" className="btn btn-warning"><span className="bi bi-star" onClick={(e) => {setButtonState()}}></span>Favorite</button>
                }
            </div>
        </div>
    )
}

export default FeedCard;