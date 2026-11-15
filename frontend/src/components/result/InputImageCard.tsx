import { Image as ImageIcon } from "lucide-react";

import type { DetectionHistory } from "../../types/detection";
import GlassCard from "../ui/GlassCard";
import ResultImage from "./ResultImage";

// Desainnya terdapat di src/styles/result.css (bagian 3. GAMBAR)
interface InputImageCardProps {
    result: DetectionHistory;
}

// Kartu "Gambar Input": foto yang diunggah pengguna.
export default function InputImageCard({ result }: InputImageCardProps) {
    return (
        <GlassCard icon={ImageIcon} title="Gambar Input">
            <div className="glass-card-body">
                <ResultImage
                    src={result.image_path}
                    alt={result.original_filename || "Gambar input"}
                    emptyText="Gambar tidak dapat dimuat. Pastikan layanan deteksi aktif."
                />

                {result.original_filename && (
                    <p className="result-filename">{result.original_filename}</p>
                )}
            </div>
        </GlassCard>
    );
}