import { ReactNode } from 'react';

export interface RouteComponentProps {
    privateRoute?: boolean;
    withHeader?: boolean;
    page: ReactNode;
}
