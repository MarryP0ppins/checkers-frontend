import { CheckerColor, CheckerProperty, PossibleMove } from 'classes/Game/game.types';

export class Game {
    private checkersProperties: CheckerProperty[] = [
        { id: 0, x: 0, y: 0, death: false, isKing: false, color: CheckerColor.WHITE },
        { id: 1, x: 2, y: 0, death: false, isKing: false, color: CheckerColor.WHITE },
        { id: 2, x: 4, y: 0, death: false, isKing: false, color: CheckerColor.WHITE },
        { id: 3, x: 6, y: 0, death: false, isKing: false, color: CheckerColor.WHITE },
        { id: 4, x: 1, y: 1, death: false, isKing: false, color: CheckerColor.WHITE },
        { id: 5, x: 3, y: 1, death: false, isKing: false, color: CheckerColor.WHITE },
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
    private playerCheckersColor: CheckerColor = CheckerColor.WHITE;
    private possibleMoves: PossibleMove[] = [];
    private activeCheckerId: number | undefined;
    private activeCheckerMoves: string[] = [];
    private canMoveOneMoreTime = true;

    constructor(playerCheckersColor: CheckerColor, checkersProperties?: CheckerProperty[]) {
        if (checkersProperties) {
            this.checkersProperties = checkersProperties.sort((a, b) => b.id - a.id);
        }
        this.playerCheckersColor = playerCheckersColor;
        this.findAllPossibleMoves();
    }

    public setup(checkersProperties?: CheckerProperty[]): void {
        if (checkersProperties) {
            this.checkersProperties = checkersProperties.sort((a, b) => b.id - a.id);
        }
    }

    public playerColor(): CheckerColor {
        return this.playerCheckersColor;
    }

    public activeChecker(): number | undefined {
        return this.activeCheckerId;
    }

    public canDoOneMoreStep(): boolean {
        return this.canMoveOneMoreTime;
    }

    public hasPossibleMoves(): boolean {
        return this.possibleMoves.length > 0;
    }
    /**
     * Для обновления состояния игры после хода соперника
     */
    public playerTurn(): void {
        this.activeCheckerId = undefined;
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
                                (ckr) => ckr.x === x && ckr.y === y && !ckr.death,
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
                                !this.activeCheckerId
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

    public canMoveHere(checkerProperty: CheckerProperty, toX: number, toY: number): boolean {
        return this.possibleMoves.some(
            (move) => move.checkerId === checkerProperty.id && move.toX === toX && move.toY === toY,
        );
    }

    public killChecker(checkerId: number, toX: number, toY: number): void {
        this.canMoveOneMoreTime = false;
        const checkerProperty = this.checkersProperties.find((checker) => checker.id === checkerId);
        if (!checkerProperty) return;
        const k = (toY - checkerProperty.y) / (toX - checkerProperty.x);
        const b = checkerProperty.y - k * checkerProperty.x;
        for (let x = Math.min(checkerProperty.x, toX) + 1; x < Math.max(checkerProperty.x, toX); x++) {
            const checker = this.checkersProperties.find(
                (checker) => checker.x === x && checker.y === k * x + b && !checker.death,
            );
            if (checker) {
                this.checkersProperties[checker.id].death = true;
                this.canMoveOneMoreTime = true;
                break;
            }
        }
    }

    public moveChecker(checkerId: number, toX: number, toY: number): void {
        const checker = this.checkersProperties.find((checker) => checker.id === checkerId);
        if (checker) {
            this.checkersProperties[checker.id].x = toX;
            this.checkersProperties[checker.id].y = toY;
            if (toY === (checker.color === CheckerColor.WHITE ? 7 : 0)) {
                this.checkersProperties[checker.id].isKing = true;
            }
        }
        if (!this.activeCheckerId) this.activeCheckerId = checkerId;
        this.activeCheckerMoves.push(`${String.fromCharCode(toY + 97)}${toY + 1}`);
        this.findAllPossibleMoves();
    }

    public isSomeOneHere(x: number, y: number): CheckerProperty | undefined {
        return this.checkersProperties.find((checker) => checker.x === x && checker.y === y && !checker.death);
    }
}
