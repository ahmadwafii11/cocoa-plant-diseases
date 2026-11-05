import { useContext } from "react";

import { AuthContext, type AuthContextType } from "../context/authContext";

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth harus digunakan di dalam AuthProvider");
    }

    return context;
}