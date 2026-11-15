import { Image as ImageIcon, RotateCcw } from "lucide-react";

import Button from "../ui/Button";

// Desainnya terdapat di src/styles/detection.css (bagian 4. PRATINJAU)
interface ImagePreviewProps {
    url: string;
    file: File;
    onReset: () => void;
    disabled?: boolean;
}

// Pratinjau gambar terpilih + nama, ukuran, dan tombol "Ganti".
export default function ImagePreview({ url, file, onReset, disabled }: ImagePreviewProps) {
    return (
        <div className="preview">
            <div className="preview-stage">
                <img src={url} alt="Pratinjau buah kakao" className="preview-img" />
            </div>

            <div className="preview-bar">
                <div className="preview-file">
                    <span className="preview-file-icon">
                        <ImageIcon className="icon-md" aria-hidden="true" />
                    </span>

                    <div className="preview-file-text">
                        <p className="preview-name">{file.name}</p>
                        <p className="preview-size">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onReset}
                    disabled={disabled}
                >
                    <RotateCcw className="icon-sm" aria-hidden="true" />
                    Ganti
                </Button>
            </div>
        </div>
    );
}