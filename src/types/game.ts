import { UserResponse } from 'types/singin';

export enum ItemTypes {
    CHECKER = 'checker',
}
export enum GameStatus {
    CREATED = 'CREATED',
    IN_PROCESS = 'IN_PROCESS',
    FINISHED = 'FINISHED',
}

export enum WinnerStatus {
    USER_1 = 'USER_1',
    USER_2 = 'USER_2',
    DRAW = 'DRAW',
}

export interface GamesResponse {
    id: number;
    user_1_info: UserResponse;
    user_2_info: UserResponse;
    user_1_turn: boolean;
    user_1_is_white: boolean;
    winner?: WinnerStatus;
    user_1_points?: number;
    user_2_points?: number;
    start_at: string;
    finish_at?: string;
    status: GameStatus;
    moves?: { [username: string]: string[] };
}

export interface UserGamesData {
    id: number;
    date: Date;
    white: string;
    black: string;
    result: string;
    rating: number;
}

export interface GameStartProps {
    id: number;
    user_1_info: UserResponse;
    user_2_info: UserResponse;
    start_at: string;
    user_1_turn: boolean;
    user_1_is_white: boolean;
    status: GameStatus;
}

export interface JoinGameProps {
    socketId: string;
    userId: number;
}
