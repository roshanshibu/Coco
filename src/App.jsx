import './App.css'
import { Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import MainRoutes from './MainRoutes';


function App() {
  return (
    <div className="App">
      <Routes>        
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<MainRoutes />} />        
      </Routes>
    </div>
  )
}

export default App
