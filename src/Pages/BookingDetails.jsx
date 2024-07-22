import React, { useState, useEffect } from 'react'
import { Container, Form, ListGroup } from 'react-bootstrap'
import Booking from '../Components/Booking'
import { useParams } from 'react-router-dom'
import { SingleTour, getReview } from '../Services/allApis'
import base_url from '../Services/base_url'
import Header from '../Components/Header'
function BookingDetails() {
    const [tours, setTours] = useState([])
    const { tid } = useParams()
    const user = sessionStorage.getItem("username")
    const [reviews, setReviews] = useState({
        username: user, reviewText: "", rating: ""
    })
    const [allReviews, setAllReviews] = useState({
        username: user, reviewText: "", rating: ""
    })
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        getData()

    }, [])

    const getData = async () => {
        const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
        const result = await SingleTour(tid, header)
        const review = await getReview(tid, header)

        if (result.status == 200) {
            setTours(result.data)
            setAverageRating()
        }
        else {
            console.log(result.response.data)
        }
        if (review.status == 200) {
            setAllReviews(review.data.rev)
            setAverageRating(review.data.averageRating)
        }
        else {
            console.log(review.response.data)
        }
    }

    return (
        <>
            <Header />
            <section>
                <Container className='my-5'>
                    <div className='d-flex '>
                        <div className='w-75 h-100'>
                            <div className="h-100">
                                <img src={tours.image && `${base_url}/uploads/${tours.image}`} className='w-100 rounded' alt="" height={"500px"} />
                                <div className="border mt-4 p-3 h-100">
                                    <h4>{tours.packageName}</h4>
                                    <div className='d-flex align-items-center gap-5'>
                                        <span className='tour__rating d-flex  align-items-center gap-1'>
                                            <i className="fa-solid fa-star fa-2xs" style={{ color: '#ffc800' }}></i>{averageRating}
                                        </span>
                                    </div>
                                    <div className=" d-flex justify-content-center mt-2">
                                        <span className='me-5'><i className="fa-solid fa-location-dot"></i> {tours.state}</span>
                                        <span className='me-5'><i className="fa-solid fa-indian-rupee-sign fa-xs"></i> {tours.rate}/per person</span>
                                        <span><i className="fa-solid fa-people-group fa-xs"></i> Maximum of {tours.maxGroupSize} People</span>
                                    </div>
                                    <h5 className='mt-4'>Description</h5>
                                    <p>{tours.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-50 ms-5' >
                            <Booking tour={tours} avgRating={averageRating} allReviews={allReviews} />
                        </div>
                    </div>

                </Container>

            </section>
            {/*TOUR REVIEW START */}
            <div className="border mt-5 p-3 m-auto mx-5">
                <div className='d-flex justify-content-between'>
                    <h4>Reviews ({allReviews?.length}) </h4>
                    <div className='d-flex mb-5'>
                        (<h5 className='me-1'>{averageRating}</h5>
                        <span style={{ color: '#ffc800' }}><i className="fa-solid fa-star" ></i></span> )
                    </div>
                </div>

                <Form >
                    <div className='d-flex gap-3 mb-3'>
                        <span style={{ color: '#ffc800' }}>
                            1 <i className="fa-solid fa-star fa-2xs" ></i>
                        </span>
                        <span style={{ color: '#ffc800' }}>
                            2 <i className="fa-solid fa-star fa-2xs" ></i>
                        </span>
                        <span style={{ color: '#ffc800' }}>
                            3 <i className="fa-solid fa-star fa-2xs" ></i>
                        </span>
                        <span style={{ color: '#ffc800' }}>
                            4 <i className="fa-solid fa-star fa-2xs"></i>
                        </span>
                        <span style={{ color: '#ffc800' }}>
                            5 <i className="fa-solid fa-star fa-2xs"></i>
                        </span>
                    </div>
                </Form>

                <ListGroup>
                    <div className="row">

                        {
                            allReviews.length > 0 ?
                                allReviews.map(item => (
                                    <div className="my-4 border rounded-4 col-3 mx-2">
                                        <div className=''>
                                            <div className='d-flex align-items-center justify-content-between pe-3'>
                                                <div className='d-flex justify-content-around mt-3'>
                                                    <div>
                                                        <i className="fa-regular fa-user"></i>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <h5 className='me-5'>{item.username}</h5>
                                                        <p>[ {new Date(item.createdAt).toLocaleDateString('en-IN', {
                                                            month: 'long',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}]</p>
                                                        <span className='ms-5'>
                                                            ( {item.rating} <i className="fa-solid fa-star fa-2xs" style={{ color: '#ffc800' }}></i>)
                                                        </span>
                                                    </div>
                                                </div>

                                            </div>
                                            <h5 className='text-center mt-3'><b>{item.reviewText}</b></h5>

                                        </div>
                                    </div>
                                )) :
                                <h3>Reviews has'nt been added yet</h3>
                        }
                    </div>

                </ListGroup>
            </div>

        </>
    )
}

export default BookingDetails