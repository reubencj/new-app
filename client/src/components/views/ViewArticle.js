import { useState } from "react";
import Navbar from "../smallComponents/Navbar";

const ViewArticle = (props) => {
    const {userId} = props;
    const [article, setArticle] = useState({});

    useEffect(()=>{
        axios.get(``)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setArticle(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [])

    return (
        <div className="container">
            <h1>{article.title}</h1>
            <img url={urlToImage} alt={article.title}></img>
            <p>{article.content}</p>
        </div>
    )
}

export default ViewArticle;