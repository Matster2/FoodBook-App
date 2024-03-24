import { Api } from 'src/generatedAPI';

// const api = new API.Client(import.meta.env.VITE_APP_API_URL, apiAxiosInstance);

const api = new Api({
    baseURL: import.meta.env.VITE_APP_API_URL,
    paramsSerializer: {
        indexes: null,
    },
});

export default api;