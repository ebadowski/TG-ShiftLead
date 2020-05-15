import React, { Component } from 'react';
import './style.css';

import M from 'materialize-css';



class StaffCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staffMember: props.staffMember
        };
    }


    componentDidMount() {
        M.AutoInit();

    }

    

    render() {

        return (
            <li>
                {this.state.staffMember.displayName}
            </li>
        );
    }
}

export default StaffCell;
