import { createContext } from "react";

import type { LoginRequest } from "../types/auth";
import type { User } from "../types/user";

export interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (payload: LoginRequest) => Promise<void>;
    updateUser: (userData: Partial<User>) => void;
    refreshUser: (user: User) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);