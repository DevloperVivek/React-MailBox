import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";

const Signup = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const confRef = useRef();
  const navigate = useNavigate();
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAJK2W3MMi1WznXQ-dd2YTCus4vrkE1v9I";

  const LoginHandler = () => {
    navigate("/Login");
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (passRef.current.value === confRef.current.value) {
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passRef.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          console.log("Successfully Created Account");
          navigate("/Login");
        } else {
          const data = await response.json();
          alert(data.error.message);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Incorrect Password");
    }
  };

  return (
    <center className={classes.container}>
      <div className={classes.SignUp}>
        <h2>Signup</h2>
        <form onSubmit={SubmitHandler}>
          <input ref={emailRef} type="email" placeholder="E-mail" required />
          <br />
          <input
            ref={passRef}
            type="password"
            placeholder="Password"
            required
          />
          <br />
          <input
            ref={confRef}
            type="password"
            placeholder="Confirm Password"
            required
          />
          <br />
          <button>Sign Up</button>
        </form>
        <div>
          <p onClick={LoginHandler}>Already Have An Account ? Login</p>
        </div>
      </div>
    </center>
  );
};

export default Signup;
