import React, { useEffect, useState, useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { TokenAuthContext } from '../Context Api/AuthContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { userBookings } from '../Services/allApis';


function Header() {
    const [show, setShow] = useState(false);

    const { authStatus, setAuthStatus } = useContext(TokenAuthContext)

    const user = sessionStorage.getItem("username")

    const navigate = useNavigate()
    const [token, setToken] = useState("")
    const [booking, setBooking] = useState([])


    useEffect(() => {
        setToken(sessionStorage.getItem('token'))
        getData()
    }, [])

    const handleLogout = () => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('username')
        navigate('/')
        setAuthStatus(false)
        window.location.reload();
    }

    const getData = async () => {
        const result = await userBookings()
        if (result.status == 200) {
            setBooking(result.data)
        }
        else {
            console.log(result.response.data)
        }
    }
    console.log(booking)
    return (
        <>
            <Navbar expand="lg" className=" bg-body-secondary">
                <Navbar.Brand href="" className='ms-5 border-0'>
                    <i className="fa-solid fa-plane-departure fa-beat-fade me-3" style={{ color: "#74C0FC" }}></i>
                    Travel India
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav" className='' style={{ marginLeft: "400px" }}>
                    <Link className='text-decoration-none text-info me-4' to={'/'}>Home</Link>
                    <Link className='text-decoration-none text-info me-4' to={'/tours'}>Tours</Link>
                    <Link className='text-decoration-none text-info' to={'/gal'}>Gallery</Link>
                </Navbar.Collapse>
                <div className=''>

                    {
                        token ?
                            <div>
                                <button className='btn btn-outline-danger' onClick={handleLogout}>
                                    <i className="fa-solid fa-right-from-bracket" />
                                    Logout
                                </button>
                                <Button variant='' className='ms-5 me-4  text-decoration-none text-info btn btn-outline-secondary' onClick={() => setShow(true)}>
                                    <i class="fa-regular fa-lg fa-user" style={{ color: '#74C0FC' }}></i>
                                    <span className='ms-2'><b>{user}</b></span>
                                </Button>

                                <Modal
                                    show={show}
                                    onHide={() => setShow(false)}
                                    dialogClassName="modal-90w"
                                    aria-labelledby="example-custom-modal-styling-title"
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="example-custom-modal-styling-title">
                                            Bookings
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {
                                            booking.length > 0 ?
                                                booking.map(item => (
                                                    <div className='my-2 p-3 border'>
                                                        <h4>Trip:{item.packageName}</h4>
                                                        <h5>Booked for: {new Date(item.bookAt).toLocaleDateString('en-IN', {
                                                            month: 'long',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}</h5>
                                                        <h6>Amount: <b>{item.totalAmount}</b> for <b>{item.guestSize}</b> people </h6>
                                                    </div>
                                                ))
                                                :
                                                <h3>No Trip Booked yet!</h3>
                                        }
                                    </Modal.Body>
                                </Modal>
                            </div>

                            :
                            <div className='me-5'>
                                <Link className='btn btn-outline-info me-3' to={'/login'}>Log In</Link>
                                <Link className='btn btn-outline-info' to={'/reg'}>Sign Up</Link>
                            </div>
                    }

                </div>
            </Navbar>
        </>
    )
}

export default Header