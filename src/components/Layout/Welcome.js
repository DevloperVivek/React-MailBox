import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Welcome.module.css";

const Welcome = () => {
  const navigate = useNavigate();

  const loginHandler = () => {
    navigate("/Login");
  };

  const signupHandler = () => {
    navigate("/Signup");
  };

  return (
    <div className={classes["welcome-container"]}>
      <h1>Welcome to React Mailbox</h1>
      <p>Manage your emails efficiently</p>
      <div>
        <button className={classes["login-button"]} onClick={loginHandler}>
          Login
        </button>
        <button className={classes["signup-button"]} onClick={signupHandler}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default Welcome;
