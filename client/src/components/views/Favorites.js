import Navbar from "../smallComponents/Navbar";
import { useEffect, useState} from "react";
import axios from "axios";
import FavoritesCard from "../smallComponents/FavoritesCard";

const HEADER = () => {
    {
        headers: {
            Authorization: sessionStorage.getItem("user_token")
        }
    }
}

const Favorites = (props) => {
const [articles, setArticles] = useState([]);



    useEffect(() => {
        axios.get('http://localhost:8000/api/favorites')
        .then(res=> {
            setArticles(res.data);
        });
        }, [articles])

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
        <div>
            {articles.map((article, index) => {
                    return <div key={index}>
                                <FavoritesCard title = {article.title} media = {article.media} summary = {article.summary}/>
                            </div>     
                })}
        </div>
    )
}

export default Favorites;