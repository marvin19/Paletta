import { useEffect, useRef } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({
    isOpen,
    onClose,
    children,
}: ModalProps): JSX.Element | null => {
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const trapFocus = (e: KeyboardEvent): void => {
            if (isOpen && modalRef.current !== null) {
                const focusableElements = Array.from(
                    modalRef.current.querySelectorAll<HTMLElement>(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
                    ),
                );

                if (focusableElements.length === 0) return;

                const firstElement = focusableElements[0];
                const lastElement =
                    focusableElements[focusableElements.length - 1];

                if (e.key === 'Tab') {
                    // Shift + Tab
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    }
                    // Tab only
                    else {
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            }
        };

        const handleEscape = (e: KeyboardEvent): void => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', trapFocus);
            document.addEventListener('keydown', handleEscape);

            // Focus the first element when modal opens
            modalRef.current
                ?.querySelector<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
                )
                ?.focus();
        }

        return () => {
            document.removeEventListener('keydown', trapFocus);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="modal-overlay"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
            }}
            onClick={onClose}
        >
            <div
                className="modal-content"
                style={{
                    backgroundColor: '#fff',
                    padding: '2rem',
                    borderRadius: '8px',
                    position: 'relative',
                    maxWidth: '800px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                }}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                ref={modalRef}
            >
                <button
                    onClick={onClose}
                    aria-label="Close modal"
                    style={{ position: 'absolute', top: '1rem', right: '1rem' }}
                >
                    Close
                </button>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
