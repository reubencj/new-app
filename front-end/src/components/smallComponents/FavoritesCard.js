import {Link} from "react-router-dom"

const FavoritesCard = (props) => {
    const {title, media, summary} = props;
    
    return (
            <div  className="container border border-dark">
                <div>
                    <h1>{title}</h1> 
                </div>
                <div>
                    <img src={media} className="img-fluid img-thumbnail" alt={title}/>
                </div>
                <div>
                    <p>{summary}</p>
                </div>
                <div>
                    <button className="btn btn-info"><Link to={{ pathname: "/details", state: props.data }}>View Page</Link></button>
                </div>
            </div>
    )
}

export default FavoritesCard;