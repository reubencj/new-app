const FavoritesCard = (props) => {

    const [news, setNews] = useState([]); //The state that we could set when we pull from the Api
    
    return (
            <div  className="container border border-dark">
                <div>
                    <h1>{news.title}</h1> 
                </div>
                <div>
                    <img src={news.image} alt=""></img>
                </div>
                <div>
                    <p>{news.description}</p>
                </div>
            </div>
    )
}

export default FavoritesCard;