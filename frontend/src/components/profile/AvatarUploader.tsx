import { useEffect, useRef, useState, type ChangeEventHandler } from "react";
import { Camera } from "lucide-react";

import Alert from "../ui/Alert";
import Button from "../ui/Button";

// Desainnya ada di: src/styles/profile.css (bagian 1. HEADER PROFIL)
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB, sama dengan batas di backend

interface AvatarUploaderProps {
    /** URL foto saat ini (sudah lengkap), atau null bila belum ada. */
    imageUrl: string | null;
    /** Huruf cadangan bila belum punya foto, mis. "W". */
    initial: string;
    /** Dipanggil saat "Simpan Foto" ditekan. Lempar galat bila gagal. */
    onUpload: (file: File) => Promise<void>;
}

/**
 * Foto profil bulat + tombol kamera. Setelah memilih file, muncul pratinjau
 * dan tombol Simpan / Batal.
 */
export default function AvatarUploader({ imageUrl, initial, onUpload }: AvatarUploaderProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    // Alamat pratinjau disimpan di ref agar bisa dilepas (revoke) dengan benar.
    const previewRef = useRef<string | null>(null);

    const clearSelection = () => {
        if (previewRef.current) {
            URL.revokeObjectURL(previewRef.current);
        }

        previewRef.current = null;
        setFile(null);
        setPreview(null);
    };

    // Lepas pratinjau saat komponen ditutup
    useEffect(() => {
        return () => {
            if (previewRef.current) {
                URL.revokeObjectURL(previewRef.current);
            }
        };
    }, []);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const selected = event.target.files?.[0];

        // Kosongkan agar memilih file yang sama dua kali tetap memicu onChange
        event.target.value = "";

        if (!selected) {
            return;
        }

        setError("");

        if (!ALLOWED_TYPES.includes(selected.type)) {
            setError("Format foto harus JPG, PNG, atau WebP.");
            return;
        }

        if (selected.size > MAX_SIZE) {
            setError("Ukuran foto maksimal 5 MB.");
            return;
        }

        clearSelection();

        const url = URL.createObjectURL(selected);
        previewRef.current = url;
        setFile(selected);
        setPreview(url);
    };

    const handleSave = async () => {
        if (!file) {
            return;
        }

        try {
            setUploading(true);
            setError("");

            await onUpload(file);

            clearSelection();
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Gagal mengunggah foto profil."
            );
        } finally {
            setUploading(false);
        }
    };

    const shownImage = preview ?? imageUrl;

    return (
        <div className="profile-avatar-block">
            <div className="profile-avatar">
                <div className="profile-avatar-circle">
                    {shownImage ? (
                        <img
                            src={shownImage}
                            alt="Foto profil"
                            className="profile-avatar-img"
                        />
                    ) : (
                        initial
                    )}
                </div>

                <label htmlFor="profile-image" className="profile-avatar-edit">
                    <Camera className="icon-sm" aria-hidden="true" />
                    <span className="sr-only">Ubah foto profil</span>
                </label>

                <input
                    id="profile-image"
                    type="file"
                    accept={ALLOWED_TYPES.join(",")}
                    onChange={handleChange}
                    disabled={uploading}
                    className="sr-only"
                />
            </div>

            {file && (
                <div className="profile-avatar-actions">
                    <Button size="sm" onClick={handleSave} disabled={uploading}>
                        {uploading ? "Mengunggah..." : "Simpan Foto"}
                    </Button>

                    <Button
                        size="sm"
                        variant="outline"
                        onClick={clearSelection}
                        disabled={uploading}
                    >
                        Batal
                    </Button>
                </div>
            )}

            {error && (
                <div className="profile-avatar-error">
                    <Alert variant="error">{error}</Alert>
                </div>
            )}
        </div>
    );
}