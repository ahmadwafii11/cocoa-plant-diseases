import { ImageOff } from "lucide-react";
import { useState } from "react";

import { cn } from "../../lib/cn";

// Desainnya terdapat di src/styles/result.css (bagian 3. GAMBAR)
interface ResultImageProps {
    src: string | null;
    alt: string;
    emptyText: string; // Teks bila gambar tidak ada / gagal dimuat.
    className?: string;
}

// Gambar hasil dengan tampilan cadangan bila gagal dimuat (mis. ML Service mati).
export default function ResultImage({ src, alt, emptyText, className }: ResultImageProps) {
    const [failed, setFailed] = useState(false);

    return (
        <div className={cn("result-image-frame", className)}>
            {src && !failed ? (
                <img
                    src={src}
                    alt={alt}
                    onError={() => setFailed(true)}
                    className="result-image"
                />
            ) : (
                <div className="result-image-empty">
                    <ImageOff className="icon-xl icon-muted" aria-hidden="true" />
                    <p>{emptyText}</p>
                </div>
            )}
        </div>
    );
}