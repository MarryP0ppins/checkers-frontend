import { Dispatch, ReactNode, SetStateAction } from 'react';
import type { Game } from 'classes/Game';
import { EnemyProfile } from 'types/game';
import { UserResponse } from 'types/user';

export interface BoardSquareProps {
    children?: ReactNode;
    x: number;
    y: number;
    game: Game;
    index: number;
    user: UserResponse;
    enemy: EnemyProfile;
    updateState: Dispatch<SetStateAction<string | undefined>>;
}
