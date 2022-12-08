import React from "react";
import { Link } from "react-router-dom";
import {  toast } from 'react-toastify';


function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    }).then(() => {
      toast.info("Logout Successful, See you soon!");
    });
    ;
  }

  return (
    <header>
      <div class="nav_bar">
        {/* <div> */}
          <Link className="link action-btn" to="/">Home</Link>
        {/* </div> */}
        {/* <div> */}
          {user ? (
            <button className=" link action-btn" onClick={handleLogoutClick}>Logout</button>
          ) : (
            <>
              <Link className="link action-btn" to="/signup">Signup</Link>
              <Link className="link action-btn" to="/login">Login</Link>
            </>
          )}
        {/* </div> */}
      </div>
    </header>
  );
}

export default NavBar;