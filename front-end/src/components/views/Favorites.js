import Navbar from "../smallComponents/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import FavoritesCard from "../smallComponents/FavoritesCard";

const CONFIG = {
  headers: { Authorization: sessionStorage.getItem("userToken") },
};

const Favorites = (props) => {
  const [articles, setArticles] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/api/favorites", CONFIG).then((res) => {
      // console.log(res.data.favorites);
      setArticles(res.data.favorites);
      setLoaded(true);
    });
  }, [toggle]);

  return (
    <div>
      <Navbar userToken={CONFIG} />
      <div className="container">
        <div className="row mt-3">
          {loaded &&
            articles.map((article) => {
              return (
                <div key={article._id}>
                  <FavoritesCard
                    data={article}
                    toggle={toggle}
                    setToggle={setToggle}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
