import { useState, type FormEventHandler } from "react";
import { Mail, User, UserRound } from "lucide-react";

import { updateUserProfile } from "../../services/userService";
import type { User as UserProfile } from "../../types/user";
import Alert from "../ui/Alert";
import Button from "../ui/Button";
import FormField from "../ui/FormField";
import Modal from "../ui/Modal";

// Desainnya ada di: src/styles/profile.css (bagian 4. MODAL)
interface EditProfileModalProps {
    user: UserProfile;
    onClose: () => void;
    /** Dipanggil dengan profil terbaru setelah berhasil disimpan. */
    onSaved: (profile: UserProfile) => void;
}

/** Jendela untuk mengubah username, nama lengkap, dan email. */
export default function EditProfileModal({ user, onClose, onSaved }: EditProfileModalProps) {
    const [username, setUsername] = useState(user.username);
    const [fullName, setFullName] = useState(user.full_name);
    const [email, setEmail] = useState(user.email);

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        setError("");

        if (!username.trim() || !fullName.trim() || !email.trim()) {
            setError("Semua field wajib diisi.");
            return;
        }

        try {
            setSaving(true);

            const updated = await updateUserProfile({
                username: username.trim(),
                full_name: fullName.trim(),
                email: email.trim(),
            });

            onSaved(updated);
            onClose();
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Gagal memperbarui profil."
            );
            setSaving(false);
        }
    };

    return (
        <Modal
            title="Edit Profil"
            subtitle="Perbarui informasi akun Anda."
            onClose={onClose}
            busy={saving}
        >
            {error && <Alert variant="error">{error}</Alert>}

            <form onSubmit={handleSubmit} className="auth-form">
                <FormField
                    id="edit-username"
                    label="Username"
                    icon={User}
                    value={username}
                    onChange={setUsername}
                    placeholder="Masukkan username"
                    autoComplete="username"
                    disabled={saving}
                />

                <FormField
                    id="edit-fullName"
                    label="Nama Lengkap"
                    icon={UserRound}
                    value={fullName}
                    onChange={setFullName}
                    placeholder="Masukkan nama lengkap"
                    autoComplete="name"
                    disabled={saving}
                />

                <FormField
                    id="edit-email"
                    label="Email"
                    icon={Mail}
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="Masukkan email"
                    autoComplete="email"
                    disabled={saving}
                />

                <div className="modal-actions">
                    <Button variant="outline" onClick={onClose} disabled={saving}>
                        Batal
                    </Button>

                    <Button type="submit" disabled={saving}>
                        {saving ? "Menyimpan..." : "Simpan Perubahan"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}