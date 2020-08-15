import React, {useEffect, useState} from 'react';
import HomePage from './components/bodyComponents/HomePage';
import GetStartedPageOne from './components/bodyComponents/GetStartedPageOne';
import StockSelection from './components/bodyComponents/StockSelection';
import VideoLibrary from './components/bodyComponents/VideoLibrary'
import SignupForm from './components/bodyComponents/SignupForm'
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './components/bodyComponents/SignIn';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null)


  useEffect(() => {
    let logged_in = localStorage.getItem('video-token') ? true : false
    setLoggedIn(logged_in)

    if (loggedIn) {
      fetch('http://localhost:8000/core/current_user/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('video-token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          setUsername(json.username);
          setUserId(json.id)
          localStorage.setItem('user-id', json.id)
        });
    }});

  return (
      <BrowserRouter>

        <Switch>
          <Route exact name="homepage" path="/" component={() => <HomePage loggedIn={loggedIn} /> } />
          <Route exact name="signin" path="/login" component={SignIn} />
          <Route exact name="signup"path="/signup" component={SignupForm} />
          <Route exact name="started1" path="/get-started" component={GetStartedPageOne} />
          <Route exact name="videolibrary" path="/video-library" component={() => <VideoLibrary userId={userId} />} />
          <Route exact name="stockselection" path="/stock-selection/:vidType" component={StockSelection} />
          {/*<Route exact name="videodetail" path="/videodetail/:vidDetail" component={StockSelection} />*/}
        </Switch>
    
      </BrowserRouter>
  );
}

export default App;
