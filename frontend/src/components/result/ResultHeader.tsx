import { ArrowLeft, ScanSearch } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { MODEL_NAME, ROUTES } from "../../constants/site";
import Button from "../ui/Button";

// Desainnya terdapat di src/styles/result.css (bagian 1. HEADER)

// Judul halaman hasil + tombol kembali, deteksi lagi, dan riwayat.
export default function ResultHeader() {
    const navigate = useNavigate();

    return (
        <header className="result-header">
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="result-back"
            >
                <ArrowLeft className="icon-sm" aria-hidden="true" />
                Kembali
            </button>

            <div className="result-header-row">
                <div>
                    <h1 className="result-title">Hasil Deteksi</h1>

                    <p className="result-subtitle">
                        Hasil klasifikasi gambar buah kakao menggunakan model{" "}
                        {MODEL_NAME}.
                    </p>
                </div>

                <div className="result-actions">
                    <Button to={ROUTES.detect}>
                        <ScanSearch className="icon-sm" aria-hidden="true" />
                        Deteksi Lagi
                    </Button>

                    <Button to={ROUTES.history} variant="outline">
                        Lihat Riwayat
                    </Button>
                </div>
            </div>
        </header>
    );
}