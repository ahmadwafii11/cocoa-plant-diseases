import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DETECTION_ALLOWED_TYPES, DETECTION_MAX_IMAGE_MB, DETECTION_MAX_IMAGE_BYTES } from "../constants/detection";
import { detectionResultPath } from "../constants/site";
import { detectDisease } from "../services/detectionService";

// Seluruh logika yang terdapat di page Deteksi Penyakit:
// - Memilih gambar
// - Memeriksa gambar
// - Membuat pratinjau
// - Mengirim ke Server 
// - Lalu pindah menuju halaman atau page Hasil Deteksi 
// Page Deteksi Penyakit cukup memanggil hook ini dan menampilkan hasilnya
export function useDetection() {
    const navigate = useNavigate()

    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [detecting, setDetecting] = useState(false);
    const [error, setError] = useState("");

    // Alamat pratinjau disimpan di ref agar dapat dilepas (revoke) dengan benar.
    const previewRef = useRef<string | null>(null);
    const releasePreview = () => {
        if (previewRef.current) {
            URL.revokeObjectURL(previewRef.current);
            previewRef.current = null;
        }
    };

    // Melepas pratinjau saat halaman ditutup
    useEffect(() => {
        return () => {
            if (previewRef.current) {
                URL.revokeObjectURL(previewRef.current);
            }
        };
    }, []);

    // Memeriksa gambar lalu menyimpan gambar pilihan.
    // Mengembalikan false apabila gambar ditolak.
    const selectFile = (selected: File): boolean => {
        setError("");

        if (!DETECTION_ALLOWED_TYPES.includes(selected.type)) {
            setError("Format gambar harus JPG atau JPEG.");
            return false;
        }

        if (selected.size > DETECTION_MAX_IMAGE_BYTES) {
            setError(`Ukuran gambar maksimal ${DETECTION_MAX_IMAGE_MB} MB.`);
            return false;
        }

        releasePreview();

        const url = URL.createObjectURL(selected);
        previewRef.current = url;

        setFile(selected);
        setPreviewUrl(url);

        return true;
    };

    const reset = () => {
        releasePreview();
        setFile(null);
        setPreviewUrl(null);
        setError("");
    };

    const detect = async () => {
        if(!file) {
            setError("Silahkan pilih gambar terlebih dahulu.");
            return;
        }

        try {
            setDetecting(true);
            setError("");

            const result = await detectDisease(file);
            navigate(detectionResultPath(result.id));
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Terjadi kesalahan saat melakukan deteksi."
            );
            setDetecting(false);
        }
    };

    return { file, previewUrl, detecting, error, selectFile, reset, detect };
}