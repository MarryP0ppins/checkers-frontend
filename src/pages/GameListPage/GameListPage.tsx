import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import Button from '@mui/material/Button';
import { ArrowLeftIcon } from 'assets';

import './GameListPage.scss';

const cnGameList = cn('gameList-page');

export const GameListPage: React.FC = () => {
    const navigate = useNavigate();

    const onReturnButtonClick = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const createGameButtonClick = useCallback(() => {
        alert('create game');
    }, []);

    return (
        <div className={`layout ${cnGameList()}`}>
            <div className={cnGameList('buttons')}>
                <Button
                    startIcon={<ArrowLeftIcon height={12} width={12} />}
                    color="inherit"
                    size="large"
                    variant="outlined"
                    onClick={onReturnButtonClick}
                >
                    Назад
                </Button>
                <Button
                    sx={{ backgroundColor: '#fff' }}
                    color="inherit"
                    size="large"
                    variant="contained"
                    onClick={createGameButtonClick}
                >
                    Создать игру
                </Button>
            </div>
            <div className={cnGameList('main-title')}>Доступные игры</div>
        </div>
    );
};
