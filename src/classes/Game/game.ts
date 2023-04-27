import { CheckerColor, CheckerProperty, GameConstructorProps, PossibleMove } from 'classes/Game/game.types';

export class Game {
    private checkersProperties: CheckerProperty[] = [
        { id: 0, x: 0, y: 0, death: false, isKing: false, color: CheckerColor.WHITE },
        { id: 1, x: 2, y: 0, death: false, isKing: false, color: CheckerColor.WHITE },
        { id: 2, x: 4, y: 0, death: false, isKing: false, color: CheckerColor.WHITE },
        { id: 3, x: 6, y: 0, death: false, isKing: false, color: CheckerColor.WHITE },
        { id: 4, x: 1, y: 1, death: false, isKing: false, color: CheckerColor.WHITE },
        { id: 5, x: 2, y: 4, death: false, isKing: false, color: CheckerColor.WHITE },
        { id: 6, x: 5, y: 1, death: false, isKing: false, color: CheckerColor.WHITE },
        { id: 7, x: 7, y: 1, death: false, isKing: false, color: CheckerColor.WHITE },
        { id: 8, x: 0, y: 2, death: false, isKing: false, color: CheckerColor.WHITE },
        { id: 9, x: 2, y: 2, death: false, isKing: true, color: CheckerColor.WHITE },
        { id: 10, x: 4, y: 2, death: false, isKing: false, color: CheckerColor.WHITE },
        { id: 11, x: 6, y: 2, death: false, isKing: false, color: CheckerColor.WHITE },
        { id: 12, x: 7, y: 7, death: false, isKing: false, color: CheckerColor.BLACK },
        { id: 13, x: 5, y: 7, death: false, isKing: false, color: CheckerColor.BLACK },
        { id: 14, x: 3, y: 7, death: false, isKing: true, color: CheckerColor.BLACK },
        { id: 15, x: 1, y: 7, death: false, isKing: false, color: CheckerColor.BLACK },
        { id: 16, x: 6, y: 6, death: false, isKing: false, color: CheckerColor.BLACK },
        { id: 17, x: 4, y: 6, death: false, isKing: false, color: CheckerColor.BLACK },
        { id: 18, x: 2, y: 6, death: false, isKing: false, color: CheckerColor.BLACK },
        { id: 19, x: 0, y: 6, death: false, isKing: false, color: CheckerColor.BLACK },
        { id: 20, x: 7, y: 5, death: false, isKing: false, color: CheckerColor.BLACK },
        { id: 21, x: 5, y: 5, death: false, isKing: false, color: CheckerColor.BLACK },
        { id: 22, x: 3, y: 5, death: false, isKing: false, color: CheckerColor.BLACK },
        { id: 23, x: 1, y: 5, death: false, isKing: false, color: CheckerColor.BLACK },
    ];
    private playerMoves: string[] = [];
    private enemyMoves: string[] = [];
    private playerCheckersColor: CheckerColor = CheckerColor.WHITE;
    private possibleMoves: PossibleMove[] = [];
    private activeChecker: CheckerProperty | undefined;
    private activeCheckerMoves: string[] = [];
    private canMoveOneMoreTime = true;
    private checkersToKill: number[] = [];
    private playerTurn = false;

    constructor(value: GameConstructorProps) {
        this.playerCheckersColor = value.playerCheckersColor;
        value.checkersProperties?.forEach((property) => (this.checkersProperties[property.id] = { ...property }));
        this.playerTurn = value.playerCheckersColor === CheckerColor.WHITE;
        this.findAllPossibleMoves();
    }

    public setup(checkersProperties?: CheckerProperty[]): void {
        if (checkersProperties) {
            this.checkersProperties = checkersProperties.sort((a, b) => b.id - a.id);
        }
    }

    public getPlayerColor(): CheckerColor {
        return this.playerCheckersColor;
    }

    public getActiveChecker(): CheckerProperty | undefined {
        return this.activeChecker;
    }

    public canDoOneMoreStep(): boolean {
        return this.canMoveOneMoreTime;
    }

    public hasPossibleMoves(): boolean {
        return this.possibleMoves.length > 0;
    }

    public getCountOfDeadCheckers(color: CheckerColor): number {
        return this.checkersProperties.filter((checker) => checker.color === color && checker.death).length;
    }

    public getPlayerMoves(): string[] {
        return this.playerMoves;
    }

    public getEnemyMoves(): string[] {
        return this.enemyMoves;
    }

    public isPlayerTurn(): boolean {
        return this.playerTurn;
    }

    public getActiveCheckerMoves(): string[] {
        return this.activeCheckerMoves;
    }
    /**
     * Для обновления состояния игры после хода соперника
     */
    public setPlayerTurn(activeChecker: CheckerProperty, killedCheckers: number[]): void {
        this.checkersProperties[activeChecker.id] = { ...activeChecker };
        killedCheckers.forEach((id) => (this.checkersProperties[id].death = true));
        this.activeChecker = undefined;
        this.activeCheckerMoves = [];
        this.canMoveOneMoreTime = true;
    }

    private findAllPossibleMoves(): void {
        this.possibleMoves = [];
        let possibleKills = false;
        this.checkersProperties.forEach((checker) => {
            if (checker.color === this.playerCheckersColor && !checker.death) {
                const bCoef = (k: number) => checker.y - k * checker.x;
                for (let i = 0; i < 4; i++) {
                    let hasChecker = false;
                    const coef = i % 2 === 1 ? 1 : -1;
                    const rightPart = i === 1 || i === 2;
                    const start = checker.x + (rightPart ? 1 : -1);
                    for (
                        let x = start;
                        rightPart
                            ? x <= (checker.isKing ? 7 : Math.min(7, checker.x + 2))
                            : x >= (checker.isKing ? 0 : Math.max(0, checker.x - 2));
                        x = x + (rightPart ? 1 : -1)
                    ) {
                        const y = coef * x + bCoef(coef);
                        if (y >= 0 && y <= 7) {
                            const checkerAtThisSquare = this.checkersProperties.find(
                                (ckr) =>
                                    ckr.x === x && ckr.y === y && !ckr.death && !this.checkersToKill.includes(ckr.id),
                            );
                            if (checkerAtThisSquare) {
                                if (hasChecker || checkerAtThisSquare.color === checker.color) break;
                                hasChecker = true;
                            } else if (hasChecker) {
                                if (!possibleKills) this.possibleMoves = [];
                                this.possibleMoves.push({
                                    checkerId: checker.id,
                                    toX: x,
                                    toY: y,
                                });
                                possibleKills = true;
                                if (!checker.isKing) break;
                            } else if (
                                !possibleKills &&
                                (checker.isKing
                                    ? true
                                    : checker.color === CheckerColor.WHITE
                                    ? y > checker.y
                                    : y < checker.y) &&
                                !this.activeChecker
                            ) {
                                this.possibleMoves.push({
                                    checkerId: checker.id,
                                    toX: x,
                                    toY: y,
                                });
                                if (!checker.isKing) break;
                            }
                        }
                    }
                }
            }
        });
    }

    public canDoMoveHere(checkerProperty: CheckerProperty, toX: number, toY: number): boolean {
        return this.possibleMoves.some(
            (move) => move.checkerId === checkerProperty.id && move.toX === toX && move.toY === toY,
        );
    }

    public moveAndKillChecker(checkerId: number, toX: number, toY: number): void {
        this.canMoveOneMoreTime = false;
        const checker = { ...this.checkersProperties[checkerId] };
        const k = (toY - checker.y) / (toX - checker.x);
        const b = checker.y - k * checker.x;
        for (let x = Math.min(checker.x, toX) + 1; x < Math.max(checker.x, toX); x++) {
            const checkerToKill = this.checkersProperties.find(
                (checker) => checker.x === x && checker.y === k * x + b && !checker.death,
            );
            if (checkerToKill) {
                this.checkersToKill.push(checkerToKill.id);
                this.canMoveOneMoreTime = true;
                break;
            }
        }
        this.checkersProperties[checker.id].x = toX;
        this.checkersProperties[checker.id].y = toY;
        if (toY === (checker.color === CheckerColor.WHITE ? 7 : 0)) {
            this.checkersProperties[checker.id].isKing = true;
        }
        if (!this.activeChecker) {
            this.activeChecker = { ...checker };
        }
        this.activeCheckerMoves.push(`${String.fromCharCode(toX + 97)}${toY + 1}`);
        this.findAllPossibleMoves();
        if (this.possibleMoves.length === 0) {
            this.checkersToKill.forEach((id) => (this.checkersProperties[id].death = true));
            const move = `${String.fromCharCode(this.activeChecker.x + 97)}${this.activeChecker.y + 1}${
                this.activeCheckerMoves.length > 1 ? ':' : '-'
            }${String.fromCharCode(toX + 97)}${toY + 1}`;
            this.playerMoves.push(move);
        }
    }

    public switchTurnToEnemy(): void {
        this.playerTurn = false;
        this.checkersToKill = [];
        this.activeChecker = undefined;
        this.activeCheckerMoves = [];
        this.canMoveOneMoreTime = true;
        this.checkersToKill = [];
    }

    public isSomeOneHere(x: number, y: number): CheckerProperty | undefined {
        return this.checkersProperties.find((checker) => checker.x === x && checker.y === y && !checker.death);
    }
}
