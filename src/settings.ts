export const BASE_URL =
    process.env.NODE_ENV !== 'production' || !process.env.NODE_ENV
        ? '/'
        : '/Future-ts-project/';

export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export const API_URL = 'https://www.googleapis.com/books/v1/volumes';

export const PAGINATION_COUNT = 30;
