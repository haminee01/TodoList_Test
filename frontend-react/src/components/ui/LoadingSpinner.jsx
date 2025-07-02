import React from "react";

function LoadingSpinner({
  message = "로딩 중...",
  size = "spinner-border-sm",
}) {
  return (
    <div className="text-center py-5">
      <div className={`spinner-border ${size} text-primary m-2`} role="status">
        <span className="visually-hidden">Loading...</span>
        <span className="text-muted">{message}</span>
      </div>
    </div>
  );
}

export default LoadingSpinner;
