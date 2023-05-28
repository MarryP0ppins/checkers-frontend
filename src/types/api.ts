import { MoveProps } from 'classes/Game/game.types';
import { CreateGameRequest, GameListData } from 'pages/GameListPage/GameListPage.types';

export enum FetchStatus {
    FETCHING = 'FETCHING',
    FETCHED = 'FETCHED',
    ERROR = 'ERROR',
    INITIAL = 'INITIAL',
}

export interface ClientToServerEvents {
    createGameRequest: (message: CreateGameRequest) => void;
    joinGame: (socketId:string) => void;
    playerMove: (data: MoveProps) => void;
}

export interface ServerToClientEvents {
    openGames: (data: GameListData[]) => void;
    removeOpenGame: (socketId: string) => void;
    gameStart: (gameId: number) => void;
    enemyMove: (data: MoveProps) => void;
}