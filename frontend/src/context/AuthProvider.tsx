import { useCallback, useEffect, useState, type ReactNode } from "react";

import { AuthContext } from "./authContext";

import { setUnauthorizedHandler, tokenStorage } from "../services/api";
import { login as loginRequest } from "../services/authService";
import type { LoginRequest } from "../types/auth";
import { getUserProfile } from "../services/userService";
import type { User } from "../types/user";

interface AuthProviderProps { children: ReactNode };

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(() => tokenStorage.get());
    
    // Apabila terdapat token tersimpan, kita harus memverifikasinya terlebih dahulu ke server.
    const [loading, setLoading] = useState<boolean>(() => tokenStorage.get() !== null);

    const logout = useCallback(() => {
        tokenStorage.clear();
        setToken(null);
        setUser(null);
    }, []);

    // Memulihkan sesi saat aplikasi pertama kali dibuka.
    useEffect(() => {
        if (!tokenStorage.get()) {
            return;
        }

        let cancelled = false;

        getUserProfile()
            .then((currentUser) => {
                if (!cancelled) setUser(currentUser);
            })
            .catch(() => {
                if (!cancelled) logout();
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [logout]);

    // Apabila server menolak token (401) di tengah pemakaian, otomatis logout.
    useEffect(() => {
        setUnauthorizedHandler(logout);

        return () => setUnauthorizedHandler(null);
    }, [logout]);

    const login = useCallback(async (payload: LoginRequest) => {
        const response = await loginRequest(payload);

        // Login hanya mengembalikan data ringkas; profil lengkap (termasuk
        // foto) diambil dari /users/me. Token disimpan dulu agar terkirim.
        tokenStorage.set(response.token);

        try {
            setUser(await getUserProfile());
            setToken(response.token);
        } catch (err) {
            tokenStorage.clear();
            throw err;
        }
    }, []);

    const updateUser = useCallback((nextUser: User) => {
        setUser(nextUser);
    }, []);

    const refreshUser = useCallback(async () => {
        setUser(await getUserProfile());
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: token !== null && user !== null,
                loading,
                login,
                updateUser,
                refreshUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}