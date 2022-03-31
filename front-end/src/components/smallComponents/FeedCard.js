import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FeedCard = (props) => {
  let { title, clean_url, media, published_date } = props.data;
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
      published_date: props.data.published_date,
      link: props.data.link,
      topic: props.data.topic,
      media: props.data.media,
      excerpt: props.data.excerpt,
      summary: props.data.summary,
      clean_url: props.data.clean_url,
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
      <p className="h5 text-justify">{title}</p>

      <img
        className="card-img-top w-50 mx-auto mt-1"
        src={media}
        alt="artilce"
      />
      <p>{clean_url}</p>
      <div className="d-flex">
        <button
          className="btn btn-outline-primary mx-2"
          onClick={(e) => nav("/details", { state: props.data })}
        >
          View Article
        </button>
        <button
          className="btn btn-success"
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
