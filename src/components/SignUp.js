import React, { useState } from "react";

function SignUp({ setUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg,setMsg] = useState();
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
  
    function handleSubmit(e) {
      e.preventDefault();
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          password_confirmation: passwordConfirmation,
        }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user));
        }else
        setMsg("*Password should be identical and username unique")
       
  
      });
    }
  return (
    <div className="form_container">
      <form className="form_signup" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <label htmlFor="password">Password Confirmation</label>
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
        {msg?(<div className="error-msg">
          <h5 className="error-text">* Password should be identical and username unique!.</h5>
        </div>):(null)}
        <button className="s-btn" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;