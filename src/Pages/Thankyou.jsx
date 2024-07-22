import React from 'react'
import {Container, Row, Col, Button} from'react-bootstrap'
import {Link} from'react-router-dom'
import Header from '../Components/Header'

function Thankyou() {
  return (
    <>
    <Header/>
    <section>
        <Container>
            <Row>
                <Col className='pt-5 text-center' style={{margin:"100px"}}>
                    <div>
                        <span>
                        <i className="fa-solid fa-circle-check fa-2xl" style={{color:"#74C0FC"}}></i>
                        </span>
                        <h1 className="my-3 fw-semibold">
                            Thank You 
                        </h1>
                        <h3 className="mb-3">
                            Your Tour is Booked!
                        </h3>
                        <h3>
                            Happy Journey <span><i className="fa-regular fa-face-smile-beam" style={{color:"#74C0FC"}}></i></span>
                        </h3>

                            <Link to='/' className='text-decoration-none text-light btn btn-info mt-2 w-25'>
                                Back to Home
                            </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
    </>
  )
}

export default Thankyou