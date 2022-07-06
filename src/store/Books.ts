import { BooksService } from '~/src/services';
import { makeAutoObservable } from 'mobx';

import { PAGINATION_COUNT } from '~/src/settings';

class Books {
    Books = [];
    totalItems: number | null = null;
    isLoading = false;
    searchParams = {
        q: '',
        orderBy: '',
        startIndex: 0,
    };

    constructor() {
        makeAutoObservable(this);
    }

    setNewBooks(Books: object[]) {
        this.Books.length = 0;
        this.Books.push(...(Books as []));
    }

    setTotalItems(count: number) {
        this.totalItems = count;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    clearStartIndex() {
        this.searchParams.startIndex = 0;
    }

    setSearchParams({
        string,
        category,
        sorting,
    }: {
        string: string;
        category: string;
        sorting: string;
    }) {
        this.searchParams = {
            q: `${string} ${category && 'subject:' + category}`,
            orderBy: sorting,
            startIndex: 0,
        };
    }

    addNewBooks(Books: object[]) {
        this.Books.push(...(Books as []));
    }

    updateStartIndex() {
        this.searchParams.startIndex += PAGINATION_COUNT;
    }

    clearBooks() {
        this.Books.length = 0;
    }

    async loadNewBooks() {
        this.setLoading(true);

        try {
            this.clearStartIndex();
            const { data } = await BooksService.getBooksByLink(
                this.searchParams,
            );
            if (!data) return [];

            this.setTotalItems(data.totalItems);
            this.setNewBooks(data.totalItems ? data?.items : []);
            this.updateStartIndex();

            return data;
        } finally {
            this.setLoading(false);
        }
    }

    async loadMoreBooks() {
        this.setLoading(true);

        try {
            const { data } = await BooksService.getBooksByLink(
                this.searchParams,
            );
            if (!data) return [];

            this.addNewBooks(data.totalItems ? data?.items : []);
            this.updateStartIndex();

            return data;
        } finally {
            this.setLoading(false);
        }
    }
}

export default new Books();
