import { useEffect, type ReactNode } from "react";

import { X } from "lucide-react";

// Desain terdapat di src/styles/profile.css (bagian 4. MODAL)
interface ModalProps {
    title: string;
    subtitle?: string;
    onClose: () => void;
    // true saat sedang menyimpan: modal tidak dapat ditutup
    busy?: boolean;
    children: ReactNode;
}

// Jendela dialog terdapat di tengah LayerArrowDown. Ditutup melalui tombol X, klik di luar kotak,  atau tombol Esc (kecuali saat `busy`).
export default function Modal({
    title,
    subtitle,
    onClose,
    busy = false,
    children,
}: ModalProps) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !busy) {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [busy, onClose]);

    return(
        <div
            className="modal-overlay"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget && !busy) {
                    onClose();
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className="modal-panel"
            >
                <div>
                    <h2 className="modal-title">{title}</h2>
                    {subtitle && <p className="modal-subtitle">{subtitle}</p>}
                </div>

                <button 
                    type="button"
                    onClick={onClose}
                    disabled={busy}
                    className="modal-close"
                    aria-label="Tutup"
                >
                    <X className="icon-md" aria-hidden="true"/>
                </button>
            </div>

            <div className="modal-body">{children}</div>
        </div>
    );
}
