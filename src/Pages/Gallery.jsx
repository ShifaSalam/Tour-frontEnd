import React, { useState, useEffect } from 'react'
import TourImages from '../Components/TourImages'
import { Col, Row } from 'react-bootstrap'
import Header from '../Components/Header'
import { allUserTours } from '../Services/allApis'


function Gallery() {

    const [tours, setTours] = useState([])
    const [search, setSearch] = useState("")
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            getData()
        }
        else {
            console.log("Login first!")
        }
    }, [search])
    // console.log(photos)
    const getData = async () => {
        const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
        const result = await allUserTours(header, search)
        if (result.status == 200) {
            setTours(result.data)
            const allPhotos = result.data.flatMap(tour => tour.photo)
            setPhotos(allPhotos)
        }
        else {
            console.log(result.response.data)
        }
    }

    return (
        <>
            <Header />
            <Row className='m-0' >
                {
                    photos.length > 0 ?
                        photos.map(item => (
                            <Col md='3'>
                                <TourImages photo={item} tour={tours} />
                            </Col>
                        )) :
                        <h5>no images</h5>
                }
            </Row>
        </>
    )
}

export default Gallery