import React, { Component, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../../App.css';

export default function SignInOut () {

  const history = useHistory();
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
        setUsername(json.username);
        history.push("/get-started")
      });
  }
    return (
    <main role="main" className="inner cover">
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
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <p class="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
      </form>
    </main>
    )
}
