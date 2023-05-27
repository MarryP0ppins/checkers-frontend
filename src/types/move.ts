export interface MovesResponse {
    id: number;
    game: number;
    user: number;
    checker_id: number;
    new_positions: string[];
    is_dead: boolean;
    is_white: boolean;
    is_king: boolean;
    is_last_move: boolean;
}
