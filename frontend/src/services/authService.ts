import { API_BASE_URL } from "./api";
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../types/auth";

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || "Username atau password salah.");
    }

    const data: LoginResponse = await response.json();

    return data
}

export async function register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Gagal Dalam Melakukan Registrasi!")
    }

    const result: RegisterResponse = await response.json();

    return result;
}