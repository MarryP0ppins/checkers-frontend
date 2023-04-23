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
