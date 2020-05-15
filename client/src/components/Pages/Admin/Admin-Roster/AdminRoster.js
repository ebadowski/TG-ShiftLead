import React, { Component } from 'react';

import AddStaff from './local-components/AddStaff';
import AllStaff from './local-components/AllStaff';

class AdminRoster extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        // this.setState({ dashType: nextProps.type })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s6">Working Staff</div>
                    <div className="col s6">
                        <AllStaff />
                    </div>
                </div>
                <AddStaff />
            </div>
        );
    }
}
export default AdminRoster;
