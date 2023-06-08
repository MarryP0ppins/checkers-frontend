import { startCheckersPositions } from 'constants/checkers';

import { CheckerColor, CheckerProperty } from 'classes/Game/game.types';
import { MovesTableRow } from 'pages/GamePage/GamePage.types';
import { MovesResponse } from 'types/move';

export const normalizeLastMoves = (moves: MovesResponse[]): CheckerProperty[] => {
    const tmp: CheckerProperty[] = [];

    moves.forEach((move) => {
        const lastMove = move.newPositions.at(-1) ?? '';
        tmp.push({
            id: move.checkerId,
            x: lastMove?.charCodeAt(0) - 97,
            y: Number(lastMove[1]) - 1,
            death: move.isDead,
            isKing: move.isKing,
            color: move.isWhite ? CheckerColor.WHITE : CheckerColor.BLACK,
        });
    });
    return tmp;
};

export const normalizeGameMoves = (moves: MovesResponse[]): MovesTableRow[] => {
    const tmp: MovesTableRow[] = [];
    const whiteMoves: MovesResponse[] = [];
    const blackMoves: MovesResponse[] = [];
    const startPositions = startCheckersPositions;

    moves.forEach((checker) => (checker.isWhite ? whiteMoves : blackMoves).push(checker));

    for (let i = 0; i < Math.max(whiteMoves.length, blackMoves.length); i++) {
        const whiteMove = whiteMoves[i]
            ? `${startPositions.get(whiteMoves[i].checkerId) ?? ''}${
                  whiteMoves[i].newPositions.length > 1 ? ':' : '-'
              }${whiteMoves[i].newPositions.at(-1) ?? ''}`
            : '';
        const blackMove = blackMoves[i]
            ? `${startPositions.get(blackMoves[i].checkerId) ?? ''}${
                  blackMoves[i].newPositions.length > 1 ? ':' : '-'
              }${blackMoves[i].newPositions.at(-1) ?? ''}`
            : '';
        if (whiteMoves[i]) {
            startPositions.set(whiteMoves[i].checkerId, whiteMoves[i].newPositions.at(-1) ?? '');
        }
        if (blackMoves[i]) {
            startPositions.set(blackMoves[i].checkerId, blackMoves[i].newPositions.at(-1) ?? '');
        }
        tmp.push({
            id: i + 1,
            white: whiteMove,
            black: blackMove,
        });
    }
    return tmp;
};
