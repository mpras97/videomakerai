import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {

  const handle_logout = () => {
    localStorage.removeItem('video-token');
  };

  return (
    <>
    <nav className="nav nav-masthead justify-content-center">
        <a className="nav-link active" href="#">Home</a>
        <a className="nav-link" href="#">Videos</a>
        <a className="nav-link" href="#">About</a>
      </nav>
      <ul>
        <li className="nav-link" onClick={handle_logout}>logout</li>
      </ul>
    </>
  )
}
