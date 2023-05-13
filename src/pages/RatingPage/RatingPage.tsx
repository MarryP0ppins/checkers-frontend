import React, { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ArrowLeftIcon } from 'assets';
import { useLoader } from 'hooks';
import { getProfileAction } from 'store/actions/profile';
import { resetProfileState } from 'store/reducers/profile';
import { useAppDispatch, useAppSelector } from 'store/store';
import { FetchStatus } from 'types/api';

import { PageLoader } from 'components/PageLoader';

import './RatingPage.scss';

const cnRating = cn('rating-page');

export const RatingPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { profiles, fetchProfileStatus } = useAppSelector((store) => store.profile);

    useEffect(() => {
        if (fetchProfileStatus === FetchStatus.INITIAL) {
            dispatch(getProfileAction());
        }
    }, [dispatch, fetchProfileStatus]);

    useLoader([fetchProfileStatus]);

    const columns = useMemo<GridColDef[]>(
        () => [
            {
                field: 'rating',
                headerName: 'Рейтинг',
                headerAlign: 'left',
                align: 'left',
                hideable: false,
                type: 'number',
                width: 160,
            },
            { field: 'username', headerName: 'Игрок', hideable: false, sortable: false, width: 160 },
            {
                field: 'wins',
                headerName: 'Победы',
                headerAlign: 'left',
                align: 'left',
                hideable: false,
                type: 'number',
                width: 160,
            },
            {
                field: 'games',
                headerName: 'Игры',
                headerAlign: 'left',
                align: 'left',
                hideable: false,
                type: 'number',
                width: 160,
            },
        ],
        [],
    );

    const onReturnButtonClick = useCallback(() => {
        navigate('/');
    }, [navigate]);

    useEffect(
        () => () => {
            dispatch(resetProfileState());
        },
        [dispatch],
    );

    return (
        <div className={`layout ${cnRating()}`}>
            <div className={cnRating('back-button')}>
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
            <div className={cnRating('main-title')}>Рейтинг игроков</div>
            <Paper sx={{ width: 650, overflow: 'hidden', height: 500, position: 'relative' }}>
                <PageLoader />
                <DataGrid
                    columns={columns}
                    rows={profiles}
                    disableColumnSelector
                    rowSelection={false}
                    sx={{ fontSize: 20 }}
                />
            </Paper>
        </div>
    );
};
