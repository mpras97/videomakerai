import React, {useEffect, useState} from 'react';
import HomePage from './components/bodyComponents/HomePage';
import GetStartedPageOne from './components/bodyComponents/GetStartedPageOne';
import StockSelection from './components/bodyComponents/StockSelection';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import SignInOut from './components/bodyComponents/SignInOut';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");


  useEffect(() => {

    console.log('here')
    console.log(localStorage.getItem('video-token'))
    let logged_in = localStorage.getItem('video-token') ? true : false
    console.log(logged_in)
    setLoggedIn(logged_in)
    console.log(`JWT ${localStorage.getItem('video-token')}`)

    if (loggedIn) {
      console.log('inside if')
      fetch('http://localhost:8000/core/current_user/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('video-token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          setUsername(json.username);
        });
    }});

  return (
      <BrowserRouter>

        <Switch>
          <Route exact name="homepage" path="/" component={() => <HomePage loggedIn={loggedIn} /> } />
          <Route exact name="signinout" path="/login" component={SignInOut} />
          <Route exact name="started1" path="/get-started" component={GetStartedPageOne} />
          <Route exact name="stockselection" path="/stock-selection/:vidType" component={StockSelection} />
          {/*<Route exact name="logout" path="/logout" component={logout} />*/}
        </Switch>
    
      </BrowserRouter>
  );
}

export default App;
