import { useState, useEffect } from "react";
import Navbar from "../smallComponents/Navbar";
import axios from "axios";
import { useLocation } from "react-router-dom";

const CONFIG = {
  headers: { Authorization: sessionStorage.getItem("userToken") },
};

const ViewArticle = (props) => {
  const location = useLocation();
  // const [article, setArticle] = useState(typeoflocation.state);
  useEffect(() => {
    console.log(location.state);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container-md">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="text-center">{location.state.title}</h1>
            <img
              src={location.state.urlToImage || location.state.media}
              alt={location.state.title}
              className="img-fluid"
            />
            <p>By {location.state.author}</p>
            <div>
              <p className="text-start text-muted">{location.state.content}</p>
            </div>
            <button
              onClick={() => window.open(location.state.url)}
              className="btn btn-dark"
            >
              Read Full Article
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewArticle;
