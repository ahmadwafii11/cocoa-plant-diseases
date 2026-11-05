import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import { ROUTES } from "../../constants/site";
import { useAuth } from "../../hooks/useAuth";

import Button from "../ui/Button";
import { assetUrl } from "../../services/api";

export default function UserActions() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    }

    const name = user?.full_name || user?.username || "";
    const initial = name.trim().charAt(0).toUpperCase() || "?";
    const avatar = assetUrl(user?.profile_image ?? null);
    return(
        <>
            <Link to={ROUTES.profile} className="user-chip" aria-label="Profil saya">
                <span className="use-avatar">
                    {avatar ? (
                        <img src={avatar} alt="" className="user-avatar-img" />   
                    ) : (
                        initial
                    )}
                </span>

                <span className="user-name">{name}</span>
            </Link>

            <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="icon-sm" aria-hidden="true"/>
                Keluar
            </Button>
        </>
    );
}