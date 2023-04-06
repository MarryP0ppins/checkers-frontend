export const getAccessToken = (): string => <string>localStorage.getItem('access') || '';
export const getRefreshToken = (): string => <string>localStorage.getItem('refresh') || '';
