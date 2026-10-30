import { Link } from "react-router-dom";

// Desainnya ada di: src/styles/terms.css (bagian CHECKBOX)
interface TermsCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    /** Pesan kesalahan, mis. "Anda harus menyetujui Syarat dan Ketentuan". */
    error?: string;
}

/**
 * Checkbox persetujuan Syarat dan Ketentuan untuk form registrasi.
 * Tautan dibuka di tab baru agar data yang sudah diisi di form tidak hilang.
 *
 * Contoh pemakaian di Register.tsx:
 *   const [agreed, setAgreed] = useState(false);
 *   <TermsCheckbox checked={agreed} onChange={setAgreed} />
 *   <button disabled={!agreed}>Daftar</button>
 */

export default function TermsCheckbox({ checked, onChange, error }: TermsCheckboxProps) {
    return (
        <div>
            <label className="terms-check">
                <input
                    type="checkbox"
                    className="terms-check-input"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    aria-invalid={Boolean(error)}
                />

                <span className="terms-check-label">
                    Saya telah membaca dan menyetujui{" "}
                    <Link
                        to="/syarat-ketentuan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="terms-check-link"
                    >
                        Syarat dan Ketentuan
                    </Link>{" "}
                    CocoaScan.
                </span>
            </label>

            {error && (
                <p role="alert" className="terms-check-error">
                    {error}
                </p>
            )}
        </div>
    );
};