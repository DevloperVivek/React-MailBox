import "./App.css";
import Header from "./components/Layout/Header";
import Signup from "./components/Auth/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Home from "./components/Home/Home";
import Inbox from "./components/Inbox/Inbox";
import Editor from "./components/Home/Editor";
import Sent from "./components/Inbox/Sent";
import Welcome from "./components/Layout/Welcome";
import { AuthAction } from "./context/AuthRedux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login"));
    if (login) {
      dispatch(AuthAction.login(login));
    }
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={<Welcome />} />
        <Route path={"/Home"} element={<Home />} />
        <Route path={"/Signup"} element={<Signup />} />
        <Route path={"/Login"} element={<Login />} />
        <Route path={"/Inbox"} element={<Inbox />} />
        <Route path={"/Editor"} element={<Editor />} />
        <Route path={"/Sent"} element={<Sent />} />
      </Routes>
    </Router>
  );
}
export default App;
