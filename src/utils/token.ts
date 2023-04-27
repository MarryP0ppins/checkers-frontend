export const getAccessToken = (): string => (localStorage.getItem('access') as string) || '';
export const getRefreshToken = (): string => (localStorage.getItem('refresh') as string) || '';
