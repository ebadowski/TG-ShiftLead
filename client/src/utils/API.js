import axios from 'axios';

export default {

    //STAFF
    //Get All Staff
    getAllStaff: session => {
        return axios.get('/api/staff')
    },
    //Add New Staff Member
    addNewStaff: (session, body) => {
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
    // Retrieve session user from session token
    getSession: session => {
        return axios.get('/session', {
            headers: { 'x-session-token': session }
        });
    },
    confirmPassword: (email, password, session) => {
        console.log(email, password, session)
        return axios.post('/password', {
            headers: { 'x-session-token': session },
            email: email,
            password: password
        });
    }
}
