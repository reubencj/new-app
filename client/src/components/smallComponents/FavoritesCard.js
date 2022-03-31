
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

export default FavoritesCard;