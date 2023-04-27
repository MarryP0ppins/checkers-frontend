import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { LogoIcon, LogoutIcon } from 'assets';
import { fetchLogout } from 'store/actions/logout';
import { useAppDispatch, useAppSelector } from 'store/store';
import { FetchStatus } from 'types/api';

import { HeaderProps } from './Header.types';

import './Header.scss';

const cnHeader = cn('header');

export const Header: React.FC<HeaderProps> = ({ children }) => {
    const dispatch = useAppDispatch();
    const { isLoggedIn, fetchStatus, logoutFetchStatus } = useAppSelector((store) => store.login);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleProfile = useCallback(() => {
        navigate('/profile');
    }, [navigate]);

    const handleLogin = useCallback(() => {
        navigate('/login');
    }, [navigate]);

    const handleHome = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const handleLogout = useCallback(() => {
        setAnchorEl(null);
        dispatch(fetchLogout());
        navigate('/');
    }, [dispatch, navigate]);

    return (
        <>
            <div className={cnHeader()}>
                <div className={cnHeader('left')}>
                    <LogoIcon onClick={handleHome} style={{ cursor: 'pointer' }} />
                    <h1>Шашки Онлайн</h1>
                </div>
                <Stack spacing={2} direction={'row'} className={cnHeader('right')}>
                    {isLoggedIn ? (
                        <>
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                disabled={logoutFetchStatus === FetchStatus.FETCHING}
                            >
                                <Avatar sx={{ width: 32, height: 32 }} />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={handleProfile}>
                                    <Avatar sx={{ width: 32, height: 32, ml: -0.5, mr: 1 }} /> Профиль
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <LogoutIcon width={20} height={20} fill="#0000008a" />
                                    </ListItemIcon>
                                    Выход
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Button
                            variant="outlined"
                            color="inherit"
                            size="large"
                            onClick={handleLogin}
                            disabled={fetchStatus === FetchStatus.FETCHING}
                        >
                            Авторизация
                        </Button>
                    )}
                </Stack>
            </div>
            {children}
        </>
    );
};
