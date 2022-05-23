import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FeedCard = (props) => {
  let [favDisable, setFavDisable] = useState(false);
  const CONFIG = {
    headers: { Authorization: sessionStorage.getItem("userToken") },
  };
  let nav = useNavigate();

  const addToFavorite = (e) => {
    //To make the button toggle from filled to filled star if favorited or unfilled star
    //We can add the addtional code to this function

    e.preventDefault();
    let data = {
      title: props.data.title,
      author: props.data.author,
      published_date: props.data.publishedAt,
      link: props.data.url,
      media: props.data.urlToImage,
      summary: props.data.content,
    };
    axios
      .post("http://localhost:8000/api/favorites", data, CONFIG)
      .then((res) => {
        console.log(res);
        setFavDisable(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column shadow p-3 mb-5 bg-white rounded align-items-center">
      <p className="h5 text-justify">{props.data.title}</p>

      <img
        className="card-img-top w-50 mx-auto mt-1 mb-2"
        src={props.data.urlToImage}
        alt="artilce"
      />
      <p>{props.data.description}</p>
      <div className="d-flex">
        <button
          className="btn btn-outline-dark mx-2"
          onClick={(e) => nav("/details", { state: props.data })}
        >
          View Article
        </button>
        <button
          className="btn btn-dark"
          disabled={favDisable}
          onClick={(e) => addToFavorite(e)}
        >
          Favorite
        </button>
      </div>
    </div>
  );
};

export default FeedCard;
