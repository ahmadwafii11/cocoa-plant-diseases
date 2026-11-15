import { Info } from "lucide-react";

import { formatDateTime } from "../../lib/format";
import type { DetectionHistory } from "../../types/detection";
import GlassCard from "../ui/GlassCard";

// Desainnya terdapat di src/styles/result.css (bagian 5. INFORMASI)
interface DetectionInfoProps {
    result: DetectionHistory;
}

// Kartu "Informasi Deteksi": ID, model, waktu, dan nama file asli.
export default function DetectionInfo({ result }: DetectionInfoProps) {
    const items = [
        { label: "ID Deteksi", value: `#${result.id}` },
        { label: "Model", value: result.model_version || "Tidak tersedia" },
        { label: "Waktu Deteksi", value: formatDateTime(result.detected_at) },
        { label: "Nama File", value: result.original_filename || "-" },
    ];

    return (
        <GlassCard icon={Info} title="Informasi Deteksi">
            <dl className="result-info-grid">
                {items.map(({ label, value }) => (
                    <div key={label}>
                        <dt className="result-info-label">{label}</dt>
                        <dd className="result-info-value">{value}</dd>
                    </div>
                ))}
            </dl>
        </GlassCard>
    );
}