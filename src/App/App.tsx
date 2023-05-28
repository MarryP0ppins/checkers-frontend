import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import { WindowSizeContext } from 'context/WindowSizeContext';
import { useLoader, useWindowSize } from 'hooks';
import moment from 'moment';
import { GameListPage } from 'pages/GameListPage';
import { GamePage } from 'pages/GamePage';
import { LogInPage } from 'pages/LogInPage';
import { MainPage } from 'pages/MainPage';
import { RatingPage } from 'pages/RatingPage';
import { RegistrationPage } from 'pages/RegistrationPage';
import { RulesPage } from 'pages/RulesPage';
import { UserPage } from 'pages/UserPage';
import { getCurrentGameAction } from 'store/actions/game';
import { refreshTokensAction } from 'store/actions/login';
import { getMovesAction } from 'store/actions/move';
import { useAppDispatch, useAppSelector } from 'store/store';
import { FetchStatus } from 'types/api';

import { RouteComponent } from 'components/RouteComponent';

import 'moment-timezone';
import 'moment/locale/ru';

import 'root.scss';
import './App.css';

moment.locale('ru');
moment.tz.setDefault('Europe/Moscow');

export const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const { width, height } = useWindowSize();
    const { user } = useAppSelector((store) => store.login);
    const { currentGame, fetchCurrentGamesStatus } = useAppSelector((store) => store.game);
    const { fetchGameMovesStatus } = useAppSelector((store) => store.move);
    useLoader([fetchCurrentGamesStatus, fetchGameMovesStatus]);

    useEffect(() => {
        dispatch(refreshTokensAction());
    }, [dispatch]);

    useEffect(() => {
        if (user && fetchCurrentGamesStatus === FetchStatus.INITIAL) {
            dispatch(getCurrentGameAction(user.username));
        }
    }, [dispatch, fetchCurrentGamesStatus, user]);

    useEffect(() => {
        if (currentGame && fetchGameMovesStatus === FetchStatus.INITIAL) {
            dispatch(getMovesAction({ game: currentGame?.id }));
        }
    }, [currentGame, dispatch, fetchGameMovesStatus]);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route
                    path="/"
                    element={<RouteComponent page={<MainPage />} hasCurrentGame={Boolean(currentGame)} withHeader />}
                />
                <Route path="login" element={<RouteComponent page={<LogInPage />} />} />
                <Route path="registration" element={<RouteComponent page={<RegistrationPage />} />} />
                <Route
                    path="profile"
                    element={
                        <RouteComponent
                            page={<UserPage />}
                            hasCurrentGame={Boolean(currentGame)}
                            withHeader
                            privateRoute
                        />
                    }
                />
                <Route path="game" element={<RouteComponent page={<GamePage />} withHeader privateRoute />} />
                <Route
                    path="rules"
                    element={<RouteComponent page={<RulesPage />} hasCurrentGame={Boolean(currentGame)} withHeader />}
                />
                <Route
                    path="rating"
                    element={<RouteComponent page={<RatingPage />} hasCurrentGame={Boolean(currentGame)} withHeader />}
                />
                <Route
                    path="game-list"
                    element={
                        <RouteComponent
                            page={<GameListPage />}
                            hasCurrentGame={Boolean(currentGame)}
                            withHeader
                            privateRoute
                        />
                    }
                />
                <Route path="*" element={<Navigate to="/" />} />
            </>,
        ),
    );
    return (
        <DndProvider backend={HTML5Backend}>
            <WindowSizeContext.Provider value={{ width, height }}>
                <RouterProvider router={router} />
            </WindowSizeContext.Provider>
        </DndProvider>
    );
};
