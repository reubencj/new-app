import './App.css';
import { Router } from '@reach/router';
import Login from './components/views/Login';
import Registration from './components/views/Registration';
import EditProfile from './components/views/EditProfile';
import Favorites from './components/views/Favorites';
import Feed from './components/views/Feed';
import ViewArticle from './components/views/ViewArticle';
import { useState } from 'react';
import TestComponent from './components/smallComponents/TestComponent'
import axios from 'axios';

function App() {
  
  // setting the user Id in App.Js so that state can be passed down to all necessary components/views without having to call the Back-end for each
  // view/component and storing it in state. It will later be passed to each view as a prop.
  const [userId, setUserId] = useState("");

  return (
    <div className="App">
      <TestComponent/>
      <Router>
        {/* Both Login and Registration do not require a userId as a new user would not have one yet */}
        <Login path="/"/>
        <Registration path="/registration"/>
        {/* To view the articles a userId needs to be required and would be passed down as a prop */}
        <EditProfile path="/myprofile" userId = {userId}/>
        <Favorites path="/favorites" userId = {userId}/>
        <Feed path="/feed" userId = {userId}/>
        <ViewArticle path="/details/:articleId" userId = {userId}/>
      </Router>
    </div>
  );
}

export default App;
