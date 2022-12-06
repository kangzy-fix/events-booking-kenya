import React, { useState } from "react";

function Login({ setUser }){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState(null);
 
    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }).then((r) => {
          if (r.ok) {
            r.json().then((user) => setUser(user));
          }
          else
          setMsg("Invalid Username or Password");
          
        });
      }
      return (
        <div className="form_container " >
          <form className="form_login" onSubmit={handleSubmit}>
            <h1>Login</h1>
            {/* <label htmlFor="username">Username</label> */}
            <input
              type="text"
              id="username"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            {/* <label htmlFor="password">Password</label> */}
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {msg?(<div className="error-msg">
              <h5 className="error-text">Invalid username or password!!.</h5>
            </div>
              // <h6><a href="">forgot password</a></h6>
            ):(null)}
            <button className="s-btn" type="submit">Login</button>
          </form>
        </div>
      );
}
export default Login;