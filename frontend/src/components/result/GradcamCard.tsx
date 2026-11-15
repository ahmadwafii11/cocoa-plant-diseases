import { Flame } from "lucide-react";

import type { DetectionHistory } from "../../types/detection";
import GlassCard from "../ui/GlassCard";
import ResultImage from "./ResultImage";

// Desainnya terdapat di src/styles/result.css (bagian 3. GAMBAR)
interface GradcamCardProps {
    result: DetectionHistory;
}

// Kartu "Visualisasi Grad-CAM": area citra yang paling memengaruhi hasil.
export default function GradcamCard({ result }: GradcamCardProps) {
    return (
        <GlassCard
            icon={Flame}
            title="Visualisasi Grad-CAM"
            description="Visualisasi area citra yang berkontribusi terhadap hasil klasifikasi model."
        >
            <div className="glass-card-body">
                <ResultImage
                    src={result.gradcam_path}
                    alt="Visualisasi Grad-CAM"
                    emptyText="Visualisasi Grad-CAM tidak tersedia."
                />
            </div>
        </GlassCard>
    );
}