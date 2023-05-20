import { Dispatch, SetStateAction } from 'react';
import type { Game } from 'classes/Game';
import { UserResponse } from 'types/singin';

export interface GameBoardProps {
    game: Game;
    updateState: Dispatch<SetStateAction<string | undefined>>;
    state?: string;
    size: number;
    user: UserResponse | null;
}
