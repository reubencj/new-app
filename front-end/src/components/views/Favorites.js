import Navbar from "../smallComponents/Navbar";
import { useEffect, useState} from "react";
import axios from "axios";
import FavoritesCard from "../smallComponents/FavoritesCard";

const CONFIG =  {headers: {Authorization: sessionStorage.getItem("userToken")}}


const Favorites = (props) => {
const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/favorites', CONFIG)
        .then(res=> {
            console.log(res.data.favorites);
            setArticles(res.data.favorites);
        });
        }, [])

    return (
        <div>
            <Navbar userToken={CONFIG}/>
            { articles.map((article, index) => {
                    return <div key={index}>
                                <FavoritesCard title = {article.title} media = {article.media} summary = {article.summary}/>
                            </div>     
                })}
        </div>
    )
}

export default Favorites;