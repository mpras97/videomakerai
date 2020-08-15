import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="nav nav-masthead justify-content-center">
        <a className="nav-link active" href="#">Home</a>
        <a className="nav-link" href="#">Videos</a>
        <a className="nav-link" href="#">About</a>
      </nav>
  )
}
