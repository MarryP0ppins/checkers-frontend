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
import { setGameId } from 'store/reducers/game';
import { store, useAppDispatch, useAppSelector } from 'store/store';
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
                },
                ({ gameId }) => console.log(gameId),
            );
        }
    }, [user]);

    const connectToGame = useCallback(
        (tabIndex: number) => () => {
            store.dispatch(setGameId(tabIndex));
            socket.emit('joinGame', {
                gameId: tabIndex,
            });
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
                    onClick={connectToGame(rowData.id)}
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

    const renderStartGameGridCell = useCallback(
        (props: GridRenderCellParams) => {
            const rowData = props.row as GameListData;
            return (
                <Button
                    sx={{ backgroundColor: '#fff' }}
                    color="inherit"
                    size="large"
                    variant="contained"
                    onClick={connectToGame(rowData.id)}
                >
                    Присоединиться
                </Button>
            );
        },
        [connectToGame],
    );

    const startedGameColumns = useMemo<GridColDef[]>(
        () => [
            {
                field: 'username',
                headerName: 'Игрок',
                cellClassName: cnGameList('dataGrid-cell'),
                headerClassName: cnGameList('dataGrid-cell'),
                sortable: false,
                width: 180,
            },
            {
                field: 'rating',
                headerName: 'Рейтинг',
                cellClassName: cnGameList('dataGrid-cell'),
                headerClassName: cnGameList('dataGrid-cell'),
                sortable: false,
                align: 'left',
                headerAlign: 'left',
                type: 'number',
                width: 180,
            },
            {
                field: '',
                headerName: '',
                renderCell: renderStartGameGridCell,
                width: 180,
                disableColumnMenu: true,
                sortable: false,
            },
        ],
        [renderStartGameGridCell],
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
            {Boolean(startGameData.length) && (
                <>
                    <div className={cnGameList('main-title')}>Начатая игра</div>
                    <Paper
                        sx={{
                            width: 'min-content',
                            overflow: 'hidden',
                            minHeight: 110,
                            height: 110,
                            position: 'relative',
                        }}
                    >
                        <DataGrid
                            columns={startedGameColumns}
                            rows={startGameData}
                            disableColumnMenu
                            disableColumnFilter
                            disableColumnSelector
                            hideFooterPagination
                            disableRowSelectionOnClick
                            hideFooter
                        />
                    </Paper>
                </>
            )}
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
