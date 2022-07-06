import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import Books from '~/src/store/Books';
import { Button, Preloader } from '~/src/uikit';
import noPhoto from '~/public/icons/noPhoto.svg';

import styles from './styles.module.scss';

type VolumeInfo = {
    title: string;
    authors: string[];
    categories: string[];
    description: string;
    imageLinks: {
        smallThumbnail: string;
    };
};

const ItemsBlock = observer(() => {
    const navigate = useNavigate();

    const onLoadMore = () => {
        Books.loadMoreBooks();
    };

    const onClickItem = (id: string) => {
        navigate(`/Book/${id}`);
    };

    const booksItems = Books.Books;

    return (
        <>
            {Books.totalItems !== null && (
                <p className={styles.foundBooks}>
                    Found {Books.totalItems} results
                </p>
            )}
            <div className={styles.itemsBlock}>
                {booksItems?.map(
                    ({
                        id,
                        volumeInfo,
                    }: {
                        id: string;
                        volumeInfo: VolumeInfo;
                    }) => {
                        return (
                            <button
                                key={id}
                                className={styles.itemBlock}
                                onClick={() => onClickItem(id)}
                            >
                                <img
                                    src={
                                        volumeInfo?.imageLinks
                                            ?.smallThumbnail || noPhoto
                                    }
                                    className={cn(
                                        styles.thumbnail,
                                        volumeInfo?.imageLinks
                                            ?.smallThumbnail ?? styles.noPhoto,
                                    )}
                                    alt="Thumbnail of book"
                                />
                                <div>
                                    <p className={styles.category}>
                                        {volumeInfo.categories?.[0]}
                                    </p>
                                </div>
                                <p className={styles.title}>
                                    <b>{volumeInfo.title}</b>
                                </p>
                                <p className={styles.authors}>
                                    {volumeInfo.authors?.join(', ')}
                                </p>
                            </button>
                        );
                    },
                )}
            </div>
            {Books.isLoading && <Preloader />}
            {Books.totalItems !== null &&
                Books.totalItems > Books.searchParams.startIndex &&
                !Books.isLoading &&
                Books.isLoading === false && (
                    <Button className={styles.loadMore} onClick={onLoadMore}>
                        Load more
                    </Button>
                )}
        </>
    );
});

export default ItemsBlock;
