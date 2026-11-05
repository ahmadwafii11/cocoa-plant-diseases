import { createContext } from "react";

import type { LoginRequest, LoginResponse } from "../types/auth";
import type { User } from "../types/user";

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (payload: LoginRequest) => Promise<LoginResponse>;
    updateUser: (userData: Partial<User>) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);