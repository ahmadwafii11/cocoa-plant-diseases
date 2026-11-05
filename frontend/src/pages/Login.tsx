import { useState, type FormEventHandler } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

import { APP_NAME } from "../constants/site";

import { useAuth } from "../hooks/useAuth";

import AuthCard from "../components/auth/AuthCard";

import Alert from "../components/ui/Alert";
import Button from "../components/ui/Button";
import FormField from "../components/ui/FormField";
import PasswordField from "../components/ui/PasswordField";

// Desainnya ada di: src/styles/auth.css
export default function Login() {
    const { login } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Halaman tujuan setelah login (mis. halaman yang tadi diproteksi)
    const from = location.state?.from?.pathname || "/beranda";

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        setError("");

        if (!email.trim() || !password) {
            setError("Email dan password wajib diisi.");
            return;
        }

        try {
            setLoading(true);

            await login({
                email: email.trim(),
                password,
            });

            navigate(from, { replace: true });
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Login gagal. Silakan coba lagi."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthCard
            heading={`Selamat Datang di ${APP_NAME}`}
            title="Login"
            subtitle={`Masuk untuk menggunakan fitur ${APP_NAME}.`}
            footer={
                <>
                    Belum memiliki akun?{" "}
                    <Link to="/register" className="auth-switch-link">
                        Daftar sekarang
                    </Link>
                </>
            }
        >
            {error && <Alert variant="error">{error}</Alert>}

            <form onSubmit={handleSubmit} className="auth-form">
                <FormField
                    id="email"
                    label="Email"
                    icon={Mail}
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="Masukkan email"
                    autoComplete="email"
                    disabled={loading}
                />

                <PasswordField
                    id="password"
                    label="Password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Masukkan password"
                    autoComplete="current-password"
                    disabled={loading}
                />

                <Button
                    type="submit"
                    size="lg"
                    className="btn-block"
                    disabled={loading}
                >
                    {loading ? "Memproses..." : "Login"}
                </Button>
            </form>
        </AuthCard>
    );
};