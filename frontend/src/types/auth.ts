export interface LoginRequest {
    email       : string;
    password    : string;
}

export interface LoginResponse {
    message     : string;
    token       : string;
    user_id     : number;
    username    : string;
    full_name   : string;
    email       : string;
}

export interface RegisterRequest {
    username    : string;
    full_name   : string;
    email       : string;
    password    : string;
}

export interface RegisterResponse {
    message     : string;
}