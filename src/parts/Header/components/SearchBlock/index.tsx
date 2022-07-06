import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Input } from '~/src/uikit';
import Select from '~/src/uikit/Select';
import Books from '~/src/store/Books';
import searchSvg from '~/public/icons/search.svg';

import styles from './styles.module.scss';

const categories = [
    'All',
    'Book',
    'art',
    'biography',
    'computers',
    'history',
    'medical',
    'poetry',
];
const sorting = ['relevance', 'newest'];

const SearchBlock = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [searchInput, setSearchInput] = useState('');
    const [categorySelect, setCategorySelect] = useState('');
    const [sortingSelect, setSortingSelect] = useState(sorting[0]);

    const onSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();
        if (pathname !== '/') navigate('/');

        Books.setSearchParams({
            string: searchInput,
            category: categorySelect,
            sorting: sortingSelect,
        });

        Books.loadNewBooks();
    };

    return (
        <div className={styles.searchBlock}>
            <h1 className={styles.title}>Search for books</h1>
            <form
                className={styles.searchBar}
                onSubmit={(e: React.FormEvent) => onSubmitForm(e)}
            >
                <Input
                    className={styles.searchInput}
                    onChange={(e) =>
                        setSearchInput((e.target as HTMLInputElement).value)
                    }
                />
                <button className={styles.searchButton} type="submit">
                    <img src={searchSvg}></img>
                </button>
            </form>
            <div className={styles.filterBlock}>
                <label htmlFor="categories">Categories</label>
                <Select
                    name="categ"
                    id="categories"
                    onChange={(e) =>
                        (e.target as HTMLSelectElement).value !== 'All'
                            ? setCategorySelect(
                                  (e.target as HTMLSelectElement).value,
                              )
                            : setCategorySelect('')
                    }
                >
                    {categories.map((cat, ind) => (
                        <option key={ind} value={cat}>
                            {cat}
                        </option>
                    ))}
                </Select>
                <label htmlFor="sorting">Sorting by</label>
                <Select
                    id="sorting"
                    name="sort"
                    onChange={(e) =>
                        setSortingSelect((e.target as HTMLSelectElement).value)
                    }
                >
                    {sorting.map((srt, ind) => (
                        <option key={ind} value={srt}>
                            {srt}
                        </option>
                    ))}
                </Select>
            </div>
        </div>
    );
};

export default SearchBlock;
