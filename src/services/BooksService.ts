import qs from 'query-string';
import $api from '~/src/http';

import { API_URL, PAGINATION_COUNT } from '~/src/settings';

const settings = {
    maxResults: PAGINATION_COUNT,
};

export default class BooksService {
    static async getBookByLink(id: string) {
        return $api.get(`${API_URL}/${id}`);
    }

    static async getBooksByLink(params: object) {
        return $api.get(
            `${API_URL}?${qs.stringify({ ...params, ...settings })}`,
        );
    }
}
