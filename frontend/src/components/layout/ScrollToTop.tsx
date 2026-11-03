import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname, hash } = useLocation();
    useEffect(() => {
        // Tautan anchor (mis. /#fitur): scroll ke elemen tujuannya,
        // bukan ke atas halaman.
        if (hash) {
            document.getElementById(hash.slice(1))?.scrollIntoView();
            return;
        }

        // behavior "instant": langsung loncat ke atas, tidak meluncur pelan
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [pathname, hash]);
    return null;
};