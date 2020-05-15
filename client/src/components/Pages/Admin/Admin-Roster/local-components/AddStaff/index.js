import React, { Component } from 'react';
import './style.css';

import M from 'materialize-css';

import API from '../../../../../../utils/API'


function validate(state) {
    // true means invalid, so our conditions got reversed
    return {
        firstName: state.firstName == null,
        lastName: state.lastName == null,
        pin: state.pin == null,
        password: state.password == null
    };
}


class AddStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                firstName: null,
                lastName: null,
                displayName: null,
                pin: null,
                password: null
            }
        };
    }


    componentDidMount() {
        M.AutoInit();

    }

    //Takes change in from form and updates state
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

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.canBeSubmitted()) {
            // Sends new Item to DB, success / fail toasts
            let formData = this.state.formData;
            formData.displayName = formData.firstName.charAt(0).toUpperCase() + formData.firstName.slice(1) + ' ' + formData.lastName.charAt(0).toUpperCase() + formData.lastName.slice(1);
           
            API.addNewStaff('session placeholder', formData)
                .then(res => {
                    // toast item added
                    M.toast({
                        html: res.data.displayName + ' Added!',
                        classes: 'greenToast'
                    });

                    // Clear text inputs
                    this.refs.form.reset();
                    //refresh parent
                   // this.props.updateOnNewItem();
                })
                .catch(res => {
                    M.toast({
                        html: 'Unable To Add Item',
                        classes: 'redToast'
                    });
                    console.log(res)
                });
        } else {
            M.toast({ html: 'Error Adding Staff', classes: 'redToast' });
        }
    };
    canBeSubmitted() {
        const errors = validate(this.state.formData);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    }

    render() {
        const errors = validate(this.state.formData);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        return (
            <div className="conatainer">
                <form
                    className="col s12"
                    onSubmit={this.handleFormSubmit}
                    ref="form"
                >
                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                id="firstName"
                                type="text"
                                className="validate invalid"
                                required=""
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="firstName">First</label>
                        </div>
                        <div className="input-field col s6">
                            <input
                                id="lastName"
                                type="text"
                                className="validate invalid"
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="lastName">Last</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                id="pin"
                                type="number" pattern="[0-9]*"
                                inputMode="numeric"
                                className="validate invalid"
                                value={this.state.inputVal}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="pin">TG Pin</label>
                        </div>
                        <div className="input-field col s6">
                            <input
                                id="password"
                                type="password"
                                className="validate invalid"
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>

                    <div className="row">
                        <a
                            href="#!"
                            disabled={isDisabled}
                            className="waves-effect waves-green btn-flat"
                            onClick={this.handleFormSubmit}
                        >
                            Add
                        </a>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddStaff;
