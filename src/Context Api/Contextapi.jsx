import React, { createContext, useState } from 'react'


export const addTourResponseContext = createContext()
export const editTourResponseContext = createContext()

function Contextapi({ children }) {

    const [addTourResponse, setAddTourResponse] = useState("")
    const [editTourResponse, setEditTourResponse] = useState("")
    return (
        <>
            <addTourResponseContext.Provider value={{ addTourResponse, setAddTourResponse }}>
                    <editTourResponseContext.Provider value={{ editTourResponse, setEditTourResponse }}>
                        {children}
                    </editTourResponseContext.Provider>
            </addTourResponseContext.Provider>

        </>
    )
}

export default Contextapi