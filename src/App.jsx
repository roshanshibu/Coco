import './App.css'
import { Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import MainRoutes from './MainRoutes';
import Player from './components/player/Player';


function App() {
  return (
    <div className="App">
      <Routes>        
        <Route path='/login' element={<Login />} />
        <Route path='/player/:songid' element={<Player />} />
        <Route path='*' element={<MainRoutes />} />        
      </Routes>
    </div>
  )
}

export default App
