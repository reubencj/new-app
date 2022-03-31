import { useState, useEffect } from "react";
import Navbar from "../smallComponents/Navbar";
import axios from "axios";

const CONFIG = () => {
  {
      headers: {
          Authorization: sessionStorage.getItem("user_token")
      }
  }
}
const ViewArticle = (props) => {
  const [article, setArticle] = useState({});

  useEffect(() => {
    axios
      .get(``)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setArticle(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <Navbar userId={userId} />
      <h1>{props.location.state.title}</h1>  //This is what we might do to pass stuff from the cards to the view article page
      <img url={props.location.state.media} alt={props.location.state.title}/>
      <p>{props.location.state.summary}</p>
    </div>
  );
};

export default ViewArticle;
