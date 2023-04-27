//import moment from 'moment';
import { GamesResponse, UserGamesData } from 'types/game';
import { UserResponse } from 'types/user';

export const normalizeUserGames = (games: GamesResponse[], user: UserResponse): UserGamesData[] => {
    const tmp: UserGamesData[] = [];
    games.forEach((game) => {
        const playerIsUser1 = game.user_1.username === user?.username;
        tmp.push({
            id: game.id,
            date: new Date(game.start_at),
            white: game.user_1.username,
            black: game.user_2.username,
            result: playerIsUser1
                ? game.user_1_win
                    ? 'Победа'
                    : 'Поражение'
                : !game.user_1_win
                ? 'Поражение'
                : 'Победа',
            rating: playerIsUser1 ? game.user_1_points : game.user_2_points,
        });
    });
    return tmp;
};
