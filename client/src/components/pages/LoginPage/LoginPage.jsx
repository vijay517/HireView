import React from 'react'
import NavBar from '../../sections/NavBar/NavBar';
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import PAGES from "../../enums";
import { getUserID, graphQLFetch } from "../../helper/HelperFucntion";

class Page extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.authenticate = this.authenticate.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.login;
        const email = form.email.value;
        const password = form.password.value;
        const userType = parseInt(form.userType.value); // ex) User:0, Professional:1
        let userid = "";
        form.reset();

        const loginInfo = {
            email: email,
            password: password,
        }

        const isUserAccepted = await this.authenticate(loginInfo);
        if (isUserAccepted) {
            userid = await getUserID(email);
        }

        let routing = "";
        if (!userType) {
            routing = PAGES["user-home-page"];
        } else {
            alert("Profesional user type feature not implemented. Try logging in as a customer")
            return
        }

        console.log("Navigating to the routing: ", routing);

        if (isUserAccepted) {
            localStorage.setItem("user", userid) //change it to user details later
            this.props.navigate(routing);
        } else{
            const error_message = document.getElementById("error-message")
            error_message.style.visibility = "visible"
        }
    }

    async authenticate(loginInfo) {
        try {
            const query = `query authenticate($loginInfo: InputLogin!)
           { authenticate(loginInfo: $loginInfo) }`;

            const result = await graphQLFetch(query, { loginInfo });
            console.log("Resposen from GQL server: ", { result });

            return result.authenticate;
        } catch (e) {
            alert(`Error in authenticating the traveller : ${e.message}`);
        }
    }

    render() {
        return (
            <div className='login-page'>
                <NavBar />
                <div className='login-container'>
                    <img alt="" />
                    <form name='login' onSubmit={this.handleSubmit}>
                        <h2>Sign in your account</h2>

                        <label htmlFor="email">Email Address</label>
                        <input type="email" name="email" placeholder='Email Address' required />

                        <label htmlFor='password'>Password</label>
                        <input type="password" name="password" placeholder='Password' required />
                        <h4 id="error-message">Invalid user id or password </h4>
                        <label htmlFor='userType'>Log in as:</label>

                        <input type="radio" name="userType" value="0" required />
                        <label htmlFor='userType'>Customer</label>

                        <input type="radio" name="userType" value="1" />
                        <label htmlFor='userType'>Professional</label>

                        <input type="submit" value="Log in" />

                        <p>Forgot your password?</p>
                    </form>
                </div>

            </div>
        )
    }
}

export default function LoginPage() {
    return <Page navigate={useNavigate()} />
}