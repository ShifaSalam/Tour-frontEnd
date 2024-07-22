import React from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <footer className=' bg-light shadow'>
        <Container>
          <Row>
            <Col lg='3'>
              <div className="">
                <img src="https://clipart-library.com/images_k/travel-clipart-transparent/travel-clipart-transparent-24.png" style={{ height: "200px" }} alt="" />
                <p style={{ textAlign: 'justify' }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus culpa nihil
                  animi repellat, eaque commodi nisi blanditiis.
                </p>

                <div className="d-flex align-items-center gap-4">
                  <span>
                    <a href='https://www.youtube.com/' target='_blank'>
                      <i className="fa-brands fa-youtube" style={{ color: "#000000" }}></i>
                    </a>
                  </span>
                  <span>
                    <a href='https://github.com' target='_blank'>
                      <i className="fa-brands fa-github" style={{ color: "#000000" }}></i>
                    </a>
                  </span>
                  <span>
                    <a href='https://www.facebook.com/' target='_blank'>
                      <i className="fa-brands fa-square-facebook" style={{ color: "#000000" }}></i>
                    </a>
                  </span>
                  <span>
                    <a href='https://www.instagram.com/' target='_blank'>
                      <i className="fa-brands fa-instagram" style={{ color: "#000000" }}></i>
                    </a>
                  </span>
                </div>
              </div>
            </Col>

            <Col lg='3' className='p-5'>
              <h5>Discover</h5>
              <ListGroup className=''>
                <Link className='text-decoration-none text-dark py-3' to={'/'}>Home</Link>
                <Link className='text-decoration-none text-dark'>About</Link>
                <Link className='text-decoration-none text-dark py-3' to={'/tours'}>Tours</Link>
              </ListGroup>
            </Col>

            <Col lg='3' className='p-5'>
              <h5>Quick Links</h5>
              <ListGroup className=''>
                <Link className='text-decoration-none text-dark py-3' to={'/gal'}>Gallery</Link>
                <Link className='text-decoration-none text-dark' to={'/login'}>Login</Link>
                <Link className='text-decoration-none text-dark pt-3' to={'/reg'}>Register</Link>
                <Link className='text-decoration-none text-dark py-3' to={'/adminlogin'}>Admin Panel</Link>
              </ListGroup>
            </Col>

            <Col lg='3' className='p-5'>
              <h5 className=''>Contact</h5>

              <ListGroup className=''>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                  <div className='ps-2'>
                    <h6><span><i className="fa-sharp fa-solid fa-location-dot"></i></span> Address : Calicut, Kerala </h6>
                  </div>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                  <div className='ps-2'>
                    <h6><span><i className="fa-regular fa-envelope"></i></span> Email : Zehra.n@gmail.com </h6>
                  </div>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                  <div className='ps-2'>
                    <h6><span><i className="fa-solid fa-phone"></i></span> Phone : +919644505364 </h6>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </Col>

            <Col lg='12' className='text-center pt-5'>
              <p className='copyright'>&copy; 2024, designed and developed by Fathima Shifa. </p>
            </Col>

          </Row>
        </Container>
      </footer>
    </>
  )
}

export default Footer