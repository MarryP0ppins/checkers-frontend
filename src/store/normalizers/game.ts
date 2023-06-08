import { GamesResponse, UserGamesData, WinnerStatus } from 'types/game';
import { UserResponse } from 'types/user';

export const normalizeUserGames = (games: GamesResponse[], user: UserResponse): UserGamesData[] => {
    const tmp: UserGamesData[] = [];
    games.forEach((game) => {
        const playerIsUser1 = game.userOneInfo.username === user?.username;
        tmp.push({
            id: game.id,
            date: new Date(game.startAt),
            white: game.userOneInfo.username,
            black: game.userTwoInfo.username,
            result: game.winner
                ? game.winner === WinnerStatus.DRAW
                    ? 'Ничья'
                    : playerIsUser1 === (game.winner === WinnerStatus.USER_1)
                    ? 'Победа'
                    : 'Поражение'
                : '-',
            rating: playerIsUser1 ? game.userOnePoints ?? -1 : game.userTwoPoints ?? -1,
        });
    });
    return tmp;
};
