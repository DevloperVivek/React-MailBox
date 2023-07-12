import { useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (url, method = "GET", body = null) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      setIsLoading(false);
      return data;
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "Something went wrong!");
      throw err;
    }
  };

  const sendDeleteRequest = async (url) => {
    console.log("deleted");
    return sendRequest(url, "DELETE");
  };

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest,
    sendDeleteRequest: sendDeleteRequest,
  };
};

export default useHttp;
