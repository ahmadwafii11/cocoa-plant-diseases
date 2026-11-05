import { useEffect, useState, type ReactNode } from "react";

import { AuthContext } from "./authContext";

import { login as loginService } from "../services/authService";

import type { User } from "../types/user";
import type { LoginRequest, LoginResponse } from "../types/auth";

const USER_KEY = "cocoascan_user";
const TOKEN_KEY = "cocoascan_token";

interface AuthProviderProps { children: ReactNode };

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Muat user dari localStorage saat aplikasi pertama kali dibuka
    useEffect(() => {
        const storedUser = localStorage.getItem(USER_KEY);

        if (storedUser) {
            try {
                const parsedUser: User = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch {
                localStorage.removeItem(USER_KEY);
            }
        }

        setLoading(false);
    }, []);

    // Sinkronkan user ke localStorage setiap kali berubah.
    // Dilewati selama loading supaya data tersimpan tidak terhapus sebelum selesai dibaca.
    useEffect(() => {
        if (loading) {
            return;
        }

        if (user) {
            localStorage.setItem(USER_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(USER_KEY);
        }
    }, [user, loading]);

    const login = async (payload: LoginRequest): Promise<LoginResponse> => {
        const response = await loginService(payload);

        const loggedInUser: User = {
            id: response.user_id,
            username: response.username,
            full_name: response.full_name,
            email: response.email,
            profile_image: null,
        };

        localStorage.setItem(TOKEN_KEY, response.token);
        setUser(loggedInUser);

        return response;
    };

    const updateUser = (userData: Partial<User>) => {
        setUser((currentUser) =>
            currentUser ? { ...currentUser, ...userData } : null
        );
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                updateUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}