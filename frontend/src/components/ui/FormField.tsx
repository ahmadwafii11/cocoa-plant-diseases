import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "../../lib/cn";

// Desainnya ada di: src/styles/auth.css (bagian 4. FORM FIELD)
interface FormFieldProps {
    id: string;
    label: string;
    icon: LucideIcon;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    placeholder?: string;
    autoComplete?: string;
    disabled?: boolean;
    /** Elemen di sisi kanan kolom (mis. tombol mata). Memberi ruang ekstra di kanan. */
    trailing?: ReactNode;
}

/** Satu kolom isian: label + ikon di kiri + input. */
export default function FormField({
    id,
    label,
    icon: Icon,
    value,
    onChange,
    type = "text",
    placeholder,
    autoComplete,
    disabled,
    trailing,
}: FormFieldProps) {
    return (
        <div>
            <label htmlFor={id} className="field-label">
                {label}
            </label>

            <div className="field-control">
                <Icon className="field-icon" aria-hidden="true" />

                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    disabled={disabled}
                    className={cn("field-input", trailing && "field-input-toggle")}
                />

                {trailing}
            </div>
        </div>
    );
};