import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import { WindowSizeContext } from 'context/WindowSizeContext';
import { useWindowSize } from 'hooks';
import moment from 'moment';
import { GameListPage } from 'pages/GameListPage';
import { GamePage } from 'pages/GamePage';
import { LogInPage } from 'pages/LogInPage';
import { MainPage } from 'pages/MainPage';
import { RatingPage } from 'pages/RatingPage';
import { RegistrationPage } from 'pages/RegistrationPage';
import { RulesPage } from 'pages/RulesPage';
import { UserPage } from 'pages/UserPage';
import { refreshTokensAction } from 'store/actions/login';
import { useAppDispatch } from 'store/store';

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

    useEffect(() => {
        dispatch(refreshTokensAction());
    }, [dispatch]);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<RouteComponent page={<MainPage />} withHeader />} />
                <Route path="login" element={<RouteComponent page={<LogInPage />} />} />
                <Route path="registration" element={<RouteComponent page={<RegistrationPage />} />} />
                <Route path="profile" element={<RouteComponent page={<UserPage />} withHeader privateRoute />} />
                <Route path="game" element={<RouteComponent page={<GamePage />} withHeader privateRoute />} />
                <Route path="rules" element={<RouteComponent page={<RulesPage />} withHeader />} />
                <Route path="rating" element={<RouteComponent page={<RatingPage />} withHeader />} />
                <Route path="gameList" element={<RouteComponent page={<GameListPage />} withHeader privateRoute />} />
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
