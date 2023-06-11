import { MoveProps } from 'classes/Game/game.types';
import { CreateGameRequest, EndGameRequest, GameListData } from 'pages/GameListPage/GameListPage.types';
import { EndGameProps, GameStartProps, JoinGameProps } from 'types/game';

export enum FetchStatus {
    FETCHING = 'FETCHING',
    FETCHED = 'FETCHED',
    ERROR = 'ERROR',
    INITIAL = 'INITIAL',
}

export interface ClientToServerEvents {
    createGameRequest: (message: CreateGameRequest) => void;
    endGameRequest: (message: EndGameRequest) => void;
    joinGame: (data: JoinGameProps) => void;
    playerMove: (data: MoveProps) => void;
    rejoinGame: (roomId: number) => void;
}

export interface ServerToClientEvents {
    openGames: (data: GameListData[]) => void;
    removeOpenGame: (socketId: string) => void;
    gameStart: (data: GameStartProps) => void;
    gameEnd: (data: EndGameProps) => void;
    enemyMove: (data: MoveProps) => void;
}
