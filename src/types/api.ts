import { MoveProps } from 'classes/Game/game.types';
import { CreateGameRequest, GameListData, JoinGameRequest } from 'pages/GameListPage/GameListPage.types';

export enum FetchStatus {
    FETCHING = 'FETCHING',
    FETCHED = 'FETCHED',
    ERROR = 'ERROR',
    INITIAL = 'INITIAL',
}

export interface ClientToServerEvents {
    createGameRequest: (message: CreateGameRequest, callback: ({ gameId }: { gameId: number }) => void) => void;
    joinGame: (message: JoinGameRequest) => void;
    playerMove: (data: MoveProps) => void;
}

export interface ServerToClientEvents {
    openGames: (data: GameListData[]) => void;
    removeOpenGame: (gameIds: number) => void;
    enemyMove: (data: MoveProps) => void;
}
