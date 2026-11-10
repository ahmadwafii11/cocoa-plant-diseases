import { Calendar, Mail, User } from "lucide-react";

import { formatDate } from "../../lib/format";
import type { User as UserProfile } from "../../types/user";
import ProfileCard from "./ProfileCard";

// Desainnya ada di: src/styles/profile.css (bagian 2. KARTU)
interface PersonalInfoProps {
    user: UserProfile;
}

/** Kartu "Informasi Pribadi": nama, username, email, tanggal bergabung. */
export default function PersonalInfo({ user }: PersonalInfoProps) {
    const items = [
        { label: "Nama Lengkap", value: user.full_name },
        { label: "Username", value: `@${user.username}` },
        { label: "Email", value: user.email, icon: Mail },
        { label: "Tanggal Bergabung", value: formatDate(user.created_at), icon: Calendar },
    ];

    return (
        <ProfileCard
            icon={User}
            title="Informasi Pribadi"
            description="Informasi akun yang terdaftar di CocoaScan."
        >
            <dl className="profile-info-grid">
                {items.map(({ label, value, icon: Icon }) => (
                    <div key={label}>
                        <dt className="profile-info-label">{label}</dt>

                        <dd className="profile-info-value">
                            {Icon && (
                                <Icon className="icon-sm icon-muted" aria-hidden="true" />
                            )}
                            {value}
                        </dd>
                    </div>
                ))}
            </dl>
        </ProfileCard>
    );
}