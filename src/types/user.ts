export interface UserResponse {
    id: number;
    username: string;
    profile: {
        wins: number;
        games: number;
        rating: number;
    };
}
