export interface GameListData {
    id: number;
    userId: number;
    username: string;
    rating: number;
}

export interface CreateGameRequest {
    userId: number;
    username: string;
    rating: number;
}

export interface JoinGameRequest {
    gameId: number;
}
