import React, { Component, useEffect } from 'react'
import { useNavigate } from "react-router-dom"; import "./UserProfileBar.css"
import PAGES from "../../enums"
import "./UserProfileBar.css"


class Bar extends Component {

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault()
        const text = e.target.innerText
        if (text === "Profile") {
            this.props.navigate(PAGES["user-profile-page"])

        } else if (text === "Liked Services") {

        } else if (text === "Transactions") {
            this.props.navigate(PAGES["user-transactions-page"])

        } else if (text === "Log out") {
            localStorage.removeItem("user")
            this.props.navigate(PAGES["home-page"])
        }
    }

    render() {
        return (
            <div className='user-profile-bar'>
                <div className="container">

                    <div className="icon-container">
                        <i className='fa fa-user-circle'></i>
                        <div onClick={this.handleClick}>Profile</div>
                    </div>

                    <div className="icon-container">
                        <i className='fa fa-heart'></i>
                        <div onClick={this.handleClick}>Liked Services</div>
                    </div>

                    <div className="icon-container">
                        <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                        <div onClick={this.handleClick}>Transactions</div>
                    </div>

                    <div className="icon-container">
                        <i className="fa fa-sign-out" aria-hidden="true"></i>
                        <div onClick={this.handleClick}>Log out</div>
                    </div>
                </div>

            </div>
        )
    }
}

export default function UserProfileBar() {
    const navigate = useNavigate();
    const user = localStorage.getItem("user")

    //navigate to home page if the user variable is not found
    useEffect(() => {
        if (!user)
            navigate(PAGES["home-page"]);
    }, [navigate])

    //else naviagate to user home page
    if (user) {
        const userid = "vijay";
        return <Bar userid={userid} navigate={navigate} />
    }
}