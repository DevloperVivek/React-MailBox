import React from "react";
import classes from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const editorHandler = () => {
    navigate("/Editor");
  };
  return (
    <div>
      <div className={classes["home-container"]}>
        <div className={classes["home-title"]}>WELCOME TO REACT MAIL BOX</div>
        <p>Be Professional Be Official</p>
        <button className={classes.btn} onClick={editorHandler}>
          Compose
        </button>
      </div>
    </div>
  );
};

export default Home;
