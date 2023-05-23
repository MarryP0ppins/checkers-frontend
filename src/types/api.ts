import { CreateGameRequest, GameListData, JoinGameRequest } from 'pages/GameListPage/GameListPage.types';

import { PlayerMakeMoveRequest } from './game';

export enum FetchStatus {
    FETCHING = 'FETCHING',
    FETCHED = 'FETCHED',
    ERROR = 'ERROR',
    INITIAL = 'INITIAL',
}

export interface ClientToServerEvents {
    createGameRequest: (message: CreateGameRequest, callback: ({ gameId }: { gameId: number }) => void) => void;
    joinGame: (message: JoinGameRequest) => void;
    playerMakeMove: (message: PlayerMakeMoveRequest) => void;
}

export interface ServerToClientEvents {
    openGames: (data: GameListData[]) => void;
    removeOpenGame: (gameIds: number) => void;
}
