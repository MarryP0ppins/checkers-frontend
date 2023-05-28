export interface GameListData {
    id: number;
    socketId: string;
    userId: number;
    username: string;
    rating: number;
}

export interface CreateGameRequest {
    userId: number;
    username: string;
    rating: number;
}
