import React from "react";
import classes from "./EmailCard.module.css";

const EmailCard = ({ email, onClose }) => {
  const getSimplifiedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className={classes.EmailCardContainer}>
      <div className={classes.EmailCardHeader}>
        <h4>From: {email.from}</h4>
        <p>Date: {getSimplifiedDate(email.date)}</p>
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
