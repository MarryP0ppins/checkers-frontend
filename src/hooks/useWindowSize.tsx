import { useCallback, useEffect, useState } from 'react';

export const useWindowSize = (): { width: number; height: number } => {
    const [windowSize, setWindowSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
    });

    const changeWindowSize = useCallback(() => {
        setWindowSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        });
    }, []);

    useEffect(() => {
        window.addEventListener('resize', changeWindowSize);

        return () => {
            window.removeEventListener('resize', changeWindowSize);
        };
    }, [changeWindowSize]);

    return windowSize;
};
