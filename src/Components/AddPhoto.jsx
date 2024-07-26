import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap';
import { addPhoto } from '../Services/allApis';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';


function AddPhoto({setAddStatus}) {
    const { tid } = useParams()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [preview, setPreview] = useState("")
    const [photoDet, setPhotoDet] = useState({ photo: "" })

    useEffect(() => {
        if (photoDet.photo.type == "image/jpg" || photoDet.photo.type == "image/jpeg" || photoDet.photo.type == "image/png") {
            console.log("Image has correct format")
            setPreview(URL.createObjectURL(photoDet.photo))
        }
        else {
            console.log("Invalid file format! Image should be jpg,png or jpeg")
            setPreview("")
        }
    }, [photoDet.photo])

    const handleUpload = async () => {
        const { photo } = photoDet
        const formData = new FormData()
        formData.append("photo", photo)
        const reqHeader = { "Content-Type": "multipart/form-data" }
        const result = await addPhoto(tid, formData, reqHeader)
        if (result.status == 200) {
            toast.success("Photo uploaded successfully")
            setAddStatus(result)
            setPhotoDet({ photo: "" })
            handleClose()
        } else {
            toast.error(result.response.data)
        }
    }

    return (
        <>
            <div className='d-flex justify-content-between' style={{ marginLeft: "500px"}} onClick={handleShow}>
                <h6 style={{marginTop:"-10px"}}>Upload your memmories here..</h6>
                <i className="fa-solid fa-camera-retro fa-2xl"></i>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Post your Memmory</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                            <label >
                                <input type="file" name='' id='in' style={{ display: 'none' }} onChange={(e) => setPhotoDet({ ...photoDet, photo: e.target.files[0] })} />
                                <img className='img-fluid w-100' src={preview ? preview : "https://png.pngtree.com/png-vector/20190214/ourmid/pngtree-vector-gallery-icon-png-image_515223.jpg"} alt="" />
                            </label>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpload}>Upload</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddPhoto