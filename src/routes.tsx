import { BASE_URL } from './settings';

const addRootPath = (url: string) => `${BASE_URL}${url}`;

export const getMainPath = addRootPath('');

export const getBookPath = addRootPath('Book/:id');
export const getBookParamPath = (id: string) => addRootPath(`Book/${id}`);
