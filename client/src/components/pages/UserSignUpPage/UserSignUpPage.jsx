import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import NavBar from '../../sections/NavBar/NavBar';
import "./UserSignUpPage.css";
import { registerUser } from "../../helper/HelperFucntion";

import PAGES from '../../enums';

class Page extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.userSignUp;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const postalCode = parseInt(form.postalCode.value);
        const address = form.address.value;
        const email = form.email.value;
        const password = form.password.value;
        const confimrPassword = form.confirmPassword.value;
        const phone = parseInt(form.phone.value);
        const inputuser = {
            firstName: firstName,
            lastName: lastName,
            postalcode: postalCode,
            address: address,
            email: email,
            phone: phone,
            password: password
        };

        if (password !== confimrPassword) {
            const label = document.getElementById("mismatchingPassword");
            label.style.visibility = "visible";
            return
        }

        var registededData = await registerUser(inputuser);
        console.log("registededData: ", registededData);
        form.reset();
        let routing = "/user-sign-up";

        if (registededData) {
            routing = PAGES["login-page"];
            console.log("Navigating to the routing: ", routing);
            this.props.navigate(routing);
        }


        form.reset();
    }

    render() {
        return (
            <div className='signuppage'>
                <NavBar />
                <div className='signUpPage-container'>
                    <div className='sideCard-container'>
                        <div>
                            <h2>Sign-Up as our User!</h2>
                            <p>We need you to help us with some basic informaton for your account creation</p>
                        </div>
                        <img />
                    </div>
                    <div className="form-container">
                        <form name='userSignUp' onSubmit={this.handleSubmit}>
                            <div className='form'>
                                <div className='left-form'>
                                    <label htmlFor='firstName'>First Name</label>
                                    <input type="text" name='firstName' required />

                                    <label htmlFor="postalCode">Postal Code</label>
                                    <input type="number" name="postalCode" id="" required />

                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" id="" required />

                                    <label htmlFor="password">Set Password</label>
                                    <input type="password" name="password" id="" required />
                                </div>

                                <div className='right-form'>
                                    <label htmlFor='lastName'>Last Name</label>
                                    <input type="text" name='lastName' required />

                                    <label htmlFor="address">Address</label>
                                    <input type="address" name="address" id="" required />

                                    <label htmlFor="phone">Contact Number</label>
                                    <input type="number" name="phone" id="" required />

                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input type="password" name="confirmPassword" id="" required />
                                    <label id='mismatchingPassword'>*Mismatching password</label>
                                </div>
                            </div>


                            <p>*By Submitting my details, I state that I have understood and agree to the terms and conditons.</p>
                            <input type="submit" value="Submit" />

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default function UserSignUpPage() {

    const navigate = useNavigate()

    return <Page navigate={navigate} />

}