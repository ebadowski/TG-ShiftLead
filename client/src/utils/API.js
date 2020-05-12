import axios from 'axios';

export default {
//STAFF
//Add New Staff Member
addNewStaff:(session, body) => {
    return axios.post('/api/staff', body)
}




}
