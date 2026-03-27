import React, { useEffect, useState } from "react";

function formatTimeLeft(expiresAt) {
  const difference = expiresAt - Date.now();

  if (difference <= 0) {
    return "0h 00m 00s";
  }

  const totalSeconds = Math.floor(difference / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}h ${String(minutes).padStart(2, "0")}m ${String(
    seconds
  ).padStart(2, "0")}s`;
}

const Countdown = ({ expiresAt }) => {
  const [timeLeft, setTimeLeft] = useState(formatTimeLeft(expiresAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(formatTimeLeft(expiresAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return <div className="de_countdown">{timeLeft}</div>;
};

export default Countdown;