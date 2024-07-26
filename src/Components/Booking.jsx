import React, { useState, useEffect } from 'react'
import { Form, ListGroupItem, Button, ListGroup, FloatingLabel } from 'react-bootstrap'
import { addBooking, SingleTour } from '../Services/allApis'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

function Booking({ tour, avgRating, allReviews }) {
    const { state, rate, packageName } = tour
    const today = new Date().toISOString().split('T')[0];
    const navigate = useNavigate()
    const { tid } = useParams()
    const [tours, setTours] = useState([])


    const [booking, setBooking] = useState(() => {
        const savedBooking = JSON.parse(localStorage.getItem('booking')) || {};
        return {
            packageName: packageName, // Use tour prop directly
            email: savedBooking.email || "",
            fullName: savedBooking.fullName || "",
            phone: savedBooking.phone || "",
            guestSize: savedBooking.guestSize || "",
            bookAt: savedBooking.bookAt || today,
            totalAmount: savedBooking.totalAmount || 0
        };
    });
    useEffect(() => {
        localStorage.setItem('booking', JSON.stringify(booking));
    }, [booking]);
    useEffect(() => {
        // Only update packageName if the tour prop changes
        setBooking(prevBooking => ({
            ...prevBooking,
            packageName: packageName
        }));
    }, [tour, packageName]);
    const { guestSize } = booking
    const handleBooking = async () => {
        const { packageName, email, fullName, phone, guestSize, bookAt, totalAmount } = booking;
        const calculatedTotalAmount = 150 + (rate * guestSize);
        const updatedBooking = {
            ...booking,
            totalAmount: calculatedTotalAmount
        };

        if (!packageName || !email || !fullName || !phone || !guestSize || !bookAt) {
            toast.warning("Provide Complete Data!!");
        } else {
            try {
                const result = await addBooking(updatedBooking);
                if (result.status === 200) {
                    toast.success(`Successfully Booked a Trip to ${booking.packageName}`);
                    setBooking({
                        packageName: packageName,
                        email: "",
                        fullName: "",
                        phone: "",
                        guestSize: "",
                        bookAt: "",
                        totalAmount: 0
                    });
                    localStorage.removeItem('booking');
                    navigate('/thank') // Clear local storage after successful booking
                } else {
                    toast.error("Booking failed, please try again.");
                }
            } catch (error) {
                console.error("Error while booking:", error);
                toast.error("An error occurred during booking. Please try again.");
            }
        }
    };
    console.log(booking)
    console.log(tours)
    return (
        <>
            <div className='border p-5 h-100'>
                <h3>Let's go for a Trip to </h3>
                <h3 style={{ marginLeft: "190px" }} className='text-info'>{state}</h3>
                <div className="booking__top d-flex align-items-center justify-content-between">
                    <h4><i className="fa-solid fa-indian-rupee-sign fa-xs"></i> {rate} <span><small>/per person</small></span></h4>
                    <span className='tour__rating d-flex  align-items-center gap-1'>
                        <i className="fa-solid fa-star fa-2xs" style={{ color: '#ffc800' }}></i><small>{avgRating} ({allReviews.length}) </small>
                    </span>
                </div>

                <div className="py-4">
                    <h5><b>Informations</b></h5>
                    <Form className='' >
                        {/* <FloatingLabel controlId="floatingInput" label="Package Name" className="mb-2">
                            <Form.Control type="text" required placeholder="Package Name" onChange={(e) => { setBooking({ ...booking, packageName: e.target.value }) }} />
                        </FloatingLabel> */}
                        <FloatingLabel controlId="floatingInput" label="Full Name" className="mb-2">
                            <Form.Control type="text" required placeholder="Full Name" onChange={(e) => { setBooking({ ...booking, fullName: e.target.value }) }} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Email Address" className="mb-2">
                            <Form.Control type="email" required placeholder="Email Address" onChange={(e) => { setBooking({ ...booking, email: e.target.value }) }} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Phone Number" className="mb-2">
                            <Form.Control type="text" required placeholder="Phone Number" onChange={(e) => { setBooking({ ...booking, phone: e.target.value }) }} />
                        </FloatingLabel>
                        <div className='d-flex w-100'>
                            <FloatingLabel controlId="floatingInput" label="Date" className="mb-2 w-50">
                                <Form.Control type="date" required placeholder="" min={today} onChange={(e) => { setBooking({ ...booking, bookAt: e.target.value }) }} />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="Guest" className="mb-2 w-50">
                                <Form.Control type="number" required placeholder="Guest" min={1} max={tour.maxGroupSize} onChange={(e) => { setBooking({ ...booking, guestSize: e.target.value }) }} />
                            </FloatingLabel>
                        </div>
                    </Form>
                </div>
                <div>
                    <ListGroup>
                        <ListGroupItem className='border-0 d-flex justify-content-between'>
                            <h6 className='d-flex align-items-center gap-1'>
                                <i className="fa-solid fa-indian-rupee-sign fa-xs"></i>{rate} X {guestSize} person
                            </h6>
                            <h6> <i className="fa-solid fa-indian-rupee-sign fa-xs"></i>{rate * guestSize}</h6>
                        </ListGroupItem>
                        <ListGroupItem className='border-0 d-flex justify-content-between'>
                            <h6>
                                Service charge
                            </h6>
                            <h6><i className="fa-solid fa-indian-rupee-sign fa-xs"></i>150</h6>
                        </ListGroupItem>
                        <ListGroupItem className='border-0 total d-flex justify-content-between'>
                            <h6><b>Total</b></h6>
                            <h6 onChange={(e) => setBooking({ ...booking, totalAmount: 150 + (rate * guestSize) })}>
                                <i className="fa-solid fa-indian-rupee-sign fa-xs"></i>{150 + (rate * guestSize)}
                            </h6>
                        </ListGroupItem>
                    </ListGroup>

                    <Button className='btn btn-info w-100 mt-4' onClick={handleBooking}>
                        Book Now
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Booking