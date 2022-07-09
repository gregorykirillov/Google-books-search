import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { SearchBlock } from './components';
import { Button } from '~/src/uikit';

import styles from './styles.module.scss';
import { BASE_URL } from '~/src/settings';

const Header = () => {
    const location = useLocation().pathname;
    const [isMainPage, setMainPage] = useState(location !== `${BASE_URL}`);
    const navigate = useNavigate();

    const onButtonClick = () => {
        navigate(`${BASE_URL}`);
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
