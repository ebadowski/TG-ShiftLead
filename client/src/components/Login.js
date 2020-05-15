import React, { Component } from 'react';
import API from '../utils/API';

class Login extends Component {
    state = {
        pin: null
    };

    handleChange = event => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = event.target;
        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        API.login({
            pin: this.state.pin
        })
            .then(res => {
                localStorage.setItem(
                    'sessionid',
                    res.headers['x-session-token']
                );
                this.props.login(res.data);
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div className="container">
                <div className="login">
                    <div className="container s9">
                        <div className="row">
                            <div className="card-panel white">

                                <form onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <input
                                                id="pin"
                                                name="pin"
                                                type="number"
                                                pattern="^[0-9]{4}$"
                                                maxLength="4"
                                                inputMode="numeric"
                                                className="validate invalid"
                                                value={this.state.pin}
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="pin">Pin</label>
                                        </div>
                                    </div>
                                    <p>
                                        <button type="submit" className="btn btn-blue">
                                            Log in
                            </button>
                                    </p>
                                </form>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default Login;
