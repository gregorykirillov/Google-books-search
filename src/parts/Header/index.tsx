import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { SearchBlock } from './components';
import { Button } from '~/src/uikit';

import styles from './styles.module.scss';

const Header = () => {
    const location = useLocation().pathname;
    const [isMainPage, setMainPage] = useState(location !== '/');
    const navigate = useNavigate();

    const onButtonClick = () => {
        navigate('/');
    };

    useEffect(() => {
        setMainPage(!isMainPage);
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
