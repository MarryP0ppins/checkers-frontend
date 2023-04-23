import type { Game } from 'classes/Game';
import { CheckerColor } from 'classes/Game/game.types';

export interface CheckerProps {
    id: number;
    //x: number;
    //y: number;
    //death: boolean;
    isKing: boolean;
    color: CheckerColor;
    game: Game;
}
