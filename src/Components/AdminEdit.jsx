import React, { useState, useEffect, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import base_url from '../Services/base_url';
import { editTours } from '../Services/allApis';
import { editTourResponseContext } from '../Context Api/Contextapi';

function AdminEdit({ tours }) {

    const { editTourResponse, setEditTourResponse } = useContext(editTourResponseContext)

    const [preview, setPreview] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [tourData, setTourData] = useState({
        id: tours._id, packageName: tours.packageName, state: tours.state, description: tours.description, rate: tours.rate, maxGroupSize: tours.maxGroupSize, image: ""
    })
    useEffect(() => {
        if (tourData.image.type === "image/jpg" || tourData.image.type == "image/jpeg " || tourData.image.type == "image/png") {
            setPreview(URL.createObjectURL(tourData.image))
        }
        else {
            setPreview("")
        }
    }, [tourData.image])

    const handleUpdate = async () => {
        console.log(tourData)
        const { packageName, state, description, rate, maxGroupSize } = tourData
        if (!packageName || !state || !description || !rate || !maxGroupSize) {
            toast.warning("Provide Complete Data!!")
        }
        else {
            const formData = new FormData()
            formData.append("packageName", packageName)
            formData.append("state", state)
            formData.append("description", description)
            formData.append("rate", rate)
            formData.append("maxGroupSize", maxGroupSize)
            preview ? formData.append("image", tourData.image) : formData.append("image", tours.image)

            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data"
                }
                const result = await editTours(tourData.id, formData, reqHeader)
                if (result.status == 200) {
                    toast.success(`Tour Package ${tourData.packageName} Updated Successfully!`)
                    setEditTourResponse(result)
                    handleClose()
                }
                else {
                    toast.error(result.response.data)
                }
            }

            else {
                const reqHeader = {
                    " Content-Type": "application/json",
                }
                const result = await editTours(tourData.id, formData, reqHeader)
                if (result.status == 200) {
                    toast.success(`${tourData.packageName} Package Updated Successfully!`)
                    setEditTourResponse(result)
                    handleClose()
                }
                else {
                    toast.error(result.response.data)
                }
            }
        }
    }


    return (
        <>
            <button className='btn me-3 mt-3' onClick={handleShow}>
                <i className='fa-solid fa-pen-to-square fa-2xl'></i>
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title> Edit projects</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col md='6'>
                            <label className='h-75'>
                                <input type="file" name='img' onChange={(e) => { setTourData({ ...tourData, image: e.target.files[0] }) }} />
                                <img className='w-75 h-100' src={preview ? preview : `${base_url}/uploads/${tours.image}`} style={{ height: '160px' }} alt="img" />
                            </label>
                        </Col>

                        <Col>
                            <div>
                                <FloatingLabel controlId="titleinp" label="Package Name" className="mb-3">
                                    <Form.Control type="text" value={tourData.packageName} placeholder="Package Name" onChange={(e) => { setTourData({ ...tourData, packageName: e.target.value }) }} />
                                </FloatingLabel>
                                <FloatingLabel controlId="overvierinp" label="Location" className="mb-3">
                                    <Form.Control type="text" value={tourData.state} placeholder="Location" onChange={(e) => { setTourData({ ...tourData, state: e.target.value }) }} />
                                </FloatingLabel>
                                <FloatingLabel controlId="languageinp" label="Package Rate" className="mb-3">
                                    <Form.Control type="text" value={tourData.rate} placeholder="Package Rate" onChange={(e) => { setTourData({ ...tourData, rate: e.target.value }) }} />
                                </FloatingLabel>
                                <FloatingLabel controlId="githubinp" label="MaxGroupSize" className='mb-2'>
                                    <Form.Control type="text" value={tourData.maxGroupSize} placeholder="MaxGroupSize" onChange={(e) => { setTourData({ ...tourData, maxGroupSize: e.target.value }) }} />
                                </FloatingLabel>
                            </div>
                        </Col>

                        <FloatingLabel controlId="githubinp" label="Description" className="mb-3">
                            <Form.Control type="text" value={tourData.description} placeholder="Description" onChange={(e) => { setTourData({ ...tourData, description: e.target.value }) }} />
                        </FloatingLabel>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AdminEdit