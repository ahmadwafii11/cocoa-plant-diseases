import { CheckCircle2, Loader2, ScanSearch } from "lucide-react";

import { PHOTO_TIPS } from "../../constants/detection";
import { cn } from "../../lib/cn";
import DetectCard from "./DetectCard";

// Desainnya terdapat di src/styles/detection.css (bagian 5. STATUS)
interface StatusCardProps {
    detecting: boolean;
}


// Kartu kanan: menampilkan status ("belum ada hasil" / "sedang menganalisis").
// Hasil deteksi sendiri ditampilkan di halaman hasil (/hasil-deteksi/:id).
export default function StatusCard({ detecting }: StatusCardProps) {
    const Icon = detecting ? Loader2 : ScanSearch;

    return (
        <DetectCard
            icon={ScanSearch}
            title="Hasil Deteksi"
            description="Hasil klasifikasi gambar"
        >
            <div className="detect-status">
                <span
                    className={cn(
                        "detect-status-icon",
                        detecting && "detect-status-icon-busy"
                    )}
                >
                    <Icon
                        className={cn("icon-xl", detecting && "animate-spin")}
                        aria-hidden="true"
                    />
                </span>

                <h3 className="detect-status-title">
                    {detecting ? "Menganalisis Gambar..." : "Belum Ada Hasil"}
                </h3>

                <p className="detect-status-text">
                    {detecting
                        ? "Model AI sedang menganalisis karakteristik pada citra buah kakao."
                        : 'Upload gambar buah kakao terlebih dahulu kemudian tekan tombol "Deteksi Penyakit".'}
                </p>

                {!detecting && (
                    <ul className="detect-tips">
                        {PHOTO_TIPS.map((tip) => (
                            <li key={tip} className="detect-tip">
                                <CheckCircle2
                                    className="icon-sm icon-accent"
                                    aria-hidden="true"
                                />
                                {tip}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </DetectCard>
    );
}