import type { Game } from 'classes/Game';
import { CheckerColor } from 'classes/Game/game.types';

export interface CheckerProps {
    id: number;
    isKing: boolean;
    color: CheckerColor;
    game: Game;
}
