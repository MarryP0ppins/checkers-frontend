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
    userOneInfo: UserResponse;
    userTwoInfo: UserResponse;
    userOneTurn: boolean;
    userOneIsWhite: boolean;
    winner?: WinnerStatus;
    userOnePoints?: number;
    userTwoPoints?: number;
    startAt: string;
    finishAt?: string;
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
    userOneInfo: UserResponse;
    userTwoInfo: UserResponse;
    startAt: string;
    userOneTurn: boolean;
    userOneIsWhite: boolean;
    status: GameStatus;
}

export interface JoinGameProps {
    socketId: string;
    userId: number;
}

export interface EnemyProfile {
    id: number;
    username: string;
    wins: number;
    games: number;
    rating: number;
}
