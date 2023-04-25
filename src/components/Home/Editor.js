import JoditEditor from "jodit-react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import classes from "./Editor.module.css";

const Editor = () => {
  const draftemail = useSelector((state) => state.auth.email);
  const email = draftemail.split("@");
  const emailRef = useRef();
  const subRef = useRef();
  const editorRef = useRef();
  const url = `https://react-mailbox-6bafc-default-rtdb.asia-southeast1.firebasedatabase.app/Email/${email[0]}/send.json`;

  const submitHandler = async (e) => {
    e.preventDefault();
    const sendEmail = emailRef.current.value.split("@");
    const res = await fetch(url, {
      method: "Post",
      body: JSON.stringify({
        from: draftemail,
        to: emailRef.current.value,
        subject: subRef.current.value,
        edit: editorRef.current.value,
        date: new Date(),
      }),
    });

    const ret = await fetch(
      `https://react-mailbox-6bafc-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${sendEmail[0]}/receive.json`,
      {
        method: "Post",
        body: JSON.stringify({
          from: draftemail,
          subject: subRef.current.value,
          edit: editorRef.current.value,
          data: new Date(),
          isRead: true,
        }),
      }
    );

    if (res.ok && ret.ok) {
      alert("Email has been send");
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
            <button>Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editor;
