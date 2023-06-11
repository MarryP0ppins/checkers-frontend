import React, { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ArrowLeftIcon } from 'assets';
import { useLoader } from 'hooks';
import { getUserGamesAction } from 'store/actions/game';
import { getUserProfileAction } from 'store/actions/user';
import { normalizeUserGames } from 'store/normalizers/game';
import { resetGameState } from 'store/reducers/game';
import { resetUserState } from 'store/reducers/user';
import { useAppDispatch, useAppSelector } from 'store/store';
import { FetchStatus } from 'types/api';

import { PageLoader } from 'components/PageLoader';

import './UserPage.scss';

const cnProfile = cn('profile-page');

export const UserPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user, fetchUserProfileStatus } = useAppSelector((store) => store.user);
    const { userGames, fetchUserGamesStatus } = useAppSelector((store) => store.game);

    useLoader([fetchUserProfileStatus, fetchUserGamesStatus]);

    useEffect(() => {
        if (fetchUserProfileStatus === FetchStatus.INITIAL) dispatch(getUserProfileAction());
    }, [dispatch, fetchUserProfileStatus]);

    useEffect(() => {
        if (user && fetchUserGamesStatus === FetchStatus.INITIAL) {
            dispatch(getUserGamesAction(user?.username));
        }
    }, [dispatch, fetchUserGamesStatus, user]);

    const navigate = useNavigate();
    const onReturnButtonClick = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const normalizedUserGames = useMemo(() => {
        return user ? normalizeUserGames(userGames, user) : [];
    }, [user, userGames]);

    const columns = useMemo<GridColDef[]>(
        () => [
            { field: 'date', headerName: 'Дата', hideable: false, type: 'date', width: 105 },
            { field: 'white', headerName: 'Белые', hideable: false, sortable: false, width: 120 },
            { field: 'black', headerName: 'Черные', hideable: false, sortable: false, width: 120 },
            { field: 'result', headerName: 'Результат', hideable: false, width: 135 },
            {
                field: 'rating',
                headerName: 'Рейтинг',
                type: 'number',
                headerAlign: 'left',
                align: 'left',
                hideable: false,
                width: 125,
            },
        ],
        [],
    );

    useEffect(
        () => () => {
            dispatch(resetGameState());
            dispatch(resetUserState());
        },
        [dispatch],
    );

    return (
        <div className={`layout ${cnProfile()}`}>
            <div className={cnProfile('back-button')}>
                <Button
                    startIcon={<ArrowLeftIcon height={12} width={12} />}
                    color="inherit"
                    size="large"
                    variant="outlined"
                    onClick={onReturnButtonClick}
                >
                    Назад
                </Button>
            </div>
            <div className={cnProfile('main-title')}>Личный кабинет</div>
            <div className={cnProfile('stats')}>
                <div>{`Кол-во побед: ${user?.profile.wins ?? '-'}`}</div>
                <div>{`Кол-во игр: ${user?.profile.games ?? '-'}`}</div>
                <div>{`Очков рейтинга: ${user?.profile.rating ?? '-'}`}</div>
            </div>
            <Paper sx={{ width: 'min-content', overflow: 'hidden', height: 400, position: 'relative' }}>
                <PageLoader />
                <DataGrid columns={columns} rows={normalizedUserGames} disableColumnSelector hideFooterPagination />
            </Paper>
        </div>
    );
};
