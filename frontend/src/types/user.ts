export interface User {
    id: number;
    username: string;
    full_name: string;
    email: string;
    profile_image: string | null;
    created_at: string;
    updated_at: string;
}

export interface UpdateUserProfileRequest {
    username        : string;
    full_name       : string;
    email           : string;
}

export interface ChangePasswordRequest {
    current_password    : string;
    new_password        : string;
}