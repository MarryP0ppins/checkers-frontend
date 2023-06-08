import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from 'store/store';

import { PageLoader } from 'components/PageLoader';

export const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isLoggedIn } = useAppSelector((state) => state.login);
    const { currentGame } = useAppSelector((state) => state.game);
    const location = useLocation();

    if (isLoggedIn === false) {
        return <Navigate to="/login" />;
    }

    if (isLoggedIn === undefined) {
        return <PageLoader showLoading={true} />;
    }

    if (location.pathname === '/game' && !currentGame) {
        return <Navigate to="/" />;
    }
    return <>{children}</>;
};
