import { ProfileResponse } from 'types/profile';

export enum CheckerColor {
    BLACK = 'black',
    WHITE = 'white',
}

export interface CheckerProperty {
    id: number;
    x: number;
    y: number;
    death: boolean;
    isKing: boolean;
    color: CheckerColor;
}

export interface PossibleMove {
    checkerId: number;
    toX: number;
    toY: number;
}

export interface GameConstructorProps {
    playerCheckersColor: CheckerColor;
    gameId: number;
    playerTurn: boolean;
    checkersProperties?: CheckerProperty[];
    playerProfile: ProfileResponse;
    enemyProfile: ProfileResponse;
}

export interface MoveProps {
    gameId: number;
    playerId: number;
    checkerId: number;
    startPosition: string;
    newPositions: string[];
    isKing: boolean;
    isWhite: boolean;
    killed: number[];
}
