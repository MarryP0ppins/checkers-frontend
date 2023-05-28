import { GamesResponse, UserGamesData, WinnerStatus } from 'types/game';
import { UserResponse } from 'types/user';

export const normalizeUserGames = (games: GamesResponse[], user: UserResponse): UserGamesData[] => {
    const tmp: UserGamesData[] = [];
    games.forEach((game) => {
        const playerIsUser1 = game.user_1_info.username === user?.username;
        tmp.push({
            id: game.id,
            date: new Date(game.start_at),
            white: game.user_1_info.username,
            black: game.user_2_info.username,
            result: game.winner
                ? game.winner === WinnerStatus.DRAW
                    ? 'Ничья'
                    : playerIsUser1 === (game.winner === WinnerStatus.USER_1)
                    ? 'Победа'
                    : 'Поражение'
                : '-',
            rating: playerIsUser1 ? game.user_1_points ?? -1 : game.user_2_points ?? -1,
        });
    });
    return tmp;
};
