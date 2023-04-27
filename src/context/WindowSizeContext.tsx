import { createContext, useContext } from 'react';

export const WindowSizeContext = createContext({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
});

export function useWindowSizeContext(): { width: number; height: number } {
    return useContext(WindowSizeContext);
}
