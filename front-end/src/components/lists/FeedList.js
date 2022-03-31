import React, { useEffect, useState } from "react";

const FeedList = (props) => {
  const { userId } = props;
  const [newSource, setNewSource] = useState({
    newsItems: "",
    isSelected: false,
  });
  const [feedList, setFeedList] = useState([]);

  const addNewSourceToFeedListHandler = (e) => {
    e.preventDefault();
    const newFeedList = [...feedList, newSource];
    setFeedList(newFeedList);
  };

  const editNewSourceHandler = (e) => {
    let newItem = {
      newsItems: e.target.value,
      isSelected: false,
    };
    setNewSource(newItem);
  };

  const editNewSourceInFeedListHandler = (e) => {
    let idx = e.target.value;
    feedList[idx].isSelected = !feedList[idx].isSelected;
    setFeedList([...feedList]);
  };

  return <div></div>;
};

export default FeedList;
