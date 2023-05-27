import { startCheckersPositions } from 'constants/checkers';

import { CheckerColor, CheckerProperty } from 'classes/Game/game.types';
import { MovesTableRow } from 'pages/GamePage/GamePage.types';
import { MovesResponse } from 'types/move';

export const normalizeLastMoves = (moves: MovesResponse[]): CheckerProperty[] => {
    const tmp: CheckerProperty[] = [];
    moves.forEach((move) => {
        const lastMove = move.new_positions.at(-1) ?? '';
        tmp.push({
            id: move.checker_id,
            x: lastMove?.charCodeAt(0) - 97,
            y: Number(lastMove[1]) - 1,
            death: move.is_dead,
            isKing: move.is_king,
            color: move.is_white ? CheckerColor.WHITE : CheckerColor.BLACK,
        });
    });
    return tmp;
};

export const normalizeGameMoves = (moves: MovesResponse[]): MovesTableRow[] => {
    const tmp: MovesTableRow[] = [];
    const whiteMoves: MovesResponse[] = [];
    const blackMoves: MovesResponse[] = [];
    const startPositions = startCheckersPositions;

    moves.forEach((checker) => (checker.is_white ? whiteMoves : blackMoves).push(checker));

    for (let i = 0; i < Math.max(whiteMoves.length, blackMoves.length); i++) {
        const whiteMove = whiteMoves[i]
            ? `${startPositions.get(whiteMoves[i].checker_id) ?? ''}${
                  whiteMoves[i].new_positions.length > 1 ? ':' : '-'
              }${whiteMoves[i].new_positions.at(-1) ?? ''}`
            : '';
        const blackMove = blackMoves[i]
            ? `${startPositions.get(blackMoves[i].checker_id) ?? ''}${
                  blackMoves[i].new_positions.length > 1 ? ':' : '-'
              }${blackMoves[i].new_positions.at(-1) ?? ''}`
            : '';
        startPositions.set(whiteMoves[i].checker_id, whiteMoves[i].new_positions.at(-1) ?? '');
        startPositions.set(blackMoves[i].checker_id, blackMoves[i].new_positions.at(-1) ?? '');
        tmp.push({
            id: i + 1,
            white: whiteMove,
            black: blackMove,
        });
    }
    return tmp;
};
