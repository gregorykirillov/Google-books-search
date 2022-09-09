import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { BooksService } from '~/src/services';
import { Preloader } from '~/src/uikit';
import Books from '~/src/store/Books';
import noPhoto from '~/public/icons/noPhoto.svg';

import styles from './styles.module.scss';
import { ScrollTop } from '~/src/helpers';

type VolumeInfo = {
    title: string;
    authors: string[];
    categories: string[];
    description: string;
    imageLinks: {
        smallThumbnail: string;
    };
};

type BookType = {
    id: string;
    volumeInfo: VolumeInfo;
};

const BookPage = () => {
    const { id } = useParams();
    const [isLoading, setLoading] = useState(false);
    const [targetBook, setTargetBook] = useState<BookType>(
        Books?.Books?.filter((book: BookType) => book.id === id)[0],
    );

    useEffect(() => {
        setLoading(true);
        if (!targetBook) {
            id &&
                BooksService.getBookByLink(id).then(({ data: book }) =>
                    setTargetBook(book),
                );
        }

        setLoading(false);
    }, []);

    if (isLoading || !targetBook) return <Preloader />;

    const { title, authors, categories, description, imageLinks } =
        targetBook.volumeInfo;

    return (
        <section>
            <ScrollTop />
            <div className={styles.container}>
                <div className={styles.imageBlock}>
                    <img
                        src={imageLinks?.smallThumbnail || noPhoto}
                        className={
                            imageLinks?.smallThumbnail
                                ? styles.thumbnail
                                : styles.noPhoto
                        }
                        alt="Thumbnail of book"
                    />
                </div>
                <div className={styles.infoBlock}>
                    <p className={styles.categories}>
                        {categories?.join(', ')}
                    </p>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.authors}>{authors?.join(', ')}</p>
                    <p className={styles.description}>{description}</p>
                </div>
            </div>
        </section>
    );
};

export default BookPage;
