import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { captureException } from '@sentry/react';

export const useErrorProcess = (error?: string | number | null): void => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (typeof error === 'string') {
            captureException(error);
        }
    }, [error, dispatch]);
};
