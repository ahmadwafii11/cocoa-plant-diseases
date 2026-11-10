import { Calendar, Pencil } from "lucide-react";

import { formatDate } from "../../lib/format";
import { assetUrl } from "../../services/api";
import type { User } from "../../types/user";
import Button from "../ui/Button";
import AvatarUploader from "./AvatarUploader";

// Desainnya ada di: src/styles/profile.css (bagian 1. HEADER PROFIL)
interface ProfileHeaderProps {
    user: User;
    onEdit: () => void;
    onUploadPhoto: (file: File) => Promise<void>;
}

/** Kartu paling atas: foto, nama, username, tanggal bergabung, tombol Edit. */
export default function ProfileHeader({ user, onEdit, onUploadPhoto }: ProfileHeaderProps) {
    const initial = user.full_name.trim().charAt(0).toUpperCase() || "?";

    return (
        <section className="profile-card profile-hero">
            <AvatarUploader
                imageUrl={assetUrl(user.profile_image)}
                initial={initial}
                onUpload={onUploadPhoto}
            />

            <div className="profile-hero-info">
                <h1 className="profile-name">{user.full_name}</h1>
                <p className="profile-username">@{user.username}</p>

                <p className="profile-meta">
                    <Calendar className="icon-sm" aria-hidden="true" />
                    Bergabung sejak {formatDate(user.created_at)}
                </p>
            </div>

            <Button variant="outline" onClick={onEdit}>
                <Pencil className="icon-sm" aria-hidden="true" />
                Edit Profil
            </Button>
        </section>
    );
}