import { Dispatch, ReactNode, SetStateAction } from 'react';
import type { Game } from 'classes/Game';

export interface BoardSquareProps {
    children?: ReactNode;
    x: number;
    y: number;
    game: Game;
    index: number;
    updateState: Dispatch<SetStateAction<string | undefined>>;
}
