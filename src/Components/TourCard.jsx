import React, { useState, useEffect } from 'react'
import { Card, CardBody } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import base_url from '../Services/base_url';

function TourCard({ tours }) {

    return (
        <>
            <div className='d-flex justify-content-between '>
                <Card className='w-100'>
                    <Link to={`/tourdet/${tours._id}`}>
                        <img src={tours.image && `${base_url}/uploads/${tours.image}`} width={'100%'} height={"350px"} alt="tour-img" />
                    </Link>
                    <CardBody>
                        <div className=' d-flex align-items-center justify-content-between'>
                            <span className=' d-flex  align-items-center'>
                                <i className="fa-solid fa-location-dot"></i>
                                 {tours.state}
                            </span>
                            <span>
                                <i className="fa-solid fa-users-line fa-lg"></i> {tours.maxGroupSize} People
                            </span>
                        </div>

                        <h5 className='text-center mt-1'>
                            <Link to={`/tourdet/${tours._id}`} className='text-decoration-none text-info'>
                                {tours.packageName}
                            </Link>
                        </h5>
                        <div className='text-center'>
                            <button className='btn'>
                                <Link to={`/bookingdet/${tours._id}`} className='text-info'>Book Now</Link>
                            </button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default TourCard