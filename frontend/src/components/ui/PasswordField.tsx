import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

import FormField from "./FormField";

// Desainnya ada di: src/styles/auth.css (bagian 4. FORM FIELD)
interface PasswordFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    autoComplete?: string;
    disabled?: boolean;
}

/**
 * Kolom password dengan tombol mata untuk menampilkan / menyembunyikan isi.
 * State "tampilkan" dikelola di dalam komponen ini, jadi halaman
 * tidak perlu membuat state showPassword sendiri.
 */

export default function PasswordField({ disabled, ...props }: PasswordFieldProps) {
    const [visible, setVisible] = useState(false);

    return (
        <FormField
            {...props}
            icon={LockKeyhole}
            type={visible ? "text" : "password"}
            disabled={disabled}
            trailing={
                <button
                    type="button"
                    onClick={() => setVisible((prev) => !prev)}
                    disabled={disabled}
                    className="field-toggle"
                    aria-label={
                        visible ? "Sembunyikan password" : "Tampilkan password"
                    }
                >
                    {visible ? (
                        <EyeOff className="icon-md" aria-hidden="true" />
                    ) : (
                        <Eye className="icon-md" aria-hidden="true" />
                    )}
                </button>
            }
        />
    );
};