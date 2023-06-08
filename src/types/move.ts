export interface MovesResponse {
    id: number;
    game: number;
    user: number;
    checkerId: number;
    newPositions: string[];
    isDead: boolean;
    isWhite: boolean;
    isKing: boolean;
    isLastMove: boolean;
}
