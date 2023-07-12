import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { useDispatch } from "react-redux";
import { AuthAction } from "../../context/AuthRedux";

const Login = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAJK2W3MMi1WznXQ-dd2YTCus4vrkE1v9I";

  const toggleHandler = () => {
    navigate("/Signup");
  };
  const forgotPasswordHandler = () => {
    console.log("FORGOT");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passRef.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "apllication/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const set = {
          id: data.idToken,
          email: emailRef.current.value,
        };
        dispatch(AuthAction.login(set));
        console.log("Successfully Logged In");
        navigate("/Home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <center className={classes.container}>
      <div className={classes.SignUp}>
        <h2>Login</h2>
        <form onSubmit={submitHandler} className={classes.formInputs}>
          <input ref={emailRef} type="email" placeholder="E-mail" required />
          <br />
          <input
            ref={passRef}
            type="password"
            placeholder="Password"
            required
          />
          <br />
          <button>Login</button>
        </form>
        <div className={classes.p1}>
          <span onClick={forgotPasswordHandler}>Forgot Password?</span>
        </div>
        <div>
          <p onClick={toggleHandler}>Dont Have Account ? Signup</p>
        </div>
      </div>
    </center>
  );
};

export default Login;
