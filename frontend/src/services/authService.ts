import { apiRequest } from "./api";
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../types/auth";
import type { User } from "../types/user";

// POST /auth/register
export function register(payload: RegisterRequest): Promise<RegisterResponse> {
    return apiRequest<RegisterResponse>("/auth/register", {
        method: "POST",
        body: payload,
        auth: false,
    });
}

// POST /auth/login
export function login(payload: LoginRequest): Promise<LoginResponse> {
    return apiRequest<LoginResponse>("/auth/login", {
        method: "POST",
        body: payload,
        auth: false,
    });
}

// GET /users/me: data pengguna yang sedang login (butuh token).
export function getCurrentUser() : Promise<User> {
    return apiRequest<User>("/users/me");
}