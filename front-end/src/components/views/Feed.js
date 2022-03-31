import Navbar from "../smallComponents/Navbar";
import { useState, useEffect } from "react";
import FeedCard from "../smallComponents/FeedCard";
import axios from "axios";

const CONFIG =  {headers: {Authorization: sessionStorage.getItem("user_token")}}

const Feed = (props) => {
  //const { userId } = props;
  const [page, setPage] = useState(1);
  const [article, setArticle] = useState([]);
  const [data, setData] = useState();

  useEffect(() => {
    axios.get("http://localhost:8000/api/feed/", CONFIG).then((res) => {
      setData(res.data);
    });
  }, []);

  const nextPage = (e) => {
    e.preventDefault();
    setPage(page + 1);
  };

  const prevPage = (e) => {
    e.preventDefault();
    setPage(page - 1);
  };

  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <div>{/* <h1>Hi, {userID} welcome to your feed</h1> */}</div>
      <div className="container">
        <div className="col-3">
          <div>
          <select class="form-select" aria-label="Disabled select example" disabled>
            <option selected>Interest</option>
            {
              props.article.map( (x,y) => 
              <option key={y}>{x}</option> )
            }
          </select>   
          </div>
        </div>
        <div className="col-9">
          {props.article.map((article, index) => {
            return (
              <div key={index}>
                <FeedCard
                  title={article.title}
                  media={article.media}
                  summary={article.summary}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div>
        {() => {
          if (page == 1) {
            return (
              <button
                className="btn btn-secondary"
                onClick={(e) => {
                  nextPage();
                }}
              >
                Next Page
              </button>
            );
          } else if (page > 1 && page < 1000) {
            return (
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={(e) => {
                    prevPage();
                  }}
                >
                  Previous Page
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={(e) => {
                    nextPage();
                  }}
                >
                  Next Page
                </button>
              </div>
            );
          } else {
            return (
              <button
                className="btn btn-secondary"
                onClick={(e) => {
                  prevPage();
                }}
              >
                Previous Page
              </button>
            );
          }
        }}
      </div>
    </div>
  );
};

export default Feed;
