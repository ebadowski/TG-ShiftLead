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
},


//AUTH
login: user => {
    return axios.post('/login', user);
},
logout: () => {
    return axios.delete("/login", {
        headers: { "x-session-token": localStorage.getItem("sessionid") }
    })
},

}
