import { WinnerStatus } from 'types/game';
interface pointsEarnedProps {
    userOnePoints: number;
    userOneGames: number;
    userTwoPoints: number;
    userTwoGames: number;
    winner: WinnerStatus;
}

const coef = (points: number, games: number): number => {
    switch (true) {
        case games < 30:
            return 40;
        case points < 2400:
            return 20;
        default:
            return 10;
    }
};

const S = (winner: WinnerStatus, isUserOne: boolean): number => {
    if (winner === WinnerStatus.USER_1) {
        return isUserOne ? 1 : 0;
    }
    if (winner === WinnerStatus.USER_2) {
        return !isUserOne ? 1 : 0;
    }
    return 0.5;
};

export const pointsEarned = (props: pointsEarnedProps): { userOneEarned: number; userTwoEarned: number } => {
    const { userOnePoints, userOneGames, userTwoPoints, userTwoGames, winner } = props;

    const Ea = 1 / (1 + Math.pow(10, (userTwoPoints - userOnePoints) / 400));
    const Eb = 1 / (1 + Math.pow(10, (userOnePoints - userTwoPoints) / 400));
    console.log(coef(userOnePoints, userOneGames) * (S(winner, true) - Ea));
    console.log(coef(userTwoPoints, userTwoGames) * (S(winner, false) - Eb));
    const userOneEarned = Number(userOnePoints) + coef(userOnePoints, userOneGames) * (S(winner, true) - Ea);
    const userTwoEarned = Number(userTwoPoints) + coef(userTwoPoints, userTwoGames) * (S(winner, false) - Eb);
    console.log(userOneEarned, userTwoEarned);
    return {
        userOneEarned: Number(Number(userOneEarned).toFixed(2)),
        userTwoEarned: Number(Number(userTwoEarned).toFixed(2)),
    };
};
