import axios from 'axios';

export default {

//STAFF
//Get All Staff
getAllStaff: session => {
    return axios.get('/api/staff')
},
//Add New Staff Member
addNewStaff:(session, body) => {
    return axios.post('/api/staff', body)
}




}
