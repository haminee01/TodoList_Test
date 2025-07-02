import React, { useMemo } from "react";

function TodoStats({ todos }) {
  const stats = useMemo(() => {
    const completedCount = todos.filter((todo) => todo.isCompleted).length;
    const totalCount = todos.length;
    const progressPercentage =
      totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    return { completedCount, totalCount, progressPercentage };
  }, [todos]);

  return (
    <div>
      <h2>할 일 목록</h2>
      <div
        className="d-flex align-items-center gap-3"
        style={{ height: "25px" }}
      >
        <p className="text-muted mb-0">
          총 {stats.totalCount}개 중 {stats.completedCount} 개 완료
        </p>
        {stats.totalCount > 0 && (
          <div
            className="progress flex-grow-1"
            style={{ maxWidth: "300px", height: "100%" }}
          >
            <div
              Add
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${stats.progressPercentage}%` }}
              aria-valuenow={stats.progressPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {stats.progressPercentage}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoStats;
