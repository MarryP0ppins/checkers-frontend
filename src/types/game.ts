import { UserResponse } from 'types/singin';

export enum ItemTypes {
    CHECKER = 'checker',
}
export enum GameStatus {
    CREATED = 'CREATED',
    IN_PROCESS = 'IN_PROCESS',
    FINISHED = 'FINISHED',
}

export interface GamesResponse {
    id: number;
    user_1: UserResponse;
    user_2: UserResponse;
    user_1_turn: boolean;
    user_1_win: boolean;
    user_1_points: number;
    user_2_points: number;
    start_at: string;
    finish_at: string;
    status: GameStatus;
    moves: { [username: string]: string[] };
}

export interface UserGamesData {
    id: number;
    date: Date;
    white: string;
    black: string;
    result: string;
    rating: number;
}
