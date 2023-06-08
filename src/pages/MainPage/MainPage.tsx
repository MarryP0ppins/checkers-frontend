import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import Button from '@mui/material/Button';
import { BoardImage } from 'assets';
import { useWindowSizeContext } from 'context/WindowSizeContext';
import { error } from 'store/reducers/error';
import { useAppDispatch, useAppSelector } from 'store/store';
import { FetchStatus } from 'types/api';

import './MainPage.scss';

const cnMain = cn('main-page');

export const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { height } = useWindowSizeContext();
    const { isLoggedIn, logoutFetchStatus } = useAppSelector((store) => store.login);
    const { currentGame } = useAppSelector((store) => store.game);

    const handlerActionButtonClick = useCallback(() => navigate('/game'), [navigate]);
    useEffect(() => {
        if (currentGame) {
            dispatch(
                error({
                    message: 'Предупреждение!',
                    extra: {
                        customDescription: 'У вас есть начатая игра!',
                    },
                    actionButtonClick: handlerActionButtonClick,
                }),
            );
        }
    }, [dispatch, handlerActionButtonClick, currentGame]);

    const navigateToRulePage = useCallback(() => {
        navigate('/rules');
    }, [navigate]);

    const navigateToRatingPage = useCallback(() => {
        navigate('/rating');
    }, [navigate]);

    const navigateToGameListPage = useCallback(() => {
        navigate('/game-list');
    }, [navigate]);

    return (
        <div className={`layout ${cnMain()}`}>
            <div className={cnMain('control')}>
                <Button
                    fullWidth
                    sx={{ width: 400, height: 60, backgroundColor: '#fff' }}
                    size="large"
                    variant="contained"
                    color="inherit"
                    onClick={navigateToGameListPage}
                    disabled={!isLoggedIn || logoutFetchStatus === FetchStatus.FETCHING}
                >
                    Найти игру
                </Button>
                <Button
                    fullWidth
                    sx={{ width: 400, height: 60, backgroundColor: '#fff' }}
                    size="large"
                    variant="contained"
                    color="inherit"
                    onClick={navigateToRulePage}
                >
                    Правила игры
                </Button>
                <Button
                    fullWidth
                    sx={{ width: 400, height: 60, backgroundColor: '#fff' }}
                    size="large"
                    variant="contained"
                    color="inherit"
                    onClick={navigateToRatingPage}
                >
                    Рейтинг игроков
                </Button>
            </div>
            <img
                src={BoardImage}
                height={height - 160}
                width={height - 160}
                alt="игровая доска"
                className={cnMain('board')}
                loading="lazy"
            />
        </div>
    );
};
