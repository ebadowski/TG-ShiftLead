import React, { Component } from 'react';


class AdminInsight extends Component {
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
                    HELLO
                </div>
            </div>
        );
    }
}
export default AdminInsight;
