import React from "react";
import "../css/Error.css";
function Error() {
  return (
    <div className="not-found-container">
      <img src="/not_found.png" alt="" width={"200px"} />
      <h3>Page Not Found</h3>
      <p>Page you searching for is not found !</p>
    </div>
  );
}

export default Error;
