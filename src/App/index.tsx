import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BookPage, SearchPage } from '~/src/pages';
import { Header, Footer } from '~/src/parts';
import { getMainPath, getBookPath } from '../routes';

const App = () => {
    return (
        <>
            <Header />
            <div>
                <Routes>
                    <Route path={getMainPath} element={<SearchPage />} />
                    <Route path={getBookPath} element={<BookPage />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
};

export default App;
