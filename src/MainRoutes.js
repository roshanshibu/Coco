import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/dash/Dashboard'
import Search from './components/search/Search'
import Chorus from './components/chorus/Chorus'
import Library from './components/library/Library'
import ErrorPage from './components/404/Errorpage'
import Bio from './components/bio/Bio';
import Player from './components/player/Player';

export const PlayerContext = React.createContext()
export const UserContext = React.createContext()

function MainRoutes() {
    const [playingSongId, setPlayingSongId] = useState(null)
    const [g_miniplayer, setGMiniPlayer] = useState(true)
    const [currentUserId, setCurrentUserId] = useState(1)
    return (
        <>
            <PlayerContext.Provider value={{playingSongId, setPlayingSongId, g_miniplayer, setGMiniPlayer}}>
                <UserContext.Provider value={{currentUserId, setCurrentUserId}}>
                    <Player/> 
                    <Navbar/>
                    <Routes>
                        <Route path='/' element={<Dashboard />} />
                        <Route path='/search' element={<Search />} />
                        <Route path='/chorus' element={<Chorus />} />
                        <Route path='/library' element={<Library />} />
                        <Route path='/bio/:artistId' element={<Bio />} />
                        <Route path="/*" element={<ErrorPage />} />
                    </Routes>
                </UserContext.Provider>
            </PlayerContext.Provider>
        </>
    )
}

export default MainRoutes