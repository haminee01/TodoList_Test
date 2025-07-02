import React from "react";

function EmptyState({ message, currentFilter }) {
  const getMessage = () => {
    if (message) return message;
    switch (currentFilter) {
      case "completed":
        return "완료된 할 일이 없습니다.";
      case "incompleted":
        return "진행 중인 할 일이 없습니다";
      default:
        return "할일이 없습니다. 새로운 할일을 등록해보세요!";
    }
  };

  return (
    <div className="text-center py-5">
      <div className="alert alert-info" role="alert">
        <p className="mb-3">{message}</p>
      </div>
    </div>
  );
}

export default EmptyState;
