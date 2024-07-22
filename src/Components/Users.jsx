import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { getUsers } from '../Services/allApis'

function Users() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUsers()
    }, [])

    const getAllUsers = async () => {
        const result = await getUsers()
        if (result.status == 200) {
            setUsers(result.data)
        }
        else {
            console.log(result.response.data)
        }
    }
    console.log(users)

    return (
        <>
            <div className='my-5' >
                <h3 className='text-center'><b>Users</b></h3>

                <Row>
                    {
                        users.length > 0 ?
                            users.map(item => (
                                <Col md='4' className='d-flex justify-content-center'>
                                    <div className='w-100 bg-light shadow mt-5 p-3'>
                                        <div className='d-flex justify-content-between'>
                                            <h3>User Name : {item.username}</h3>
                                        </div>
                                        <h4>Email : {item.email}</h4>
                                    </div>
                                </Col>
                            )) :
                            <h5>No Users!</h5>
                    }
                </Row>

            </div>
        </>
    )
}

export default Users