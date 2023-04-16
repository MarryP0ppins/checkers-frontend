import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import LoadingButton from '@mui/lab/LoadingButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { fetchLogin } from 'store/actions/login';
import { useAppDispatch, useAppSelector } from 'store/store';
import { FetchStatus } from 'types/api';
import { AuthUser } from 'types/singin';

import './LogInPage.scss';

const cnLogIn = cn('login-page');

export const LogInPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { fetchStatus } = useAppSelector((store) => store.login);
    const { register, handleSubmit, reset } = useForm<AuthUser>();

    const onSigInFormSubmit = useCallback(
        (values: AuthUser) => {
            dispatch(fetchLogin(values));
            reset({ password: '' });
        },
        [dispatch, reset],
    );

    if (fetchStatus === FetchStatus.FETCHED) {
        return <Navigate to="/" />;
    }

    return (
        <div className={cnLogIn()}>
            <form className={cnLogIn('form')} onSubmit={handleSubmit(onSigInFormSubmit)}>
                <Paper elevation={10} className={cnLogIn('paper')}>
                    <h1>Авторизация</h1>
                    <TextField
                        inputProps={{ ...register('email') }}
                        InputProps={{ className: cnLogIn('input') }}
                        placeholder="почта"
                        label="Почта"
                        type="email"
                        size="small"
                        required
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        inputProps={{ ...register('password') }}
                        InputProps={{ className: cnLogIn('input') }}
                        placeholder="пароль"
                        label="Пароль"
                        type="password"
                        size="small"
                        required
                        margin="normal"
                        fullWidth
                    />
                    <LoadingButton
                        type="submit"
                        color="primary"
                        variant="outlined"
                        size="large"
                        fullWidth
                        loadingPosition="start"
                        loading={fetchStatus === FetchStatus.FETCHING}
                        className={cnLogIn('submit')}
                    >
                        Войти
                    </LoadingButton>
                </Paper>
            </form>
        </div>
    );
};
