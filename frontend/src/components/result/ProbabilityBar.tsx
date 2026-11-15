import { cn } from "../../lib/cn";

// Desainnya terdapat di src/styles/result.css (bagian 4. PREDIKSI)
interface ProbabilityBarProps {
    label: string;
    value: number; // Nilai 0 sampai 1. 
    highlight?: boolean; // true untuk kelas dengan probabilitas tertinggi.
}

// Satu baris: nama kelas, persentase, dan batang kemajuan.
export default function ProbabilityBar({ label, value, highlight }: ProbabilityBarProps) {
    const percentage = Math.min(Math.max(value * 100, 0), 100);

    return (
        <li>
            <div className="prob-row">
                <span className="prob-name">{label}</span>
                <span className="prob-value">{percentage.toFixed(2)}%</span>
            </div>

            <div className="prob-track">
                <div
                    className={cn("prob-fill", highlight && "prob-fill-top")}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </li>
    );
}