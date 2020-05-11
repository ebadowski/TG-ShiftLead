import React, { Component } from 'react';
import './style.css';



class AddStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    // componentWillReceiveProps(nextProps) {
    //     
    // }

    componentDidMount() {


    }

    handleInputChange = event => {
        let field = event.target.id;
        let value =
            event.target.value === 'true'
                ? true
                : event.target.value === 'false'
                    ? false
                    : event.target.value;

        this.state.formData[field] = value;
        this.forceUpdate();
    };

    render() {
        return (
            <div className="conatainer">
                <form>
                    <input
                        id="name"
                        type="text"
                        className=""
                        required=""
                        onChange={this.handleInputChange}
                    />
                </form>
            </div>
        );
    }
}

export default AddStaff;
