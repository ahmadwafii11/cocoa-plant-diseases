import { Link } from "react-router-dom";
import type {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    ReactNode,
} from "react";

import { cn } from "../../lib/cn";

// Desain tiap varian & ukuran ada di: src/styles/button.css
type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
    variant?: Variant;
    size?: Size;
    /** Ikon di sebelah kanan teks (bergeser sedikit saat di-hover). */
    rightIcon?: ReactNode;
    className?: string;
    children: ReactNode;
}

/** Dirender sebagai <Link> react-router bila prop `to` diberikan. */
type LinkButtonProps = BaseProps & {
    to: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps | "href">;

/** Dirender sebagai <button> biasa bila `to` tidak diberikan. */
type NativeButtonProps = BaseProps & {
    to?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>;

export type ButtonProps = LinkButtonProps | NativeButtonProps;

export default function Button(props: ButtonProps) {
    const { variant = "primary", size = "md", className } = props;

    // Contoh hasil: "btn btn-primary btn-lg"
    const classes = cn("btn", `btn-${variant}`, `btn-${size}`, className);

    if (props.to !== undefined) {
        const {
            variant: _variant,
            size: _size,
            rightIcon,
            className: _className,
            children,
            to,
            ...rest
        } = props;

        return (
            <Link to={to} className={classes} {...rest}>
                {children}
                {rightIcon && <span className="btn-icon">{rightIcon}</span>}
            </Link>
        );
    }

    const {
        variant: _variant,
        size: _size,
        rightIcon,
        className: _className,
        children,
        to: _to,
        type = "button",
        ...rest
    } = props;

    return (
        <button type={type} className={classes} {...rest}>
            {children}
            {rightIcon && <span className="btn-icon">{rightIcon}</span>}
        </button>
    );
};