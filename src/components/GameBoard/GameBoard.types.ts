import { Dispatch, SetStateAction } from 'react';
import type { Game } from 'classes/Game';

export interface GameBoardProps {
    game: Game;
    updateState: Dispatch<SetStateAction<string | undefined>>;
    state?: string;
    size: number;
}
