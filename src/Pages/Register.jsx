import React, { useState } from 'react'
import { Container, Row, Form, Button } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { userRegister } from '../Services/allApis'
import { useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate()
    const [data, setData] = useState({
        username: "", password: "", email: ""
    })

    const handleRegister = async () => {
        const { username, password, email } = data
        if (!username || !password || !email) {
            toast.warning("Enter input details Properly!!")
        }
        else {
            const result = await userRegister(data)
            console.log(result)
            if (result.status == 201) {
                toast.success("User Registration Successfull")
                setData({ username: "", password: "", email: "" })
                navigate('/login')
            }
            else {
                toast.error(result.response.data)
            }
        }
    }
    return (
        <>
            <section style={{ backgroundImage: "url(https://classroomclipart.com/image/static7/preview2/photo-tropical-beach-with-aqua-blue-color-ocean-63680.jpg)", backgroundRepeat: 'no-repeat', backgroundSize: "1700px 1000px", height: "100vh" }}>
                <Container>
                    <Row>
                        <div className='w-75 d-flex justify-content-center' style={{ marginTop: "100px", marginLeft: "170px" }}>
                            <div className=' d-flex justify-content-between shadow-lg  m-5' style={{ boxShadow: "0 1rem 3rem rgba($black, .175)" }}>
                                
                                <div className='pe-5 mx-5'>
                                    <img src="https://quicklaunch.io/wp-content/uploads/2019/10/user-registration.png" height={"300px"} alt="" />
                                </div>

                                <div className='px-5 ' style={{ backgroundColor: "rgb(178 223 252)" }}>
                                    <div className="text-center">
                                        <img src="https://static.vecteezy.com/system/resources/previews/019/879/186/large_2x/user-icon-on-transparent-background-free-png.png" height={"50px"} alt="" />
                                        <h2>Register</h2>
                                    </div>

                                    <div className='mt-4'>
                                        <FloatingLabel controlId="floatingInput" label="Username" >
                                            <Form.Control className='my-2' type="text" placeholder="Username" onChange={(e) => { setData({ ...data, username: e.target.value }) }} />
                                        </FloatingLabel>
                                        <FloatingLabel controlId="floatingInput" label="Email address" >
                                            <Form.Control className='my-2 ' type="email" placeholder="name@example.com" onChange={(e) => { setData({ ...data, email: e.target.value }) }} />
                                        </FloatingLabel>
                                        <FloatingLabel controlId="floatingPassword" label="Password">
                                            <Form.Control className='mb-2' type="password" placeholder="Password" onChange={(e) => { setData({ ...data, password: e.target.value }) }} />
                                        </FloatingLabel>
                                        <Button type='submit' className='btn w-100 mb-2' onClick={handleRegister}>Create Account</Button>
                                    </div>
                                    <p>Already have an account?<Link to='/login' className='text-decoration-none ms-1'>Login</Link></p>
                                </div>

                            </div>
                        </div>
                    </Row>
                </Container>
            </section>

        </>
    )
}

export default Register