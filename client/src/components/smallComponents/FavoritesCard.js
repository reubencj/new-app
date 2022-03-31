
const FavoritesCard = (props) => {
    const {article} = props
    //const [news, setNews] = useState([]); //The state that we could set when we pull from the Api
    
    return (
        <div class="card">
            <div class="card-header">
                <h1>{article.title}</h1> 
            </div>
            <div class="card-body">
                <img src={article.media} alt=""></img>
            </div>
            <div class="card-footer text-muted">
                <p>{article.summary}</p>
                <div>
                    <button className="btn btn-info"><Link to={{pathname:"/details", state:article}}>View Page</Link></button>
                </div>
            </div>
        </div>
            // <div  className="container border border-dark">
            //     <div>
            //         <h1>{article.title}</h1> 
            //     </div>
            //     <div>
            //         <img src={article.media} alt=""></img>
            //     </div>
            //     <div>
            //         <p>{article.summary}</p>
            //     </div>
            // </div>
    )
}

export default FavoritesCard;