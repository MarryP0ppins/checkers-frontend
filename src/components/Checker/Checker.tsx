import React, { useCallback } from 'react';
import { useDrag } from 'react-dnd';
import { cn } from '@bem-react/classname';
import { CheckerBlackIcon, CheckerCrownIcon, CheckerWhiteIcon } from 'assets';
import { CheckerColor } from 'classes/Game/game.types';
import { ItemTypes } from 'types/game';

import { CheckerProps } from './Checker.types';

import './Checker.scss';

const cnChecker = cn('checker');

export const Checker: React.FC<CheckerProps> = ({ game, ...props }) => {
    const canDragHandle = useCallback(() => {
        const activeCheckerCheck = !game.activeChecker() || game.activeChecker() === props.id;
        const colorCheck = props.color === game.playerColor();
        const canMoveOneMoreTime = game.canDoOneMoreStep();
        const hasPossibleMoves = game.hasPossibleMoves();
        return colorCheck && activeCheckerCheck && canMoveOneMoreTime && hasPossibleMoves;
    }, [game, props.color, props.id]);

    const [{ canDrag }, drag] = useDrag(
        () => ({
            type: ItemTypes.CHECKER,
            item: { ...props },
            canDrag: canDragHandle,
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
                canDrag: !!monitor.canDrag(),
            }),
        }),
        [props, game],
    );

    return (
        <div ref={drag} className={cnChecker({ canDrag })}>
            {props.color === CheckerColor.BLACK ? (
                <CheckerBlackIcon width={'100%'} height={'100%'} />
            ) : (
                <CheckerWhiteIcon width={'100%'} height={'100%'} />
            )}
            {props.isKing && <CheckerCrownIcon width={'86%'} height={'86%'} className={cnChecker('crown')} />}
        </div>
    );
};
