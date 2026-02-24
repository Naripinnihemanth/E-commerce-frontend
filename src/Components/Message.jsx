import React, { useEffect, useState } from "react";
import "../css/Message.css";
function Message({ msg }) {
  const [active, setActive] = useState(true);
  useEffect(() => {
    const interver = setInterval(() => {
      setActive(false);
    }, 2000);
    return () => {
      clearInterval(interver);
    };
  }, []);
  return <div className={active ? "message" : "hide"}>{msg}</div>;
}

export default Message;
