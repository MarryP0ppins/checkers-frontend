import React from 'react';

import { Alert } from 'components/Alert';
import { Header } from 'components/Header';
import { PrivateRoute } from 'components/PrivateRoute';

import { RouteComponentProps } from './RouteComponent.types';

export const RouteComponent: React.FC<RouteComponentProps> = ({ page, privateRoute, withHeader }) => {
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
