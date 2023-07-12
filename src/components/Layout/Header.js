import React from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "../../context/AuthRedux";
import { useEffect } from "react";

const Header = () => {
  const Auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(AuthAction.logout());
    navigate("/Login");
  };

  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login"));
    if (!login && window.location.pathname === "/Home") {
      navigate("/login");
    }
  }, []);

  return (
    <header>
      <div className={classes["header-item"]}>
        {!Auth.isLogin && <>React MailBox</>}
        {Auth.isLogin && (
          <>
            <Link to="/Home">
              <span>Home</span>
            </Link>
            <Link to="/Inbox">
              <span>Inbox</span>
            </Link>
            <Link to="/Sent">
              <span>Sent</span>
            </Link>
          </>
        )}
        {Auth.isLogin && <span onClick={logoutHandler}>Logout</span>}
      </div>
    </header>
  );
};

export default Header;
