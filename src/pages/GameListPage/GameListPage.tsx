import React, { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { socket } from 'api';
import { ArrowLeftIcon } from 'assets';
import { useLoader } from 'hooks';
import { GameListData } from 'pages/GameListPage/GameListPage.types';
import { getUserProfileAction } from 'store/actions/user';
import { useAppDispatch, useAppSelector } from 'store/store';
import { FetchStatus } from 'types/api';

import { PageLoader } from 'components/PageLoader';

import './GameListPage.scss';

const cnGameList = cn('gameList-page');

const startGameData: GameListData[] = [];

export const GameListPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { user, fetchUserProfileStatus } = useAppSelector((store) => store.user);
    const { openGames } = useAppSelector((store) => store.game);

    useLoader([fetchUserProfileStatus]);

    useEffect(() => {
        if (fetchUserProfileStatus === FetchStatus.INITIAL) {
            dispatch(getUserProfileAction());
        }
    }, [dispatch, fetchUserProfileStatus, user]);

    const onReturnButtonClick = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const createGameButtonClick = useCallback(() => {
        if (user) {
            socket.emit(
                'createGameRequest',
                {
                    userId: user.id,
                    username: user.username,
                    rating: user.profile.rating,
                }
            );
        }
    }, [user]);

    const connectToGame = useCallback(
        (socketId: string) => () => {
            socket.emit('joinGame', socketId);
        },
        [],
    );

    const renderCreateGamesGridCell = useCallback(
        (props: GridRenderCellParams) => {
            const rowData = props.row as GameListData;
            return (
                <Button
                    sx={{ backgroundColor: '#fff' }}
                    color="inherit"
                    size="large"
                    variant="contained"
                    onClick={connectToGame(rowData.socketId)}
                    disabled={startGameData.length > 0}
                >
                    Присоединиться
                </Button>
            );
        },
        [connectToGame],
    );

    const createdGamesColumns = useMemo<GridColDef[]>(
        () => [
            {
                field: 'username',
                headerName: 'Игрок',
                cellClassName: cnGameList('dataGrid-cell'),
                headerClassName: cnGameList('dataGrid-cell'),
                width: 180,
            },
            {
                field: 'rating',
                headerName: 'Рейтинг',
                cellClassName: cnGameList('dataGrid-cell'),
                headerClassName: cnGameList('dataGrid-cell'),
                align: 'left',
                headerAlign: 'left',
                type: 'number',
                width: 180,
            },
            {
                field: '',
                headerName: '',
                renderCell: renderCreateGamesGridCell,
                width: 180,
                disableColumnMenu: true,
                sortable: false,
            },
        ],
        [renderCreateGamesGridCell],
    );

    return (
        <div className={`layout ${cnGameList()}`}>
            <PageLoader />
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
                    disabled={startGameData.length > 0}
                >
                    Создать игру
                </Button>
            </div>
            <div className={cnGameList('main-title')}>Доступные игры</div>
            <Paper sx={{ width: 'min-content', overflow: 'hidden', height: 400, minHeight: 400, position: 'relative' }}>
                <DataGrid
                    columns={createdGamesColumns}
                    rows={openGames}
                    disableColumnSelector
                    hideFooterPagination
                    disableRowSelectionOnClick
                    hideFooter
                />
            </Paper>
        </div>
    );
};
