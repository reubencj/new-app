<<<<<<< HEAD

const FavoritesCard = (props) => {
    const {title, media, summary} = props;
    
    return (
            <div  className="container border border-dark">
                <div>
                    <h1>{title}</h1> 
                </div>
                <div>
                    <img src={media} alt={title}/>
                </div>
                <div>
                    <p>{summary}</p>
                </div>
            </div>
    )
}

=======

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

>>>>>>> f4a2e44853ee741025a6a67e4848570112bd3dfe
export default FavoritesCard;