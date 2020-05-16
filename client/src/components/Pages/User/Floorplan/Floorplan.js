import React, { Component } from 'react';


class Floorplan extends Component {
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
                    HELLO FROM UDASH
                </div>
            </div>
        );
    }
}
export default Floorplan;
