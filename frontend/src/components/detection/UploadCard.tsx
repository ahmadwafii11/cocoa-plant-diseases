import { Image as ImageIcon, Loader2, ScanSearch } from "lucide-react";

import Alert from "../ui/Alert";
import Button from "../ui/Button";
import DetectCard from "./DetectCard";
import ImageDropzone from "./ImageDropzone";
import ImagePreview from "./ImagePreview";

// Desainnya terdapat di src/styles/detection.css (bagian 2-4)
interface UploadCardProps {
    file: File | null;
    previewUrl: string | null;
    detecting: boolean;
    error: string;
    onSelect: (file: File) => void;
    onReset: () => void;
    onDetect: () => void;
}

// Kartu kiri: pilih gambar, lihat pratinjau, lalu tekan "Deteksi Penyakit".
export default function UploadCard({
    file,
    previewUrl,
    detecting,
    error,
    onSelect,
    onReset,
    onDetect,
}: UploadCardProps) {
    return (
        <DetectCard
            icon={ImageIcon}
            title="Upload Gambar"
            description="Pilih gambar buah kakao"
        >
            <div className="detect-card-body">
                {file && previewUrl ? (
                    <ImagePreview
                        url={previewUrl}
                        file={file}
                        onReset={onReset}
                        disabled={detecting}
                    />
                ) : (
                    <ImageDropzone onSelect={onSelect} disabled={detecting} />
                )}

                {error && (
                    <div className="detect-alert">
                        <Alert variant="error">{error}</Alert>
                    </div>
                )}

                <Button
                    size="lg"
                    className="btn-block detect-submit"
                    onClick={onDetect}
                    disabled={!file || detecting}
                >
                    {detecting ? (
                        <>
                            <Loader2 className="icon-md animate-spin" aria-hidden="true" />
                            Sedang Menganalisis...
                        </>
                    ) : (
                        <>
                            <ScanSearch className="icon-md" aria-hidden="true" />
                            Deteksi Penyakit
                        </>
                    )}
                </Button>
            </div>
        </DetectCard>
    );
}