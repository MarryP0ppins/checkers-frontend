import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import LoadingButton from '@mui/lab/LoadingButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { registrationAction } from 'store/actions/registration';
import { useAppDispatch, useAppSelector } from 'store/store';
import { FetchStatus } from 'types/api';
import { UserReg } from 'types/registration';

import './RegistrationPage.scss';

const cnReg = cn('reg-page');

export const RegistrationPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { registrationStatus } = useAppSelector((store) => store.login);
    const { register, handleSubmit, reset } = useForm<UserReg>();

    const onRegistrationFormSubmit = useCallback(
        (values: UserReg) => {
            dispatch(registrationAction(values));
        },
        [dispatch],
    );

    useEffect(() => {
        switch (registrationStatus) {
            case FetchStatus.FETCHED:
                navigate('/');
                return;
            case FetchStatus.ERROR:
                reset({ password: '', password2: '' });
                return;
            default:
                return;
        }
    }, [registrationStatus, navigate, reset]);
    return (
        <div className={cnReg()}>
            <form className={cnReg('form')} onSubmit={handleSubmit(onRegistrationFormSubmit)}>
                <Paper elevation={10} className={cnReg('paper')}>
                    <h1>Регистрация</h1>
                    <TextField
                        inputProps={{ ...register('username') }}
                        InputProps={{ className: cnReg('input') }}
                        placeholder="Имя пользователя"
                        label="Имя пользователя"
                        size="small"
                        required
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        inputProps={{ ...register('email') }}
                        InputProps={{ className: cnReg('input') }}
                        placeholder="Введите почту"
                        label="Почта"
                        type="email"
                        size="small"
                        required
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        inputProps={{ ...register('password') }}
                        InputProps={{ className: cnReg('input') }}
                        placeholder="Введите пароль"
                        label="Пароль"
                        type="password"
                        size="small"
                        required
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        inputProps={{ ...register('password2') }}
                        InputProps={{ className: cnReg('input') }}
                        placeholder="Подтвердите пароль"
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
                        loading={registrationStatus === FetchStatus.FETCHING}
                        className={cnReg('submit')}
                    >
                        Зарегистрироваться
                    </LoadingButton>
                </Paper>
            </form>
        </div>
    );
};
