import './App.css';
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './components/views/Login';
import Registration from './components/views/Registration';
import EditProfile from './components/views/EditProfile';
import Favorites from './components/views/Favorites';
import Feed from './components/views/Feed';
import ViewArticle from './components/views/ViewArticle';
import { useState } from 'react';
import TestComponent from './components/smallComponents/TestComponent'
import axios from 'axios';

const CONFIG = () => {
  {
      headers: {
          Authorization: sessionStorage.getItem("userToken")
      }
  }
}

function App() {
  
  // setting the user Id in App.Js so that state can be passed down to all necessary components/views without having to call the Back-end for each
  // view/component and storing it in state. It will later be passed to each view as a prop.
  const [userId, setUserId] = useState("");


  if (CONFIG) {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* To view the articles a userId needs to be required and would be passed down as a prop */}
            <Route path="/myprofile" element = {<EditProfile/>} />
            <Route path="/favorites" element = {<Favorites/>} />
            <Route path="/feed" element = { <Feed/>} />
            <Route path="/details/:id" element = {<ViewArticle/>} />
          </Routes>
        </BrowserRouter>
      </div>
    );
    }
    else {
      {/* Both Login and Registration do not require a userId as a new user would not have one yet and therfore are the only pages someone can see if they are not already logged in */}
      return (
        <div>
          <BrowserRouter>
            <Routes>
              {/* To view the articles a userId needs to be required and would be passed down as a prop */}
              <TestComponent/>
              <Route path="/" element = {<Login path="/"/>} />
              <Route path="/registration" element = {<Registration />} />
            </Routes>
          </BrowserRouter>
        </div>
    );
  }
}

export default App;
