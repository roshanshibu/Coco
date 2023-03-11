import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/dash/Dashboard'
import Search from './components/search/Search'
import Chorus from './components/chorus/Chorus'
import Library from './components/library/Library'
import ErrorPage from './components/404/Errorpage'
import Player from './components/player/Player';

function MainRoutes() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/search' element={<Search />} />
                <Route path='/chorus' element={<Chorus />} />
                <Route path='/library' element={<Library />} />
                <Route path='/player' element={<Player />} />
                <Route path="/*" element={<ErrorPage />} />
            </Routes>
        </>
    )
}

export default MainRoutes