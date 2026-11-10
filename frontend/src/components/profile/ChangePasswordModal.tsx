import { useState, type FormEventHandler } from "react";

import { changePassword } from "../../services/userService";
import Alert from "../ui/Alert";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import PasswordField from "../ui/PasswordField";

// Desainnya ada di: src/styles/profile.css (bagian 4. MODAL)
interface ChangePasswordModalProps {
    onClose: () => void;
}

/** Jendela untuk mengubah password (password lama + baru + konfirmasi). */
export default function ChangePasswordModal({ onClose }: ChangePasswordModalProps) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("Semua field password wajib diisi.");
            return;
        }

        if (newPassword.length < 8) {
            setError("Password baru minimal 8 karakter.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Konfirmasi password baru tidak sesuai.");
            return;
        }

        try {
            setSaving(true);

            const result = await changePassword({
                current_password: currentPassword,
                new_password: newPassword,
            });

            setSuccess(result.message);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Gagal mengubah password."
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal
            title="Ubah Password"
            subtitle="Perbarui password akun CocoaScan Anda."
            onClose={onClose}
            busy={saving}
        >
            {error && <Alert variant="error">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <form onSubmit={handleSubmit} className="auth-form">
                <PasswordField
                    id="current-password"
                    label="Password Lama"
                    value={currentPassword}
                    onChange={setCurrentPassword}
                    placeholder="Masukkan password lama"
                    autoComplete="current-password"
                    disabled={saving}
                />

                <PasswordField
                    id="new-password"
                    label="Password Baru"
                    value={newPassword}
                    onChange={setNewPassword}
                    placeholder="Masukkan password baru"
                    autoComplete="new-password"
                    hint="Password minimal 8 karakter."
                    disabled={saving}
                />

                <PasswordField
                    id="confirm-new-password"
                    label="Konfirmasi Password Baru"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    placeholder="Masukkan kembali password baru"
                    autoComplete="new-password"
                    disabled={saving}
                />

                <div className="modal-actions">
                    <Button variant="outline" onClick={onClose} disabled={saving}>
                        {success ? "Tutup" : "Batal"}
                    </Button>

                    <Button type="submit" disabled={saving}>
                        {saving ? "Menyimpan..." : "Simpan Password"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}