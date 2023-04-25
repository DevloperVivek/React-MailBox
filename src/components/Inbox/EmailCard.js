import React from "react";
import classes from "./EmailCard.module.css";

const EmailCard = ({ email, onClose }) => {
  return (
    <div className={classes.EmailCardContainer}>
      <div className={classes.EmailCardHeader}>
        <h4>From: {email.from}</h4>
        <p>Date: {email.data}</p>
        <p>Read: {email.isRead ? "Yes" : "No"}</p>
      </div>
      <div>
        <h5>Subject: {email.subject}</h5>
        <div dangerouslySetInnerHTML={{ __html: email.edit }} />
      </div>
      <div className={classes.closeBtn}>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EmailCard;