import { useRef, useState, type ChangeEventHandler, type DragEventHandler } from "react";
import { Upload } from "lucide-react";

import {
    DETECTION_ACCEPT,
    DETECTION_MAX_IMAGE_MB,
} from "../../constants/detection";
import { cn } from "../../lib/cn";

// Desainnya terdapat di src/styles/detection.css (bagian 3. DROPZONE)
interface ImageDropzoneProps {
    onSelect: (file: File) => void;
    disabled?: boolean;
}

// Kotak "klik atau seret gambar ke sini"
export default function ImageDropzone({ onSelect, disabled }: ImageDropzoneProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const file = event.target.files?.[0];

        // Kosongkan agar memilih file yang sama dua kali tetap memicu onChange
        event.target.value = "";

        if (file) {
            onSelect(file);
        }
    };

    const handleDrop: DragEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        setDragging(false);

        const file = event.dataTransfer.files?.[0];

        if (file && !disabled) {
            onSelect(file);
        }
    };

    return (
        <>
            <button
                type="button"
                disabled={disabled}
                onClick={() => inputRef.current?.click()}
                onDragOver={(event) => {
                    event.preventDefault();
                    setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={cn("dropzone", dragging && "dropzone-active")}
            >
                <span className="dropzone-icon">
                    <Upload className="icon-xl" aria-hidden="true" />
                </span>

                <span className="dropzone-title">Upload gambar buah kakao</span>

                <span className="dropzone-text">
                    Klik atau seret gambar ke sini
                </span>

                <span className="dropzone-button">Pilih Gambar</span>

                <span className="dropzone-hint">
                    JPG atau JPEG • Maksimal {DETECTION_MAX_IMAGE_MB} MB
                </span>
            </button>

            <input
                ref={inputRef}
                type="file"
                accept={DETECTION_ACCEPT}
                onChange={handleChange}
                className="sr-only"
                tabIndex={-1}
            />
        </>
    );
}