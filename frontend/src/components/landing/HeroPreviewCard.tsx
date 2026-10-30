import { BrainCircuit, Cpu, ScanSearch } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import cocoaImage from "../../assets/cocoa.jpg";
import { CLASS_COUNT, MODEL_NAME } from "../../constants/site";

// Desainnya ada di: src/styles/landing.css (bagian 2. PREVIEW CARD)

interface StatTileProps {
    icon: LucideIcon;
    label: string;
    value: string;
}

function StatTile({ icon: Icon, label, value }: StatTileProps) {
    return (
        <div className="stat-tile">
            <div className="stat-tile-header">
                <Icon className="icon-sm icon-accent" aria-hidden="true" />
                <span className="stat-tile-label">{label}</span>
            </div>

            <p className="stat-tile-value">{value}</p>
        </div>
    );
}

export default function HeroPreviewCard() {
    return (
        <div className="preview-card">
            {/* Judul kartu */}
            <div className="preview-header">
                <div>
                    <p className="preview-eyebrow">COCOASCAN AI</p>
                    <p className="preview-title">Cocoa Disease Detection</p>
                </div>

                <div className="preview-header-icon">
                    <BrainCircuit
                        className="icon-md icon-accent"
                        aria-hidden="true"
                    />
                </div>
            </div>

            {/* Area gambar */}
            <div className="preview-visual">
                <div className="preview-glow-wrap" aria-hidden="true">
                    <div className="preview-glow-1" />
                    <div className="preview-glow-2" />
                </div>

                <div className="preview-center">
                    <div className="preview-photo">
                        <img
                            src={cocoaImage}
                            alt="Buah kakao"
                            className="preview-photo-img"
                        />
                    </div>

                    <p className="preview-caption">Analisis Buah Kakao</p>
                    <p className="preview-caption-sub">
                        Upload gambar untuk memulai
                    </p>
                </div>
            </div>

            {/* Dua kotak info */}
            <div className="preview-stats">
                <StatTile
                    icon={ScanSearch}
                    label="Classification"
                    value={`${CLASS_COUNT} Kelas`}
                />

                <StatTile icon={Cpu} label="Model" value={MODEL_NAME} />
            </div>
        </div>
    );
};