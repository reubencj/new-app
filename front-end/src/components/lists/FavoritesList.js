import React, { useEffect, useState } from "react";
import axios from 'axios'

const FavoritesList = (props) => {
  const { userId } = props;
  const [newSource, setNewSource] = useState({
    newsItems: "",
    isSelected: false,
  });
  const [favoritesList, setFavoritesList] = useState([]);

  const addNewSourceToFavoriteListHandler = (e) => {
    e.preventDefault();
    const newFavoritesList = [...favoritesList, newSource];
    setFavoritesList(newFavoritesList);
  };

  const editNewSourceHandler = (e) => {
    let newItem = {
      newsItems: e.target.value,
      isSelected: false,
    };
    setNewSource(newItem);
  };

  const editNewSourceInFavoriteListHandler = (e) => {
    let idx = e.target.value;
    favoritesList[idx].isSelected = !favoritesList[idx].isSelected;
    setFavoritesList([...favoritesList]);
  };

  return <div>

  </div>;
};

export default FavoritesList;
