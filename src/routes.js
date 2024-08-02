import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Game from './pages/Game';
import DefaultLogin from './pages/DefaultLogin';


export default function Router() {
    return (
      <BrowserRouter>
        <Routes>
            <Route index element={<Home/>} />
            <Route path="login" element={<DefaultLogin/>} />
            <Route path="register" element={<DefaultLogin isNewUser/>} />
            <Route path="fly" element={<Game/>} />
        </Routes>
      </BrowserRouter>
    );
  }
  