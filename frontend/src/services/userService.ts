import { API_BASE_URL } from "./api";

import type { User as UserProfile, UpdateUserProfileRequest, ChangePasswordRequest } from "../types/user";

export async function getUserProfile(): Promise<UserProfile> {
    const token = localStorage.getItem("cocoascan_token");

    if (!token) {
        throw new Error("Token autentikasi tidak ditemukan.");
    }

    const response = await fetch(`${API_BASE_URL}/users/me`, 
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Gagal mengambil data profil.");
    }

    const data: UserProfile = await response.json();
   
    return data;
}

export async function updateUserProfile(payload: UpdateUserProfileRequest): Promise<UserProfile> {
    const token = localStorage.getItem("cocoascan_token");

    if (!token) {
        throw new Error("Token autentikasi tidak ditemukan.");
    }

    const response = await fetch(`${API_BASE_URL}/users/me`, 
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Gagal memperbarui profil.");
    }

    const data: UserProfile = await response.json();

    return data;
}

export async function changePassword(payload: ChangePasswordRequest): Promise<{ message: string }> {
    const token = localStorage.getItem("cocoascan_token");

    if (!token) {
        throw new Error("Token autentikasi tidak ditemukan.");
    }

    const response = await fetch(`${API_BASE_URL}/users/me/password`, 
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Gagal mengubah password.");
    }

    const data: { message: string } = await response.json();

    return data;
}

export async function uploadProfileImage(imageFile: File): Promise<UserProfile> {
    const token = localStorage.getItem("cocoascan_token");

    if (!token) {
        throw new Error("Token autentikasi tidak ditemukan.");
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(`${API_BASE_URL}/users/me/profile-image`, 
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        }
    );

    if (!response.ok) {
        const errorText = await response.text();

        let errorMessage = errorText;

        try {
            const errorData = JSON.parse(errorText);

            if (
                typeof errorData === "object" &&
                errorData !== null &&
                "message" in errorData &&
                typeof errorData.message === "string"
            ) {
                errorMessage = errorData.message;
            }
        } catch {
            // Response bukan JSON gunakan errorText
        }

        throw new Error(errorMessage  || "Gagal mengunggah foto profil.");
    }

    const data: UserProfile = await response.json();
    
    return data as UserProfile;
}