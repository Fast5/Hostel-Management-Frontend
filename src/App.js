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
import RoomForm from './pages/RoomForm';
import RoomsState from './contexts/RoomsState';
import StudentForm from './pages/StudentForm';
import StudentsState from './contexts/StudentsState';
import PageNotFound from './components/PageNotFound';
import HostelStaffForm from './pages/HostelStaffForm';
import HostelStaffsState from './contexts/HostelStaffsState';
import AddComplaint from './pages/AddComplaint';
import AllocateRoom from './pages/AllocateRoom';
import Complaints from './pages/Complaints';
import AllocateRoomForm from './pages/AllocateRoomForm';
import ComplaintForm from './pages/ComplaintForm';
import ComplaintState from './contexts/ComplaintState';
import Complaint from './pages/Complaint';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <div className='flex flex-col min-h-screen box-border bg-orange-200'>
        <BrowserRouter>
          <UserState>
            <RoomsState>
              <StudentsState>
                <HostelStaffsState>
                  <ComplaintState>
                    <Header />
                    <Routes className="flex grow-1">
                      <Route path='/' element={<Home />} />
                      <Route path='/hostels' element={<Hostels />} />
                      <Route path='/hostels/:id' element={<HostelPage />} />
                      <Route path='/login/:id' element={<Login />}/>
                      <Route path='/register/:id' element={<Register />}/>
                      <Route path='/:id/account' element={<Account />}/>
                      <Route path='/admin/addRoom' element={<AddRoom />}/>
                      <Route path='/admin/addRoom/:id' element={<RoomForm />}/>
                      <Route path='/admin/addStudent' element={<AddStudent />}/>
                      <Route path='/admin/addStudent/:id' element={<StudentForm />}/>
                      <Route path='/admin/addHostelStaff' element={<AddHostelStaff />}/>
                      <Route path='/admin/addHostelStaff/:id' element={<HostelStaffForm />}/>
                      <Route path='/student/addComplaint' element={<AddComplaint />}/>
                      <Route path='/student/addComplaint/:id' element={<ComplaintForm />}/>
                      <Route path='/hostelStaff/allocateRoom' element={<AllocateRoom />}/>
                      <Route path='/hostelStaff/allocateRoom/:id' element={<AllocateRoomForm />}/>
                      <Route path='/hostelStaff/viewComplaints' element={<Complaints />}/>
                      <Route path='/hostelStaff/viewComplaint/:id' element={<Complaint />}/>
                      <Route path='/contact' element={<ContactUs />} />
                      <Route path='*' element={<PageNotFound />} />
                    </Routes>
                    <Footer />
                  </ComplaintState>
                </HostelStaffsState>
              </StudentsState>
            </RoomsState>
          </UserState>
        </BrowserRouter>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
