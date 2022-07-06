import { GOOGLE_API_KEY } from '../settings';
import axios from 'axios';

import { API_URL } from '~/src/settings';

const $api = axios.create({
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    config.params = { ...config.params, key: GOOGLE_API_KEY };

    return config;
});

export default $api;
