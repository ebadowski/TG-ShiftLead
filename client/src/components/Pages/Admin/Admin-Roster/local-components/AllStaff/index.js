import React, { Component } from 'react';
import './style.css';

import M from 'materialize-css';

import StaffCell from './local-components/StaffCell';
import API from '../../../../../../utils/API'



class AllStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staffList: []
        };
    }


    componentDidMount() {
        M.AutoInit();

        this.getStaff()
    }

    getStaff() {
        API.getAllStaff('session placeholder')
            .then(res => {
                this.setState({ staffList: res.data })
            })
            .catch(res => {
                M.toast({
                    html: 'Error Getting Staff',
                    classes: 'redToast'
                });
                console.log(res)
            });
    }


    render() {

        return (
            <div className="conatainer">
               <ul>
                    {this.state.staffList.map(
                        (staffMember, keyIndex) => (
                            <StaffCell 
                            staffMember={staffMember}
                            />
                        )
                    )}
               </ul>
            </div>
        );
    }
}

export default AllStaff;
