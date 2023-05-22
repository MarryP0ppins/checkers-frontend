import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import Button from '@mui/material/Button';
import { CloseIcon } from 'assets';
import { useErrorProcess } from 'hooks';
import { clearError } from 'store/reducers/error';
import { useAppDispatch, useAppSelector } from 'store/store';

import './Alert.scss';

const CnAlert = cn('alert');
const CnButton = cn('button');

export const Alert: React.FC = () => {
    const {
        error: errorTitle,
        extra,
        isFrontend,
        customDescription,
        notAuth,
        needHideButton,
        actionButtonClick,
        cancelButtonClick,
    } = useAppSelector((store) => store.error);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useErrorProcess(errorTitle);

    const handleActionButtonClick = useCallback(() => {
        dispatch(clearError());
        if (actionButtonClick) {
            return actionButtonClick();
        }

        if (isFrontend) {
            return navigate(-1);
        }
    }, [actionButtonClick, dispatch, isFrontend, navigate]);

    const handleModalClose = useCallback(() => {
        dispatch(clearError());

        if (cancelButtonClick) {
            return cancelButtonClick();
        }

        if (isFrontend) {
            navigate(-1);
        }
    }, [cancelButtonClick, dispatch, isFrontend, navigate]);

    const extraInfo = useMemo(() => (extra ? JSON.stringify(extra, null, 2) : undefined), [extra]);

    const actionText = useMemo(() => {
        switch (true) {
            case notAuth:
                return 'Авторизоваться';
            default:
                return 'Закрыть';
        }
    }, [notAuth]);

    return (
        <>
            {errorTitle && (
                <div className={CnAlert()}>
                    <div className={CnAlert('window')}>
                        <div className={CnAlert('info')}>{errorTitle}</div>
                        {customDescription && customDescription.length > 0 && (
                            <div className={CnAlert('descriptions-wrapper')}>{customDescription}</div>
                        )}
                        {extraInfo && !customDescription && (
                            <React.Fragment key={'extra'}>
                                <div className={CnAlert('extra-label')}>Подробнее:</div>
                                <div className={CnAlert('extra-wrapper')}>
                                    <pre className={CnAlert('extra')}>{extraInfo}</pre>
                                </div>
                            </React.Fragment>
                        )}
                        {!needHideButton && (
                            <div className={CnAlert('buttons')}>
                                <Button
                                    color="primary"
                                    size="medium"
                                    onClick={handleActionButtonClick}
                                    className={CnButton('action-button')}
                                >
                                    {actionText}
                                </Button>
                            </div>
                        )}
                        <button className={CnAlert('close-button')} onClick={handleModalClose}>
                            <CloseIcon height={30} width={30} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
