import Navbar from "../smallComponents/Navbar";
import { useEffect, useState} from "react";

const HEADER = () => {
    {
        headers: {
            Authorization: sessionStorage.getItem("user_token")
        }
    }
}

const Favorites = (props) => {
    const {userId} = props;
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/api/feed/:page')
        .then(res=> {
            setArticle(res.data);
        });
        }, [article])

    return (
        <div>
            {props.article.map((article, index) => {
                    return <div key={index}>
                                <FavoritesCard title = {article.title} media = {article.media} summary = {article.summary}/>
                            </div>     
                })}
        </div>
    )
}

export default Favorites;