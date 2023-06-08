import { WinnerStatus } from 'types/game';

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

export interface EndGameRequest {
    gameId: number;
    winner: WinnerStatus;
    userOnePoints: number;
    userTwoPoints: number;
}
