import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Footer from './components/Footer';
import ContactUs from './pages/ContactUs';
import Hostels from './pages/Hostels';
import HostelPage from './pages/HostelPage';
import Register from './pages/Register';
import UserState from './contexts/UserState';
import Account from './pages/Account';

function App() {
  return (
    <>
      <div className='flex flex-col min-h-screen box-border bg-orange-200'>
        <BrowserRouter>
          <UserState>
            <Header />
            <Routes className="flex grow-1">
              <Route path='/' element={<Home />} />
              <Route path='/hostels' element={<Hostels />} />
              <Route path='/hostels/:id' element={<HostelPage />} />
              <Route path='/login/:id' element={<Login />}/>
              <Route path='/register/:id' element={<Register />}/>
              <Route path='/:id/account' element={<Account />}/>
              <Route path='/contact' element={<ContactUs />} />
            </Routes>
            <Footer />
          </UserState>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
