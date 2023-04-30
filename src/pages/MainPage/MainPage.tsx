import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import Button from '@mui/material/Button';
import { BoardImage } from 'assets';
import { useWindowSizeContext } from 'context/WindowSizeContext';
import { useAppSelector } from 'store/store';
import { FetchStatus } from 'types/api';

import './MainPage.scss';

const cnMain = cn('main-page');

export const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const { height } = useWindowSizeContext();
    const { isLoggedIn, logoutFetchStatus } = useAppSelector((store) => store.login);

    const navigateToRulePage = useCallback(() => {
        navigate('/rules');
    }, [navigate]);

    const navigateToRatingPage = useCallback(() => {
        navigate('/rating');
    }, [navigate]);

    const navigateToGameListPage = useCallback(() => {
        navigate('/gameList');
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
