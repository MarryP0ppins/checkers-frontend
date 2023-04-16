import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import moment from 'moment';
import { LogInPage } from 'pages/LogInPage';
import { refreshTokensAction } from 'store/actions/login';
import { useAppDispatch } from 'store/store';

import { Header } from 'components/Header';

//import { PrivateRoute } from 'components/PrivateRoute';
import 'moment-timezone';
import 'moment/locale/ru';

import 'root.scss';
import './App.css';

moment.locale('ru');
moment.tz.setDefault('Europe/Moscow');

export const App: React.FC = () => {
    const dispatch = useAppDispatch();

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
            </>,
        ),
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <RouterProvider router={router} />
        </DndProvider>
    );
};
