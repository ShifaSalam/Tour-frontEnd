import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function AdminHeader() {
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/')
    }
    return (
        <>
            <Navbar expand="lg" className=" bg-body-secondary">
                <Container>
                    <Navbar.Brand href="" className='me-5 border-0'>
                        <i className="fa-solid fa-plane-departure fa-beat-fade me-3" style={{ color: "#74C0FC" }}></i>
                        Travel India
                    </Navbar.Brand>
                    <Navbar.Collapse className='d-flex justify-content-between'>
                        <div className=' m-auto'>
                            <a href="#trips" className='text-decoration-none text-info me-5'>Trips</a>
                            <a href="#bookings" className='text-decoration-none text-info me-5'>Bookings</a>
                            <a href="#users" className='text-decoration-none text-info'>Users</a>
                        </div>

                        <button className='btn btn-outline-danger' onClick={handleLogout}>
                            <i className="fa-solid fa-right-from-bracket" />
                            Logout
                        </button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default AdminHeader