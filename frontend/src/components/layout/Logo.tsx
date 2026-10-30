import { Link } from "react-router-dom";

import iconWeb from "../../assets/icon.png";
import { cn } from "../../lib/cn";
import { APP_NAME, APP_TAGLINE } from "../../constants/site";

// Desain terdapat di src/styles/layout.css (bagian LOGO)
interface LogoProps{
    // "sm" dipakai di footer
    size?: "md" | "sm";
    className?: string;
}

export default function Logo({size = "md", className}: LogoProps) {
    return(
        <Link
            to="/"
            aria-label={`${APP_NAME} - Beranda`}
            className={cn("logo", size === "sm" && "logo-sm", className)}
        >
            <span className="logo-icon-box">
                <img 
                    src={iconWeb}
                    alt=""
                    aria-hidden="true"
                    className="logo-icon"
                />
            </span>

            <span className="logo-text">
                <span className="logo-name">{APP_NAME}</span>
                <span className="logo-tagline">{APP_TAGLINE}</span>
            </span>
        </Link>
    );
};
