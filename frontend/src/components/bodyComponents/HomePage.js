import React from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from '../Navbar'
import Footer from '../Footer'
import '../../App.css';
import { useHistory } from 'react-router-dom';

export default function HomePage(props) {
  const history = useHistory()
  function handleClick () {
    if (localStorage.getItem('video-token')) {
      history.push("/video-library")
    }
    else {
      history.push("/login")
    }

  }  
  const handle_logout = () => {
    localStorage.removeItem('video-token');
    localStorage.removeItem('user-id')
    window.location.reload();
  };

  return (
    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <header className="masthead mb-auto">
      <div className="inner">
        <h3 className="masthead-brand">VideoMakerAI</h3>
        <Navbar />
      </div>
    </header>
    <main role="main" className="inner cover">
      <h1 className="cover-heading">CREATE AN ANIMATION WITHOUT KNOWING HOW TO ANIMATE</h1>
      <p className="lead">VideoMakerAI lets you automatically create videos from a group of images and videos</p>
      <p className="lead">
        <Button variant="secondary" onClick={handleClick}>{!localStorage.getItem('video-token') ? `Get Started` : `Go To Your Library`}</Button>&emsp;
        {localStorage.getItem('video-token')? (
          <Button variant="danger" onClick={handle_logout}>LogOut</Button>
        ) : null}
      </p>
    </main>
        <Footer />  
    </div>
  )
}
