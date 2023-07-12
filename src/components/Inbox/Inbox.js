import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InboxEmailCard from "./InboxEmailCard";
import classes from "./Sent.module.css";
import useHttp from "../../hooks/use-http";

const Inbox = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [emails, setEmails] = useState([]);
  const draftemail = useSelector((state) => state.auth.email);
  const loggedIn = localStorage.getItem("login");
  const navigate = useNavigate();
  let [unReadCount, setUnReadCount] = useState(0);
  const mails = emails.length;
  console.log(unReadCount);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/Login");
    }
  }, []);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const email = draftemail.split("@");
        const res = await fetch(
          `https://react-mail-client-b76f1-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${email[0]}/receive.json`
        );
        if (res.ok) {
          const data = await res.json();
          let emailsArr = [];
          unReadCount += 1;
          emailsArr = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setEmails(emailsArr);
        } else {
          throw new Error("Failed to fetch emails");
        }
      } catch (error) {
        console.error(error);
      }
    };
    const interval = setInterval(fetchEmails, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [setSelectedEmail, selectedEmail]);

  const handleEmailClick = async (email) => {
    setSelectedEmail(email);
    unReadCount -= 1;
    console.log(email.data);
    const emailId = draftemail.split("@")[0];
    const emailDate = new Date(email.date).toISOString();
    console.log(emailDate);

    const res = await fetch(
      `https://react-mail-client-b76f1-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${emailId}/receive/${email.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          date: emailDate,
          edit: email.edit,
          from: email.from,
          isRead: false,
          subject: email.subject,
        }),
      }
    );
    if (res.ok) {
      console.log("Done");
    }
  };

  useEffect(() => {
    let count = 0;
    emails.forEach((email) => {
      if (email.isRead) {
        count++;
      }
    });
    setUnReadCount(count);
  }, [emails]);

  const handleCloseEmailCard = () => {
    setSelectedEmail(null);
  };

  const getSimplifiedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const { sendDeleteRequest } = useHttp();

  const deleteHandler = async (id) => {
    const dlt = draftemail.split("@");
    const url = `https://react-mail-client-b76f1-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${dlt[0]}/receive/${id}.json`;
    try {
      const data = await sendDeleteRequest(url);
      console.log(data);
      console.log("Email deleted successfully");
      setEmails(emails.filter((email) => email.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.InboxContainer}>
      <h3>
        Inbox (All Mails: {mails})
        {unReadCount > 0 && (
          <span className={classes.unreadcount}>Unread: {unReadCount}</span>
        )}
      </h3>
      <div className={classes.EmailsContainer}>
        {emails.length > 0 &&
          emails.map((email) => (
            <div key={email.id}>
              <div className={classes.EmailItem}>
                <h4>From: {email.from}</h4>
                <p>Date:{getSimplifiedDate(email.date)}</p>
                <button onClick={() => handleEmailClick(email)}>Open</button>
                <button onClick={() => deleteHandler(email.id)}>Delete</button>
                {email.isRead && <span className={classes.unRead} />}
              </div>
            </div>
          ))}
        {emails.length === 0 && <h2>No emails found</h2>}
      </div>
      {selectedEmail ? (
        <InboxEmailCard email={selectedEmail} onClose={handleCloseEmailCard} />
      ) : null}
    </div>
  );
};

export default Inbox;
