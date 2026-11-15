import { CheckCircle2 } from "lucide-react";

import {
    findDiseaseClass,
    LOW_CONFIDENCE_THRESHOLD,
} from "../../constants/detection";
import type { DetectionHistory } from "../../types/detection";
import Alert from "../ui/Alert";
import GlassCard from "../ui/GlassCard";
import ProbabilityBar from "./ProbabilityBar";

// Desainnya terdapat di src/styles/result.css (bagian 4. PREDIKSI)
interface PredictionCardProps {
    result: DetectionHistory;
}

// Kartu "Hasil Klasifikasi": kelas, keyakinan, penjelasan, dan probabilitas tiap kelas.
export default function PredictionCard({ result }: PredictionCardProps) {
    const className = result.class_name || result.diseases_name;
    const info = findDiseaseClass(className);
    const Icon = info?.icon;

    // Urut dari probabilitas tertinggi
    const probabilities = Object.entries(result.probabilities ?? {}).sort(
        ([, a], [, b]) => b - a
    );

    const lowConfidence = result.confidence < LOW_CONFIDENCE_THRESHOLD;

    return (
        <GlassCard icon={CheckCircle2} title="Hasil Klasifikasi">
            <div className="glass-card-body">
                <div className="result-class-box">
                    <p className="result-class-label">Kelas Terdeteksi</p>

                    <h3 className="result-class-name">{info?.label ?? className}</h3>

                    {info && Icon && (
                        <p className="result-class-tag">
                            <Icon className="icon-sm" aria-hidden="true" />
                            {info.category}
                        </p>
                    )}

                    <p className="result-conf-label">Tingkat keyakinan model</p>
                    <p className="result-conf-value">
                        {(result.confidence * 100).toFixed(2)}%
                    </p>
                </div>

                {lowConfidence && (
                    <div className="result-warning">
                        <Alert variant="warning">
                            Tingkat keyakinan rendah. Hasil ini kurang meyakinkan; coba
                            ambil ulang foto yang lebih jelas dan fokus pada buah kakao.
                        </Alert>
                    </div>
                )}

                {info && <p className="result-explain">{info.description}</p>}

                {probabilities.length > 0 && (
                    <>
                        <h3 className="result-section-title">
                            Probabilitas Setiap Kelas
                        </h3>

                        <ul className="prob-list">
                            {probabilities.map(([label, value], index) => (
                                <ProbabilityBar
                                    key={label}
                                    label={findDiseaseClass(label)?.label ?? label}
                                    value={value}
                                    highlight={index === 0}
                                />
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </GlassCard>
    );
}