export interface AuthUser {
    email: string;
    password: string;
    type: string;
}

export interface UserResponse {
    id: number;
    email: string;
    username: string;
}
