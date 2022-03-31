import Navbar from "../smallComponents/Navbar";
import { useState, useEffect } from "react";
import FeedCard from "../smallComponents/FeedCard";
import axios from "axios";

const CONFIG =  {headers: {Authorization: sessionStorage.getItem("userToken")}}

const Feed = (props) => {
  //const { userId } = props;
  const [page, setPage] = useState(1);
  const [article, setArticle] = useState([]);
  const [userInterest, setUserInterest] = useState([]);
  const [selectedInterest, setSelectedInterest] = useState();

  useEffect(() => {
    axios.get("http://localhost:8000/api/feed/", CONFIG).then((res) => {
      setUserInterest(res.data.message.user_interests);
      
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/api/feed/" + selectedInterest + "?" + page + "?", CONFIG).then((res) => {
      console.log(res.data);
      setArticle(res.data.message.articles);
    });
  }, [selectedInterest]);

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
          <select
              className="form-select"
              aria-label="multiple select example"
              onChange={(e) => setSelectedInterest(e.target.value)}
            >
              {userInterest.map((interest, index) => {
                return (
                  <option key={index} value={interest}>
                    {interest}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-9">
          {/* {props.article.map((article, index) => {
            return (
              <div key={index}>
                <FeedCard
                  title={article.title}
                  media={article.media}
                  summary={article.summary}
                />
              </div>
            );
          })} */}
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
