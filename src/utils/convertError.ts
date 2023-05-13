export const convertError = (error: {
    message?: string;
}): { error?: string | null; extra?: Record<string, unknown> | null } | string => {
    if (error.message) {
        try {
            const errorData = JSON.parse(error.message) as {
                message: string;
                extra: Record<string, unknown>;
                error?: string;
            };

            let errorText = 'Ой, что-то пошло не так!';
            switch (errorData.message) {
                case 'Validation error':
                    errorText = 'Ошибка поверки данных!';
                    break;
                case 'Page not found':
                case 'Страница не найдена.':
                    errorText = 'Данные не найдены!';
                    break;
                default:
                    break;
            }
            return {
                error: errorText,
                extra: errorData.extra ?? errorData,
            };
        } catch (e) {
            return {
                error: error.message === 'Rejected' ? 'Ой, что-то пошло не так!' : error.message,
                extra: {
                    error: error.message,
                },
            };
        }
    }

    return JSON.stringify(error);
};
