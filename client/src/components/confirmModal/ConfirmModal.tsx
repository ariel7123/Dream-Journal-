import './ConfirmModal.scss';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay" onClick={onCancel}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="confirm-modal__title">{title}</h3>
        <p className="confirm-modal__message">{message}</p>
        <div className="confirm-modal__actions">
          <button className="confirm-modal__btn confirm-modal__btn--cancel" onClick={onCancel}>
            ביטול
          </button>
          <button className="confirm-modal__btn confirm-modal__btn--confirm" onClick={onConfirm}>
            מחק
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;