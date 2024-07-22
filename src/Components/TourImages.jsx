import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
import base_url from '../Services/base_url';


function TourImages({ photo, tour }) {

    const [showModal, setShowModal] = useState(false)
    const [selectedTour, setSelectedTour] = useState([])

    const handlePhotoClick = () => {
        const tourDetails = tour.find(tours => tours.photo.includes(photo));
        console.log(tourDetails)
        setSelectedTour(tourDetails);
        setShowModal(true);

    }

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <>
            <div className='py-2' style={{ cursor: 'pointer' }} >
                <img src={photo && `${base_url}/${photo}`} width={'100%'} alt="tour-img" height={'300px'} className='rounded-1 gallery' onClick={() => handlePhotoClick()} />
            </div>
            <div>
                <Modal
                    show={showModal}
                    onHide={closeModal}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedTour.packageName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <img src={photo && `${base_url}/${photo}`} width={'100%'} alt="tour-img" height={'300px'} />
                            <h3 className='text-center mt-1'>{selectedTour.state}</h3>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="info" className='m-auto' onClick={closeModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default TourImages