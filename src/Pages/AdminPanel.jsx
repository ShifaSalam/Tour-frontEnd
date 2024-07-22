import React from 'react'
import { useState, useEffect, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import AdminEdit from '../Components/AdminEdit';
import BookedInfo from '../Components/BookedInfo';
import { addTours, allTours, deleteTour } from '../Services/allApis';
import { addTourResponseContext } from '../Context Api/Contextapi';
import { editTourResponseContext } from '../Context Api/Contextapi';
import Users from '../Components/Users';
import AdminHeader from '../Components/AdminHeader';

function AdminPanel() {
    const { addTourResponse, setAddTourResponse } = useContext(addTourResponseContext)
    const { editTourResponse, setEditTourResponse } = useContext(editTourResponseContext)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [search, setSearch] = useState("")


    const [preview, setPreview] = useState("")
    const [tourData, setTourData] = useState({
        packageName: "", state: "", description: "", rate: "", maxGroupSize: "", image: ""
    })
    const [imageStatus, setImageStatus] = useState(false)
    const [tours, setTours] = useState([])


    useEffect(() => {
        console.log(tourData)
        if (tourData.image.type == "image/jpg" || tourData.image.type == "image/jpeg" || tourData.image.type == "image/png") {
            setImageStatus(false)
            setPreview(URL.createObjectURL(tourData.image))
        }
        else {
            setImageStatus(true)
            setPreview("")
        }
    }, [tourData.image, search])

    const handleAddTour = async () => {
        const { packageName, state, description, rate, maxGroupSize, image } = tourData
        if (!packageName || !state || !description || !rate || !maxGroupSize || !image) {
            toast.warning("Provide Complete Data!!")
            // console.log(packageName, state, description, rate, maxGroupSize, image)
        }
        else {
            const formData = new FormData()
            formData.append("packageName", packageName)
            formData.append("state", state)
            formData.append("description", description)
            formData.append("rate", rate)
            formData.append("maxGroupSize", maxGroupSize)
            formData.append("image", image)

            const reqHeader = {
                "Content-Type": "multipart/form-data"
            }
            const result = await addTours(formData, reqHeader)
            if (result.status == 200) {
                toast.success(`${tourData.packageName} added successfully!`)
                setTourData({
                    packageName: "", state: "", description: "", rate: "", maxGroupSize: "", image: ""
                })
                setAddTourResponse(result)
                handleClose()
            }
            else {
                toast.error(result.response.data)
            }
        }
    }
    useEffect(() => {
        getAllTours()
    }, [addTourResponse, editTourResponse])

    const getAllTours = async () => {
        const result = await allTours(search)
        // console.log(result)
        if (result.status == 200) {
            setTours(result.data)
        }
        else {
            console.log(result.response.data)
        }
    }

    const handleDeleteTour = async (id) => {

        const header = {
            "Content-Type": "application/json",
        }
        const result = await deleteTour(id, header)
        if (result.status == 200) {
            toast.error("One package has been deleted!!")
            getAllTours()
        }
        else {
            console.log(result)
            toast.error(result.response.data)
        }
    }

    return (
        <>
            <AdminHeader />
            <div className='m-5'>
                <div>
                    <div className='m-5'>
                        <h4>Hello, <span>Admin</span></h4>
                        <h5 className=''><b>You can add and update Tour Packages here..</b></h5>
                    </div>
                    <div className='ms-5 d-flex justify-content-center'>
                        <img src="http://www.uluru.com/design/package_tour.png" style={{ height: "100px" }} alt="" />
                        <div className='btn p-3' style={{ marginTop: "25px" }} onClick={handleShow}><i className="fa-solid fa-plus fa-xl "></i></div>
                    </div>

                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Tour Package</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <Row>
                                    <Col>
                                        <label >
                                            <input type="file" name='' id='in' style={{ display: 'none' }} onChange={(e) => setTourData({ ...tourData, image: e.target.files[0] })} />Location Image
                                            <img className='img-fluid' src={preview ? preview : "https://png.pngtree.com/png-vector/20190214/ourmid/pngtree-vector-gallery-icon-png-image_515223.jpg"} alt="" />
                                        </label>

                                    </Col>
                                    <Col>
                                        <div>
                                            <FloatingLabel controlId="titleinp" label="Package Name" className="mb-3">
                                                <Form.Control type="text" placeholder="Package Name" onChange={e => setTourData({ ...tourData, packageName: e.target.value })} />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="langinp" label="Location" className="mb-3">
                                                <Form.Control type="text" placeholder="Where does the tour occurs" onChange={e => setTourData({ ...tourData, state: e.target.value })} />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="githubinp" label="Rate" className='mb-3'>
                                                <Form.Control type="text" placeholder="Package Rate" onChange={e => setTourData({ ...tourData, rate: e.target.value })} />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="githubinp" label="MaxGroupSize" className='mb-2'>
                                                <Form.Control type="text" placeholder="MaxGroupSize" onChange={e => setTourData({ ...tourData, maxGroupSize: e.target.value })} />
                                            </FloatingLabel>
                                        </div>
                                    </Col>
                                    <FloatingLabel controlId="overviewinp" label="Description" className="mb-3">
                                        <Form.Control type='text-box' placeholder="Briefly about Package" onChange={e => setTourData({ ...tourData, description: e.target.value })} />
                                    </FloatingLabel>
                                </Row>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleAddTour}>Add</Button>
                        </Modal.Footer>
                    </Modal>

                    <div className='mt-5' id='trips'>
                        <h3 className='text-center'>All available Tour Packages</h3>
                        <div className='border border-3 p-3 d-flex mb-5'>

                            <Row>
                                {
                                    tours.length > 0 &&
                                    tours.map(item => (
                                        <Col md='6'>
                                            <div className='d-flex justify-content-between border shadow mb-3 p-3 rounded w-100'>
                                                <h4 className='ms-5 mt-2'>{item?.packageName}</h4>
                                                <div>

                                                    <AdminEdit tours={item} />
                                                    <button className='btn mt-3' onClick={() => { handleDeleteTour(item?._id) }} >
                                                        <i className="fa-solid fa-trash fa-2xl" />
                                                    </button>
                                                </div>
                                            </div>
                                        </Col>
                                    ))

                                }
                            </Row>
                        </div>
                    </div>
                    <hr />

                    <div id='bookings'>
                        <BookedInfo />
                    </div>
                    <hr />

                    <div id='users'>
                        <Users />
                    </div>

                </div>
            </div>
        </>
    )
}

export default AdminPanel