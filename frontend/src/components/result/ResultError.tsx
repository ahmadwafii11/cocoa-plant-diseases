import { Info } from "lucide-react";

import { ROUTES } from "../../constants/site";
import Button from "../ui/Button";

// Desainnya terdapat di src/styles/result.css (bagian 6. STATUS HALAMAN)
interface ResultErrorProps {
    message: string;
}

// Tampilan saat hasil tidak ditemukan atau gagal diambil.
export default function ResultError({ message }: ResultErrorProps) {
    return (
        <div className="result-state">
            <div className="result-error-card">
                <span className="result-error-icon">
                    <Info className="icon-lg" aria-hidden="true" />
                </span>

                <h1 className="result-error-title">Hasil Tidak Ditemukan</h1>

                <p className="result-state-text">
                    {message || "Data hasil deteksi tidak tersedia."}
                </p>

                <div className="result-error-actions">
                    <Button to={ROUTES.detect}>Deteksi Baru</Button>
                    <Button to={ROUTES.history} variant="outline">
                        Lihat Riwayat
                    </Button>
                </div>
            </div>
        </div>
    );
}