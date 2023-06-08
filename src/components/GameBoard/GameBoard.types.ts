import { Dispatch, SetStateAction } from 'react';
import type { Game } from 'classes/Game';
import { EnemyProfile } from 'types/game';
import { UserResponse } from 'types/user';

export interface GameBoardProps {
    game: Game;
    updateState: Dispatch<SetStateAction<string | undefined>>;
    state?: string;
    size: number;
    user: UserResponse | null;
    enemy: EnemyProfile | null;
}
