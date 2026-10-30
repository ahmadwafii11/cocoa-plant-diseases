import type { ReactNode } from "react";

// Desainnya ada di: src/styles/auth.css (bagian 3. ALERT)
interface AlertProps {
    variant: "error" | "success";
    children: ReactNode;
}

/** Kotak pesan galat atau berhasil. */
export default function Alert({ variant, children }: AlertProps) {
    return (
        <div
            role={variant === "error" ? "alert" : "status"}
            className={`alert alert-${variant}`}
        >
            {children}
        </div>
    );
};