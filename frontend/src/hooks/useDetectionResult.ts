import { useEffect, useState } from "react";

import { getDetectionDetail } from "../services/detectionService";
import type { DetectionHistory } from "../types/detection";

interface DetectionResultState {
    result: DetectionHistory | null;
    loading: boolean;
    error: string;
}

// Mengambil satu hasil deteksi (GET /detection-history/detail/{id}).
export function useDetectionResult(id: string | undefined): DetectionResultState {
    const [state, setState] = useState<DetectionResultState>({
        result: null,
        loading: true,
        error: "",
    });

    useEffect(() => {
        const detectionId = Number(id);

        if (!id || !Number.isInteger(detectionId) || detectionId <= 0) {
            setState({ result: null, loading: false, error: "ID deteksi tidak valid." });
            return;
        }

        // Mencegah hasil lama untuk menimpa state apabila id berubah
        let cancelled = false;

        setState({ result: null, loading: true, error: "" });

        getDetectionDetail(detectionId)
            .then((data) => {
                if (!cancelled) setState({ result: data, loading: false, error: "" });
            })
            .catch((err) => {
                if (cancelled) return;

                setState({
                    result: null,
                    loading: false,
                    error:
                        err instanceof Error
                            ? err.message
                            : "Gagal mengambil hasil deteksi.",
                });
            });
        
        return () => {
            cancelled  = true;
        };
    }, [id]);

    return state;
}