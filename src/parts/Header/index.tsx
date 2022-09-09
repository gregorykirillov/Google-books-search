import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { SearchBlock } from './components';
import { Button } from '~/src/uikit';

import styles from './styles.module.scss';
import { BASE_URL } from '~/src/settings';

const Header = () => {
    const location = useLocation().pathname;
    const [isMainPage, setMainPage] = useState(true);

    const onButtonClick = () => {
        history.back();
    };

    useEffect(() => {
        const pageIsMain = location === BASE_URL;
        setMainPage(pageIsMain);
    }, [location]);

    return (
        <>
            <header className={styles.header}>
                <Button
                    className={styles.backButton}
                    hidden={isMainPage}
                    onClick={onButtonClick}
                >
                    Назад
                </Button>
                <SearchBlock />
            </header>
        </>
    );
};

export default Header;
