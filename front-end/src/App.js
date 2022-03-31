import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/views/Login";
import Registration from "./components/views/Registration";
import EditProfile from "./components/views/EditProfile";
import Favorites from "./components/views/Favorites";
import Feed from "./components/views/Feed";
import ViewArticle from "./components/views/ViewArticle";
// import { useState } from "react";
// import TestComponent from "./components/smallComponents/TestComponent";

function App() {
  // setting the user Id in App.Js so that state can be passed down to all necessary components/views without having to call the Back-end for each
  // view/component and storing it in state. It will later be passed to each view as a prop.

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* To view the articles a userId needs to be required and would be passed down as a prop */}
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/favorites" element={<Favorites />} />

          <Route path="/details" element={<ViewArticle />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
