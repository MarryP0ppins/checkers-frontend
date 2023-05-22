import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { error } from 'store/reducers/error';
import { useAppDispatch } from 'store/store';

import { Alert } from 'components/Alert';
import { Header } from 'components/Header';
import { PrivateRoute } from 'components/PrivateRoute';

import { RouteComponentProps } from './RouteComponent.types';

export const RouteComponent: React.FC<RouteComponentProps> = ({ page, privateRoute, withHeader, hasCurrentGame }) => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handlerActionButtonClick = useCallback(() => navigate('/game'), [navigate]);
    useEffect(() => {
        if (hasCurrentGame && location.pathname !== '/game') {
            dispatch(
                error({
                    message: 'Предупреждение!',
                    extra: {
                        customDescription: 'У вас есть начатая игра!',
                    },
                    actionButtonClick: handlerActionButtonClick,
                }),
            );
        }
    }, [dispatch, handlerActionButtonClick, hasCurrentGame, location.pathname]);

    let pageComponent = (
        <>
            <Alert />
            {page}
        </>
    );
    if (withHeader) {
        pageComponent = <Header>{pageComponent}</Header>;
    }
    if (privateRoute) {
        pageComponent = <PrivateRoute>{pageComponent}</PrivateRoute>;
    }
    return <>{pageComponent}</>;
};
