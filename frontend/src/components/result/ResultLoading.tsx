import { Loader2 } from "lucide-react";

// Desainnya terdapat di src/styles/result.css (bagian 6. STATUS HALAMAN)

// Tampilan saat hasil sedang diambil dari server.
export default function ResultLoading() {
    return (
        <div className="result-state" role="status">
            <Loader2 className="icon-xl icon-accent animate-spin" aria-hidden="true" />
            <p className="result-state-text">Memuat hasil deteksi...</p>
        </div>
    );
}