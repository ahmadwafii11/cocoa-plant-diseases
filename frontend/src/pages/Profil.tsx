import { useState } from "react";

import { APP_NAV_LINKS, ROUTES } from "../constants/site";
import { useAuth } from "../hooks/useAuth";

import AccountNote from "../components/profile/AccountNote";
import ChangePasswordModal from "../components/profile/ChangePasswordModal";
import EditProfileModal from "../components/profile/EditProfileModal";
import PersonalInfo from "../components/profile/PersonalInfo";
import ProfileHeader from "../components/profile/ProfileHeader";
import SecurityCard from "../components/profile/SecurityCard";

import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import UserActions from "../components/layout/UserActions";


import { uploadProfileImage } from "../services/userService";

// Desainnya ada di: src/styles/profile.css
export default function Profil() {
    // Data user sudah dimuat AuthContext (GET /users/me) dan halaman ini
    // dilindungi ProtectedRoute, jadi tidak perlu mengambil ulang di sini.
    const { user, updateUser } = useAuth();

    const [editOpen, setEditOpen] = useState(false);
    const [passwordOpen, setPasswordOpen] = useState(false);

    if (!user) {
        return null;
    }

    const handleUploadPhoto = async (file: File) => {
        updateUser(await uploadProfileImage(file));
    };

    return (
        <div className="page">
            <Navbar
                links={APP_NAV_LINKS}
                homeTo={ROUTES.home}
                actions={<UserActions />}
            />

            <main className="page-main">
                <div className="container-narrow profile-main">
                    <ProfileHeader
                        user={user}
                        onEdit={() => setEditOpen(true)}
                        onUploadPhoto={handleUploadPhoto}
                    />

                    <PersonalInfo user={user} />
                    <SecurityCard onChangePassword={() => setPasswordOpen(true)} />
                    <AccountNote />
                </div>
            </main>

            <Footer />

            {editOpen && (
                <EditProfileModal
                    user={user}
                    onClose={() => setEditOpen(false)}
                    onSaved={updateUser}
                />
            )}

            {passwordOpen && (
                <ChangePasswordModal onClose={() => setPasswordOpen(false)} />
            )}
        </div>
    );
}