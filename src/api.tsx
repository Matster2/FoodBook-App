import { API } from 'src/apiClient';
import apiAxiosInstance from 'src/config/axios';

const api = new API.Client(import.meta.env.VITE_APP_API_URL, apiAxiosInstance);

export default api;