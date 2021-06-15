import React, { Component } from 'react';

import { Form, Input, Label, FormGroup, FormFeedback } from 'reactstrap';
import axios from 'axios';
import "./LoginPage.css";

export default class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        data: {
            email: '',
            password: '',
        },
        errors: {}
    });

    handleChange = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            },
            errors: {
                ...this.state.errors,
                [e.target.name]: ''
            }
        });
    }

    validate = () => {
        const { data } = this.state;
        let errors = {};
        if (data.email === '') errors.email = 'User Email can not be blank.';
        if (data.password === '') errors.password = 'Password must be valid.';

        return errors;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { data } = this.state;

        const errors = this.validate();

        localStorage.setItem('data', data.email);
        localStorage.setItem('data-pw', data.password);


        // if (Object.keys(errors).length === 0) {
            
            axios.post('http://localhost/omobio-test/api.php',{data:data})
			.then((res) => {
                console.log(res);
			
			});
           
            // .catch((error) => {
            //     console.log("api Erorr: ", error.response);
            //     if (error.request.status == 400) {
            //         console.log("Error");
            //     }
            //   });
            // //Resetting the form
            // this.setState(this.getInitialState());
        // } else {
            // this.setState({ errors });
        // }
    }

    render() {
        return (
            <div>
                <Form  onSubmit={this.handleSubmit} method="post">
                <div id="username-row">
                    <label for="email" id="email-lbl"><b>Email</b></label>
                    <input
                    name="email"
                        type="email"
                        class="form-control"
                        id="email"
                        onChange={this.handleChange}
                        value={this.state.data.email}
                        placeholder="Enter your email"/>
                </div>

                <div id="pw-row">
                    <label for="name" id="pw-lbl"><b>Password</b></label>
                        <input
                        name="password"
                            type="password"
                            class="form-control"
                            id="pw"
                            placeholder="Enter your password"
                            minlength="8"
                            onChange={this.handleChange}
                            value={this.state.data.password}
                            required/>
                </div>

                <button 
                type="submit" 
                class="signup" 
                id="signup-btn">
                    Sign Up
                </button>
                </Form>
            </div>
        )
    }
}
