import React, { useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import '../../App.css';
import "../../static/css/getstarted1.css"
import { Link } from 'react-router-dom'

export default function SignInOut () {

  const history = useHistory();
  let helperimg = require("../../static/img/help.png")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit (e) {

    e.preventDefault()

    let data = {
      'username': username,
      'password': password
    }

    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('video-token', json.token);
        localStorage.setItem('user-id', json.id)
        setUsername(json.username);
        history.push("/")
      })
    .catch(err => console.log(err));
  }
    return (
      <Fragment>
        <div className="split left">
          <div className="centered">
            <img src={helperimg} alt="Help" />
            <h2>Login</h2>
            <p>Login to start automating your video creation</p>
          </div>
        </div>
        <div className="split right">
          <div className="centered">
            <form class="form-signin" onSubmit={handleSubmit}>
              <img class="mb-4" src="../assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
              <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
              <label for="username" class="sr-only">Username</label>
              <input
                type="text"
                id="inputUsername"
                className="form-control"
                placeholder="Username"
                name="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autofocus
              />
              <label for="inputPassword" class="sr-only">Password</label>
              <input
                type="password"
                id="inputPassword"
                className="form-control"
                placeholder="Password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <div class="checkbox mb-3">
                <label>
                  <Link to="/signup"><b>Create an Account</b></Link>
                </label>
              </div>
              <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </form>
          </div>
        </div>
    </Fragment>
    )
}
