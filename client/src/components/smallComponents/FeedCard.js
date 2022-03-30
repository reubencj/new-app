import { useState } from "react";
import Link from "react-router-dom";

const FeedCard = (props) => {
    const {article} = props
    //const [news, setNews] = useState([]); //The state that we could set when we pull from the Api
    const [favorite, setFavorite] = useState(false);

    const addToFavoriteHandler = () => { //To make the button toggle from filled to filled star if favorited or unfilled star
                                   //We can add the addtional code to this function
        
        e.preventDefault();
        axios.post('http://localhost:8000/api/favorites',
        {
            title,
            author,
            published_date,
            link,
            topic,
            source,
            media,
            excerpt,
            summary,
            _id
        }
        )
        .then(res=> console.log(res))
        .catch(err => console.log(err))
        setFavorite(!favorite);
    }

    const removeFromFavoriteHandler = () => { //Can we do soemthing like this if someone decides they don't actually want to favorite an item???
        e.preventDefault();
        axios.delete('http://localhost:8000/api/favorites',
        {
        title,
        author,
        published_date,
        link,
        topic,
        source,
        media,
        excerpt,
        summary,
        _id
        }
        )
        .then(res=> console.log(res))
        .catch(err => console.log(err))
        setFavorite(!favorite);
        }


    return (
        <div  className="container border border-dark">
            <div>
                <h1>{article.title}</h1> 
            </div>
            <div>
                <img src={article.media} alt=""></img>
            </div>
            <div>
                {favorite?
                <button type="button" className="btn btn-warning"><span className="bi bi-star-fill" onClick={(e) => {addToFavoriteHandler()}}></span>Favorite</button>
                :
                <button type="button" className="btn btn-warning"><span className="bi bi-star" onClick={(e) => {removeFromFavoriteHandler()}}></span>Favorite</button>
                }
            </div>
            <div>
                <button className="btn btn-info"><Link to={{pathname:"/details", state:article}}>View Page</Link></button>
            </div>
        </div>
    )
}

export default FeedCard;