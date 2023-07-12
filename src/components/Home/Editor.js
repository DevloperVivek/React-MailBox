import JoditEditor from "jodit-react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import classes from "./Editor.module.css";
import useHttp from "../../hooks/use-http";

const Editor = () => {
  const draftemail = useSelector((state) => state.auth.email);
  const email = draftemail.split("@");
  const emailRef = useRef();
  const subRef = useRef();
  const editorRef = useRef();
  const { isLoading, sendRequest } = useHttp();

  const submitHandler = async (e) => {
    e.preventDefault();
    const sendEmail = emailRef.current.value.split("@");
    const sendUrl = `https://react-mail-client-b76f1-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${sendEmail[0]}/receive.json`;
    const sendBody = {
      from: draftemail,
      subject: subRef.current.value,
      edit: editorRef.current.value,
      date: new Date(),
      isRead: true,
    };

    // Custom Hook useHttp
    const resData = await sendRequest(sendUrl, "POST", sendBody);

    const url = `https://react-mail-client-b76f1-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${email[0]}/send.json`;
    const body = {
      from: draftemail,
      to: emailRef.current.value,
      subject: subRef.current.value,
      edit: editorRef.current.value,
      date: new Date(),
    };

    const retData = await sendRequest(url, "POST", body);

    if (resData && retData) {
      alert("Email has been sent");
    }
  };

  return (
    <div className={classes.BackgroundContainer}>
      <h3>MailBox</h3>
      <div className={classes.Text}>
        <form onSubmit={submitHandler}>
          <input ref={emailRef} placeholder="To -" type={"email"} required />
          <br />
          <input ref={subRef} placeholder="Subject -" required />
          <JoditEditor ref={editorRef} />
          <br />
          <div className={classes.send}>
            <button disabled={isLoading}>Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editor;
