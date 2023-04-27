import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { WindowSizeContext } from 'context/WindowSizeContext';
import { useWindowSize } from 'hooks/useWindowSize';
import moment from 'moment';
import { GamePage } from 'pages/GamePage';
import { LogInPage } from 'pages/LogInPage';
import { RegistrationPage } from 'pages/RegistrationPage';
import { RulesPage } from 'pages/RulesPage';
import { UserPage } from 'pages/UserPage';
import { refreshTokensAction } from 'store/actions/login';
import { useAppDispatch, useAppSelector } from 'store/store';
import { FetchStatus } from 'types/api';

import { Header } from 'components/Header';
import { PageLoader } from 'components/PageLoader';
import { PrivateRoute } from 'components/PrivateRoute';

import 'moment-timezone';
import 'moment/locale/ru';

import 'root.scss';
import './App.css';

moment.locale('ru');
moment.tz.setDefault('Europe/Moscow');

export const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const { logoutFetchStatus } = useAppSelector((store) => store.login);
    const { width, height } = useWindowSize();

    useEffect(() => {
        void dispatch(refreshTokensAction());
    }, [dispatch]);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route
                    path="/"
                    element={
                        <>
                            <Header />
                            <div>{moment().format()}</div>
                        </>
                    }
                />
                <Route path="login" element={<LogInPage />} />
                <Route path="registration" element={<RegistrationPage />} />
                <Route
                    path="profile"
                    element={
                        <PrivateRoute>
                            <Header>
                                <UserPage />
                            </Header>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="game"
                    element={
                        <PrivateRoute>
                            <Header>
                                <GamePage />
                            </Header>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="rules"
                    element={
                        <Header>
                            <RulesPage />
                        </Header>
                    }
                />
            </>,
        ),
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <WindowSizeContext.Provider value={{ width, height }}>
                <PageLoader showLoading={logoutFetchStatus === FetchStatus.FETCHING} />
                <RouterProvider router={router} />
            </WindowSizeContext.Provider>
        </DndProvider>
    );
};
