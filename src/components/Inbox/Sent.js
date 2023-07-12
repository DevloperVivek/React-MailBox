import React, { useState, useEffect } from "react";
import classes from "./Sent.module.css";
import { useSelector } from "react-redux";
import EmailCard from "./EmailCard";
import useHttp from "../../hooks/use-http";

const Sent = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [sentEmails, setSentEmails] = useState([]);
  const draftemail = useSelector((state) => state.auth.email);
  const sentMails = sentEmails.length;
  const email = draftemail.split("@");
  const sendUrl = `https://react-mail-client-b76f1-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${email[0]}/send.json`;

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleCloseEmailCard = () => {
    setSelectedEmail(null);
  };

  const getSimplifiedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Custom Hook useHttp
  const { sendRequest, sendDeleteRequest } = useHttp();

  const fetchSentEmails = async () => {
    try {
      const data = await sendRequest(sendUrl);
      let sentEmailsArr = [];
      sentEmailsArr = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setSentEmails(sentEmailsArr);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSentEmail = async (emailId) => {
    const dlt = draftemail.split("@");
    const url = `https://react-mail-client-b76f1-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${dlt[0]}/send/${emailId}.json`;
    try {
      const data = await sendDeleteRequest(url);
      console.log(data);
      console.log("Email deleted successfully");
      setSentEmails(sentEmails.filter((email) => email.id !== emailId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSentEmails();
  }, []);

  return (
    <div className={classes.InboxContainer}>
      <h3>SentBox ({sentMails})</h3>
      <div className={classes.EmailsContainer}>
        {sentEmails.length > 0 &&
          sentEmails.map((email) => (
            <div key={email.id}>
              <div className={classes.EmailItem}>
                <h4>To: {email.to}</h4>
                <p>Date: {getSimplifiedDate(email.date)}</p>
                <button onClick={() => handleEmailClick(email)}>Open</button>
                <button onClick={() => deleteSentEmail(email.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        {sentEmails.length === 0 && <h2>No emails found</h2>}{" "}
      </div>
      {selectedEmail ? (
        <EmailCard email={selectedEmail} onClose={handleCloseEmailCard} />
      ) : null}
    </div>
  );
};

export default Sent;

// import React, { useState } from "react";
// import classes from "./Sent.module.css";
// import { useSelector } from "react-redux";
// import EmailCard from "./EmailCard";
// import useFetchSentEmails from "../../hooks/use-fetchSentEmails";

// const Sent = () => {
//   const [selectedEmail, setSelectedEmail] = useState(null);
//   const draftemail = useSelector((state) => state.auth.email);

//   const handleEmailClick = (email) => {
//     setSelectedEmail(email);
//   };

//   const handleCloseEmailCard = () => {
//     setSelectedEmail(null);
//   };

//   const getSimplifiedDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleString();
//   };

//   const deleteHandler = async (emailId) => {
//     const dlt = draftemail.split("@");
//     console.log(dlt[0]);
//     console.log(emailId);
//     const url = `https://react-mailbox-6bafc-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${dlt[0]}/send/${emailId}.json`;
//     try {
//       const res = await fetch(url, {
//         method: "DELETE",
//       });
//       if (res.ok) {
//         console.log("Email deleted successfully");
//       } else {
//         throw new Error("Failed to delete email");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const { isLoading, error, sentEmails } = useFetchSentEmails(draftemail);

//   return (
//     <div className={classes.InboxContainer}>
//       <h3>SentBox ({sentEmails.length})</h3>
//       {isLoading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//       <div className={classes.EmailsContainer}>
//         {sentEmails.length > 0 &&
//           sentEmails.map((email) => (
//             <div key={email.id}>
//               <div className={classes.EmailItem}>
//                 <h4>To: {email.to}</h4>
//                 <p>Date: {getSimplifiedDate(email.date)}</p>
//                 <button onClick={() => handleEmailClick(email)}>Open</button>
//                 <button onClick={() => deleteHandler(email.id)}>Delete</button>
//               </div>
//             </div>
//           ))}
//         {sentEmails.length === 0 && <h2>No emails found</h2>}{" "}
//       </div>
//       {selectedEmail ? (
//         <EmailCard email={selectedEmail} onClose={handleCloseEmailCard} />
//       ) : null}
//     </div>
//   );
// };

// export default Sent;
