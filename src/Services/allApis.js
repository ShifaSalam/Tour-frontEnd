import { commonApi } from "./commonApi";
import base_url from "./base_url";


// __ADMIN SIDE__

// add tours
export const addTours=async(data,header)=>{
    return await commonApi("POST",`${base_url}/create-tour`,data,header)
}

// get all tour packages
export const allTours=async(search)=>{
    return await commonApi("GET",`${base_url}/all-tours?search=${search}`,"","")
}

// to edit tour packages
export const editTours=async(id,data,header)=>{
    return await commonApi("PUT",`${base_url}/edit-tours/${id}`,data,header)
}

// delete-tour packages
export const deleteTour=async(id,header)=>{
    return await commonApi("DELETE",`${base_url}/delete-tours/${id}`,{},header)
}

// get booking details
export const getBooking=async()=>{
    return await commonApi("GET",`${base_url}/all-booking`,"","")
}

// to cancel bookings
export const cancelBooking=async(id)=>{
    console.log(id,"Bokking")
    return await commonApi("DELETE",`${base_url}/cancel-booking/${id}`,{},"")
}

// get client details 
export const getUsers=async()=>{
    return await commonApi("GET",`${base_url}/allusers`,"","")
}


// __CLIENT SIDE__

// Authentication

// register
export const userRegister=async(data)=>{
    return await commonApi("POST",`${base_url}/register`,data,"")
}

// Login
export const userLogin=async(data)=>{
    return await commonApi("POST",`${base_url}/login`,data,"")
}

// __Tours__

// get all tour packages to users
export const allUserTours=async(header,search)=>{
    return await commonApi("GET",`${base_url}/all-usertours?search=${search}`,"",header)
}

// home-tours(limitted)
export const homeTours=async(header)=>{
    return await commonApi("GET",`${base_url}/home-tours`,"",header)
}

// to get single tour
export const SingleTour=async(tid,header)=>{
    return await commonApi("GET",`${base_url}/single-tour/${tid}`,"",header)
}

// __Reviews__

// to add reviews
export const addReviews=async(tid,data,header)=>{
    return await commonApi("POST",`${base_url}/add-review/${tid}`,data,header)
}

// to get single tour reviews
export const getReview=async(tid,header)=>{
    return await commonApi("GET",`${base_url}/single-tour/${tid}/reviews`,"",header)
}

// __Photos__

// Add Photos
export const addPhoto=async(tid,data,header)=>{
    return await commonApi("POST",`${base_url}/addphoto/${tid}`,data,header)
}

// __BOOKING__

export const addBooking=async(data)=>{
    return await commonApi("POST",`${base_url}/addbooking`,data,"")
}

export const userBookings=async()=>{
    return await commonApi("GET",`${base_url}/userBooking`,"")
}





