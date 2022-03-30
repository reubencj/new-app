
const FavoritesCard = (props) => {
    const {article} = props
    //const [news, setNews] = useState([]); //The state that we could set when we pull from the Api
    
    return (
            <div  className="container border border-dark">
                <div>
                    <h1>{article.title}</h1> 
                </div>
                <div>
                    <img src={article.media} alt=""></img>
                </div>
                <div>
                    <p>{article.summary}</p>
                </div>
            </div>
    )
}

export default FavoritesCard;