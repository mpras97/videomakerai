import React from 'react';
import logo from './logo.svg';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import HomePage from './components/bodyComponents/HomePage';
import GetStartedPageOne from './components/bodyComponents/GetStartedPageOne';
import StockSelection from './components/bodyComponents/StockSelection';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import SignInOut from './components/bodyComponents/SignInOut';

function App() {
  return (
      <BrowserRouter>

        <Switch>
          <Route exact name="homepage" path="/" component={HomePage} />
          <Route exact name="signinout" path="/login" component={SignInOut} />
          <Route exact name="started1" path="/get-started" component={GetStartedPageOne} />
          <Route exact name="stockselection" path="/stock-selection/:vidType" component={StockSelection} />
        </Switch>
    
      </BrowserRouter>
  );
}

export default App;
