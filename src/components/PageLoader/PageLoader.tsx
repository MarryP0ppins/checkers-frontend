import React, { useEffect, useState } from 'react';
import { cn } from '@bem-react/classname';
import { LogoIcon, PreloaderArrowsIcon } from 'assets';
import { useAppSelector } from 'store/store';

import './PageLoader.scss';

const CnPageLoader = cn('pageLoader');

export const PageLoader: React.FC<{ showLoading?: boolean; zIndex?: number }> = React.memo(
    ({ showLoading, zIndex }) => {
        const { isLoading } = useAppSelector((store) => store.loader);

        const [isShow, setIsShow] = useState(true);

        useEffect(() => {
            setIsShow(true);

            const setTimeoutId = setTimeout(() => {
                setIsShow(false);
            }, 1000);

            return () => {
                clearTimeout(setTimeoutId);
            };
        }, [isLoading, showLoading]);

        if (isShow || isLoading || showLoading) {
            return (
                <div className={CnPageLoader()} style={{ zIndex }}>
                    <div className={CnPageLoader('loader')}>
                        <div className={CnPageLoader('animation')}>
                            <PreloaderArrowsIcon />
                        </div>
                        <div className={CnPageLoader('logo')}>
                            <LogoIcon width={100} height={100} />
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    },
);
