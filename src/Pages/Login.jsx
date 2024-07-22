import React, { useState, useContext } from 'react'
import { Container, Row, Form, Button } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../Services/allApis';
import { Link } from 'react-router-dom'
import { TokenAuthContext } from '../Context Api/AuthContext';

function Login() {

    const { authStatus, setAuthStatus } = useContext(TokenAuthContext)

    const navigate = useNavigate()

    const [data, setData] = useState({
        password: "", email: ""
    })

    const handleLogin = async () => {
        const { email, password } = data
        if (!email || !password) {
            toast.warning("invalid details...enter details properly")
        }
        else {
            const result = await userLogin({ email, password })
            console.log(result)
            if (result.status == 200) {
                sessionStorage.setItem("token", result.data.token)
                sessionStorage.setItem("username", result.data.user)
                sessionStorage.setItem("userDetails", JSON.stringify(result.data.userDetails))
                toast.success("login successfull")
                navigate('/')
                setAuthStatus(true)
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
                    <Row className='d-flex justify-content-center'>
                        <div className='w-75 d-flex justify-content-center' style={{ marginTop: "140px" }}>
                            <div className='d-flex justify-content-between shadow m-5' >

                                <div className='pe-5 mx-5'>
                                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/login-3305943-2757111.png" height={"300px"} alt="" />
                                </div>

                                <div className='px-5' style={{ backgroundColor: "rgb(178 223 252)" }}>
                                    <div className="text-center">
                                        <img src="https://static.vecteezy.com/system/resources/previews/019/879/186/large_2x/user-icon-on-transparent-background-free-png.png" height={"50px"} alt="" />
                                        <h2>Login</h2>
                                    </div>

                                    <div>
                                        <FloatingLabel controlId="floatingInput" label="Email Address" className="mb-2">
                                            <Form.Control type="email" placeholder="name@example.com" onChange={(e) => { setData({ ...data, email: e.target.value }) }} />
                                        </FloatingLabel>
                                        <FloatingLabel controlId="floatingPassword" label="Password " className="mb-2">
                                            <Form.Control type="password" placeholder="Password" onChange={(e) => { setData({ ...data, password: e.target.value }) }} />
                                        </FloatingLabel>
                                        <Button type='submit' className='btn w-100 mb-2' onClick={handleLogin}>Login</Button>
                                    </div>
                                    <p>Don't have an account?<Link to='/reg' className='text-decoration-none ms-1'>Sign Up</Link></p>
                                </div>

                            </div>
                        </div>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Login