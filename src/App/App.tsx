import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import moment from 'moment';
import { refreshTokensAction } from 'store/actions/login';
import { useAppDispatch } from 'store/store';

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

    return <DndProvider backend={HTML5Backend}>
        <div>{moment().format()}</div>
    </DndProvider>;
};
