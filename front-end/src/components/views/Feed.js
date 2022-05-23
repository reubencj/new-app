import Navbar from "../smallComponents/Navbar";
import { useState, useEffect } from "react";
import FeedCard from "../smallComponents/FeedCard";
import axios from "axios";

const CONFIG = {
  headers: { Authorization: sessionStorage.getItem("userToken") },
};

const Feed = (props) => {
  //const { userId } = props;
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [userInterest, setUserInterest] = useState([]);
  const [selectedInterest, setSelectedInterest] = useState();
  const [totalPage, setTotalPage] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/feed/", CONFIG)
      .then((res) => {
        setUserInterest(res.data.message.user_interests);
        console.dir(res.data.message);
        setSelectedInterest(res.data.message.select_interest);
        setArticles(res.data.message.articles);
        setTotalPage(res.data.message.total_pages);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const getArticle = () => {
    axios
      .get(`http://localhost:8000/api/feed/${selectedInterest}/${page}`, CONFIG)
      .then((res) => {
        setUserInterest(res.data.message.user_interests);
        console.dir(res.data.message);
        setSelectedInterest(res.data.message.select_interest);
        setArticles(res.data.message.articles);
        setPage(parseInt(res.data.message.page));
        setTotalPage(parseInt(res.data.message.total_pages));
      });
  };

  const nextPage = (e) => {
    e.preventDefault();
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  const prevPage = (e) => {
    e.preventDefault();
    if (page > 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    if (loaded) {
      getArticle();
      window.scrollTo(0, 0);
    }
  }, [page, selectedInterest]);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>{/* <h1>Hi, {userID} welcome to your feed</h1> */}</div>
      {loaded && (
        <div className="container">
          <div className="row mt-3">
            <div className="col-md-5">
              <select
                className="form-select"
                aria-label="multiple select example"
                onChange={(e) => {
                  setSelectedInterest(e.target.value);
                  setPage(1);
                }}
                value={selectedInterest}
              >
                {loaded &&
                  userInterest.map((interest, index) => {
                    return (
                      <option key={index} value={interest}>
                        {interest}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="row mt-3">
            {articles.map((article, index) => {
              return (
                <div className="col-md-4 mt-4" key={index}>
                  <FeedCard data={article} />
                </div>
              );
            })}
          </div>
          <div className="row mb-4 justify-content-between">
            <div className="col">
              <button
                className="btn btn-outline-dark"
                onClick={(e) => prevPage(e)}
                disabled={page <= 1}
              >
                Previous Page
              </button>
            </div>
            <div className="col">
              <p className="h6">Page {page}</p>
            </div>
            <div className="col">
              <button
                className="btn btn-dark align-self-end"
                onClick={(e) => nextPage(e)}
                disabled={page >= totalPage}
              >
                Next Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
