import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function SignupForm () {
  const history = useHistory()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handle_change (e) {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "username") {
      setUsername(e.target.value)
    }
    else if (name === "password") {
      setPassword(e.target.value)
    }
    // this.setState(prevstate => {
    //   const newState = { ...prevstate };
    //   newState[name] = value;
    //   return newState;
    // });
  };

  const handleSubmit = e => {
    e.preventDefault()
    let postJson = {"username": username,
                    "password": password}
    
    fetch('http://localhost:8000/core/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postJson)
    })
    .then(res => {
      fetch('http://localhost:8000/token-auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postJson)
      })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('video-token', json.token)
        localStorage.setItem('user-id', json.id)
        setUsername(json.username)
        history.push("/")
      })
    })
  }

  let helperimg = require("../../static/img/help.png")
  return (
    <Fragment>
      <div className="split left">
        <div className="centered">
          <img src={helperimg} alt="Help" />
          <h2>SignUp</h2>
          <p>Signup to start automating your video creation</p>
        </div>
      </div>
      <div className="split right">
        <div className="centered">
          <form className="form-sigin" onSubmit={handleSubmit}>
            <h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={handle_change}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={handle_change}
            />
            <div>
              <label>
                <Link to="/login"><b>Sign In</b></Link>
              </label>
            </div>
            <input type="submit" />
          </form>
        </div>
      </div>
    </Fragment>
  );
}
