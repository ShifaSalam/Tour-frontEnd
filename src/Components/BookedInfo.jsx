import React, { useEffect, useState } from 'react'
import { cancelBooking, getBooking } from '../Services/allApis'
import { toast } from 'react-toastify'
import { Col, Row } from 'react-bootstrap'

function BookedInfo() {

    const [clients, setClients] = useState([])

    useEffect(() => {
        allClients()
    }, [])

    const allClients = async () => {
        const result = await getBooking()
        if (result.status == 200) {
            setClients(result.data)
        }
        else {
            console.log(result.response.data)
        }
    }
    console.log(clients)

    const handleDelete = async (id) => {
        const result = await cancelBooking(id)
        if (result.status == 200) {
            toast.error("Trip Cancelled!!")
            allClients()
        }
        else {
            toast.error(result.response)
        }
    }

    return (
        <>
            <div className='my-5 ms-5'>
                <h3>Users who booked our Trip Packages so far!!</h3>

                <Row className='ms-5'>

                    {
                        clients.length > 0 ?
                            clients.map(item => (
                                <Col md='5' className='d-flex justify-content-center'>
                                    <div className='w-100 bg-light shadow mt-5 p-3'>
                                        <h3><b>Package Name :</b> {item.packageName}</h3>
                                        <h4><b>Client Name :</b> {item.fullName}</h4>
                                        <h4><b>Email id :</b> {item.email}</h4>
                                        <h4><b>Phone :</b> {item.phone}</h4>
                                        <h4><b>Booked At :</b> {new Date(item.bookAt).toLocaleDateString('en-IN', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}</h4>
                                        <h5><b>Guests :</b> {item.guestSize}</h5>
                                        <div className='d-flex justify-content-between'>
                                            <h5><b>Total Amount :</b> <i class="fa-solid fa-sm fa-indian-rupee-sign me-1"></i>{item.totalAmount}</h5>
                                            <button className='btn pt-2' onClick={() => { handleDelete(item?._id) }}>
                                                <i className="fa-solid fa-trash-can fa-xl" style={{ color: "#80000d" }}></i>
                                            </button>
                                        </div>
                                    </div>
                                </Col>
                            )) :
                            <h5>No Bookings!</h5>
                    }
                </Row>

            </div>
        </>
    )
}

export default BookedInfo