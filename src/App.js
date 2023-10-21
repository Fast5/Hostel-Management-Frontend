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
import AddRoom from './pages/AddRoom';
import AddStudent from './pages/AddStudent';
import AddHostelStaff from './pages/AddHostelStaff';
import Room from './pages/Room';
import RoomsState from './contexts/RoomsState';

function App() {
  return (
    <>
      <div className='flex flex-col min-h-screen box-border bg-orange-200'>
        <BrowserRouter>
          <UserState>
            <RoomsState>
              <Header />
              <Routes className="flex grow-1">
                <Route path='/' element={<Home />} />
                <Route path='/hostels' element={<Hostels />} />
                <Route path='/hostels/:id' element={<HostelPage />} />
                <Route path='/login/:id' element={<Login />}/>
                <Route path='/register/:id' element={<Register />}/>
                <Route path='/:id/account' element={<Account />}/>
                <Route path='/admin/addRoom' element={<AddRoom />}/>
                <Route path='/admin/addRoom/:id' element={<Room />}/>
                <Route path='/admin/addStudent' element={<AddStudent />}/>
                <Route path='/admin/addHostelStaff' element={<AddHostelStaff />}/>
                <Route path='/contact' element={<ContactUs />} />
              </Routes>
              <Footer />
            </RoomsState>
          </UserState>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
