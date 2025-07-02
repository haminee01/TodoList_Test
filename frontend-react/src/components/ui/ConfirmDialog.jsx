import React from "react";

function ConfirmDialog({
  show,
  title,
  message,
  confirmText = "확인",
  cancelText = "취소",
  confirmVariant = "danger",
  onConfirm,
  onCancel,
}) {
  if (!show) return null;
  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex="-1"
        aria-labelledby="confirmModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmModalLabel">
                <i className="bi bi-exclamation-triangle text-warning me-2"></i>
                {title}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onCancel}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>{message}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
              >
                {cancelText}
              </button>
              <button
                type="button"
                className={`btn btn-${confirmVariant}`}
                onClick={onConfirm}
              >
                <i className="bi bi-check-circle me-1"></i>
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default ConfirmDialog;
