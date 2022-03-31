import { useState } from "react";
import { Link } from "@reach/router";
import axios from "axios";

const FeedCard = (props) => {
    const {article} = props;
    //const [news, setNews] = useState([]); //The state that we could set when we pull from the Api
    const [favorite, setFavorite] = useState(false);
    const [title, setTitle] = useState(article.title);
    const [author, setAuthor] = useState(article.author);
    const [published_date, setPublished_date] = useState(article.published_date);
    const [link, setLink] = useState(article.link);
    const [topic, setTopic] = useState(article.topic);
    const [source, setSource] = useState(article.source);
    const [media, setMedia] = useState(article.media);
    const [excerpt, setExcerpt] = useState(article.excerpt);
    const [summary, setSummary] = useState(article.mesummarydia);
    const [_id, set_id] = useState(article._id);


    const addToFavoriteHandler = (e) => { //To make the button toggle from filled to filled star if favorited or unfilled star
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

    const removeFromFavoriteHandler = (e) => { //Can we do soemthing like this if someone decides they don't actually want to favorite an item???
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
                <button type="button" className="btn btn-warning"><span className="bi bi-star" onClick={(e) => removeFromFavoriteHandler(e)}></span>Un-Favorite</button>
                :
                <button type="button" className="btn btn-warning"><span className="bi bi-star-fill" onClick={(e) => addToFavoriteHandler(e)}></span>Favorite</button>
                }
            </div>
            <div>
                <button className="btn btn-info"><Link to={{pathname:"/details", state:article}}>View Page</Link></button>
            </div>
        </div>
    )
}

export default FeedCard;