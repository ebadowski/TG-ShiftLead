import React, { Component } from 'react';

import AddStaff from './local-components/AddStaff';


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
                    <div className="col s2">Working Staff</div>
                    <div className="col s2">All Staff w/search</div>
                </div>
                <AddStaff />
            </div>
        );
    }
}
export default AdminRoster;
