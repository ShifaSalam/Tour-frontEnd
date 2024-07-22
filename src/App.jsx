import './App.css'
import './bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import { TokenAuthContext } from './Context Api/AuthContext'

import Footer from './Components/Footer'
import Home from './Pages/Home'
import Tours from './Pages/Tours'
import Login from './Pages/Login'
import Register from './Pages/Register'
import AdminPanel from './Pages/AdminPanel'
import AdminLogin from './Pages/AdminLogin'
import TourDetails from './Pages/TourDetails'
import BookingDetails from './Pages/BookingDetails'
import Thankyou from './Pages/Thankyou'
import Gallery from './Pages/Gallery'
import ScrollToTop from './Components/ScrollToTop'
function App() {

  const { authStatus, setAuthStatus } = useContext(TokenAuthContext)

  return (
    <>
    <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reg' element={<Register />} />
        <Route path='/admindash' element={<AdminPanel />} />
        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path='/tours' element={authStatus ? <Tours /> : <Login />} />
        <Route path='/gal' element={authStatus ? <Gallery /> : <Login />} />
        <Route path='/tourdet/:tid' element={authStatus ? <TourDetails /> : <Home />} />
        <Route path='/bookingdet/:tid' element={authStatus ? <BookingDetails /> : <Home />} />
        <Route path='/thank' element={authStatus ? <Thankyou /> : <Home />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
