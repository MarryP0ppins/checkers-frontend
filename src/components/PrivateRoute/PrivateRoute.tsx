import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAppSelector } from 'store/store';

import { PageLoader } from 'components/PageLoader';

export const PrivateRoute: React.FC<{ children: React.ReactNode; path: string }> = ({
    children,
    path,
}) => {
    const { isLoggedIn } = useAppSelector((state) => state.login);

    if (isLoggedIn === false) {
        return <Navigate to="/login" />;
    }

    if (isLoggedIn === undefined) {
        return <PageLoader showLoading={true} />;
    }

    return <Route path={path}>{children}</Route>;
};
