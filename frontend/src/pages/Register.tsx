import { useState, type FormEventHandler } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, User, UserRound } from "lucide-react";

import { APP_NAME } from "../constants/site";

import { register } from "../services/authService";

import AuthCard from "../components/auth/AuthCard";
import TermsCheckbox from "../components/auth/TermsCheckbox";

import Alert from "../components/ui/Alert";
import Button from "../components/ui/Button";
import FormField from "../components/ui/FormField";
import PasswordField from "../components/ui/PasswordField";

// Desainnya ada di: src/styles/auth.css
export default function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Persetujuan Syarat dan Ketentuan
    const [agreed, setAgreed] = useState(false);
    const [termsError, setTermsError] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Setelah berhasil, form dikunci agar tidak terkirim dua kali
    // selama menunggu pindah ke halaman login.
    const busy = loading || Boolean(success);

    const handleAgreedChange = (checked: boolean) => {
        setAgreed(checked);

        if (checked) {
            setTermsError("");
        }
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");
        setTermsError("");

        // Validasi field
        if (
            !username.trim() ||
            !fullName.trim() ||
            !email.trim() ||
            !password ||
            !confirmPassword
        ) {
            setError("Semua field wajib diisi.");
            return;
        }

        // Validasi panjang password
        if (password.length < 6) {
            setError("Password minimal terdiri dari 6 karakter.");
            return;
        }

        // Validasi konfirmasi password
        if (password !== confirmPassword) {
            setError("Konfirmasi password tidak sesuai.");
            return;
        }

        // Validasi persetujuan Syarat dan Ketentuan
        if (!agreed) {
            setTermsError(
                "Anda harus menyetujui Syarat dan Ketentuan untuk membuat akun."
            );
            return;
        }

        try {
            setLoading(true);

            await register({
                username: username.trim(),
                full_name: fullName.trim(),
                email: email.trim(),
                password,
            });

            setSuccess("Registrasi berhasil. Mengarahkan ke halaman login...");

            // Beri waktu agar pesan berhasil terlihat
            setTimeout(() => {
                navigate("/login", { replace: true });
            }, 1000);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Registrasi gagal. Silakan coba lagi."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthCard
            heading={`Bergabung dengan ${APP_NAME}`}
            title="Buat Akun"
            subtitle={`Daftarkan akun untuk mulai menggunakan ${APP_NAME}.`}
            footer={
                <>
                    Sudah memiliki akun?{" "}
                    <Link to="/login" className="auth-switch-link">
                        Login sekarang
                    </Link>
                </>
            }
        >
            {error && <Alert variant="error">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <form onSubmit={handleSubmit} className="auth-form">
                <FormField
                    id="username"
                    label="Username"
                    icon={User}
                    value={username}
                    onChange={setUsername}
                    placeholder="Masukkan username"
                    autoComplete="username"
                    disabled={busy}
                />

                <FormField
                    id="fullName"
                    label="Nama Lengkap"
                    icon={UserRound}
                    value={fullName}
                    onChange={setFullName}
                    placeholder="Masukkan nama lengkap"
                    autoComplete="name"
                    disabled={busy}
                />

                <FormField
                    id="email"
                    label="Email"
                    icon={Mail}
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="Masukkan email"
                    autoComplete="email"
                    disabled={busy}
                />

                <PasswordField
                    id="password"
                    label="Password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Masukkan password"
                    autoComplete="new-password"
                    disabled={busy}
                />

                <PasswordField
                    id="confirmPassword"
                    label="Konfirmasi Password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    placeholder="Ulangi password"
                    autoComplete="new-password"
                    disabled={busy}
                />

                <TermsCheckbox
                    checked={agreed}
                    onChange={handleAgreedChange}
                    error={termsError}
                />

                <Button
                    type="submit"
                    size="lg"
                    className="btn-block"
                    disabled={busy}
                >
                    {loading ? "Mendaftarkan..." : "Daftar"}
                </Button>
            </form>
        </AuthCard>
    );
};