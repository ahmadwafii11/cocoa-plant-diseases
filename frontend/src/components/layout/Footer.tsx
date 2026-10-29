import { APP_NAME, GITHUB_URL } from "../../constants/site";

import Logo from "./Logo";
import GithubIcon from "../ui/GithubIcon";

// Desain terdapat di src/styles/layout.css (Bagian FOOTER)
export default function Footer() {
    return (
        <footer className="footer">
            <div className="container-wide footer-inner">
                <Logo size="sm" />

                {/* Copyright + Icon Github berdampingan */}
                <div className="footer-meta">
                    <p className="footer-copy">
                        &copy; {new Date().getFullYear()} {APP_NAME}.All rights reserved.
                    </p>
                    {/* Tautan ke Repository GitHub */}
                    <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-github"
                        aria-label="GitHub Repository"
                    >
                        <GithubIcon className="footer-github-icon" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
