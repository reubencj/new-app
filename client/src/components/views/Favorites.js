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