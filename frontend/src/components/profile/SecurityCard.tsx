import { LockKeyhole, ShieldCheck } from "lucide-react";

import Button from "../ui/Button";
import ProfileCard from "./ProfileCard";

// Desainnya ada di: src/styles/profile.css (bagian 3. KEAMANAN & CATATAN)
interface SecurityCardProps {
    onChangePassword: () => void;
}

/** Kartu "Keamanan Akun" dengan tombol Ubah Password. */
export default function SecurityCard({ onChangePassword }: SecurityCardProps) {
    return (
        <ProfileCard
            icon={ShieldCheck}
            title="Keamanan Akun"
            description="Kelola keamanan akun CocoaScan."
        >
            <div className="profile-security-row">
                <div className="profile-security-info">
                    <span className="profile-security-icon">
                        <LockKeyhole className="icon-md" aria-hidden="true" />
                    </span>

                    <div>
                        <p className="profile-security-title">Password</p>
                        <p className="profile-card-desc">
                            Password akun Anda tersimpan secara aman.
                        </p>
                    </div>
                </div>

                <Button variant="outline" onClick={onChangePassword}>
                    Ubah Password
                </Button>
            </div>
        </ProfileCard>
    );
}