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
      <div className="container">
        <h1>{location.state.title}</h1>
        <img src={location.state.media} alt={location.state.title} />
        <p>By {location.state.author}</p>
        <div>
          <p className="text-start">{location.state.summary}</p>
        </div>
        <button
          onClick={() => window.open(location.state.link)}
          className="btn btn-dark"
        >
          Read Full Article
        </button>
      </div>
    </>
  );
};

export default ViewArticle;
