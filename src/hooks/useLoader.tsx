import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loaded, loading } from 'store/reducers/loader';
import { FetchStatus } from 'types/api';

export const useLoader = (statuses: FetchStatus[]): void => {
    const dispatch = useDispatch();

    useEffect(() => {
        const isFetching = statuses.reduce((result, status) => {
            return result || status === FetchStatus.FETCHING;
        }, false);

        if (isFetching) {
            dispatch(loading());
        } else {
            dispatch(loaded());
        }
    }, [statuses, dispatch]);
};
