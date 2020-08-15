import React from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from '../Navbar'
import Footer from '../Footer'
import '../../App.css';
import { Link, useHistory } from 'react-router-dom';

export default function HomePage() {
  const history = useHistory()
  function handleClick () {
    history.push("/login")
  }
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
        <Button variant="secondary" onClick={handleClick}>Get Started</Button>
      </p>
    </main>
        <Footer />  
    </div>
  )
}
