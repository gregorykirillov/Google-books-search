import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BookPage, SearchPage } from '~/src/pages';
import { Header, Footer } from '~/src/parts';

const App = () => {
    return (
        <>
            <Header />
            <div>
                <Routes>
                    <Route path="/" element={<SearchPage />} />
                    <Route path="/Book/:id" element={<BookPage />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
};

export default App;
