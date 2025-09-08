import { Text } from "../Elements";

const ModalBackdrop = ({ onClick, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 transition-opacity duration-200"
        onClick={onClick}
      />
      {children}
    </div>
  );
};

const ModalContainer = ({ size = "md", children }) => {
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div
      className={`relative bg-white rounded-lg shadow-xl ${sizeClasses[size]} w-full mx-4 max-h-[90vh] overflow-hidden transform transition-transform duration-200 scale-100`}
    >
      {children}
    </div>
  );
};

const ModalHeader = ({ onClose, children }) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <Text variant="title">{children}</Text>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

const ModalBody = ({ children }) => {
  return <div className="p-6 overflow-y-auto max-h-[60vh]">{children}</div>;
};

const ModalFooter = ({ children }) => {
  return (
    <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
      {children}
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children, footer, size = "md" }) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContainer size={size}>
        {title && <ModalHeader onClose={onClose}>{title}</ModalHeader>}
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContainer>
    </ModalBackdrop>
  );
};

Modal.Backdrop = ModalBackdrop;
Modal.Container = ModalContainer;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
