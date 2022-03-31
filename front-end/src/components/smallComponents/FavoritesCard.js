import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const FavoritesCard = (props) => {
  const { title, media, clean_url } = props.data;
  let nav = useNavigate();
  const CONFIG = {
    headers: { Authorization: sessionStorage.getItem("userToken") },
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8000/api/favorites/${props.data._id}`, CONFIG)
      .then((res) => props.setToggle(!props.toggle))
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column shadow p-3 mb-5 bg-white rounded align-items-center">
      <div>
        <h1>{title}</h1>
      </div>
      <img
        className="card-img-top w-50 mx-auto mt-1"
        src={media}
        alt="artilce"
      />
      <p>{clean_url}</p>
      <div className="d-flex">
        <button
          className="btn btn-outline-dark mx-2"
          onClick={(e) => nav("/details", { state: props.data })}
        >
          View Article
        </button>
        <button className="btn btn-dark" onClick={(e) => handleDelete(e)}>
          delete
        </button>
      </div>
    </div>
  );
};

export default FavoritesCard;
