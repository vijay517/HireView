import React, { Component, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import NavBar from "../../sections/NavBar/NavBar";
import UserProfileIcon from "../../sections/UserProfileIcon/UserProfileIcon";
import ServiceCardProgress from '../../sections/ServiceCard/ServiceCardProgress';
import ServiceCardCompleted from '../../sections/ServiceCard/ServiceCardCompleted';
import ServiceCardTerminated from '../../sections/ServiceCard/ServiceCardTerminated';
import "./UserTransactionPage.css"
import PAGES from "../../enums"
import { getUserInfoById, getServicesByUser } from "../../helper/HelperFucntion";

class Page extends Component {

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.state = {name:"", currentTransactions: [], completedTransactions: [], terminatedTransactions: [], view: 1 }
    }

    handleClick(e) {
        const value = e.target.innerText;
        if (value === "In-progress") {
            this.setState({ view: 1 });
        } else if (value === "Completed") {
            this.setState({ view: 2 });
        } else if (value === "Terminated") {
            this.setState({ view: 3 });
        }
    }
    async onLoad() {
        var userInfo = await getUserInfoById(this.props.userid);
        var services = await getServicesByUser(this.props.userid);
        var userName = userInfo.firstName + " " + userInfo.lastName;
        var profilepic = userInfo.profilepic;
        this.setState({ name: userName })
        this.setState({ profile: profilepic })
        var current = [];
        var completed = [];
        var terminated = [];

        services.forEach((service) => {
            if (service.transaction_id === 1) {
                var ip = {
                    "transactionID": service.transaction_id,
                    "professionalId" : service.professional_id,
                    "image": service.imageBase64,
                    "name": service.name,
                    "description": service.description,
                    "category": service.category,
                    "lowerrange": service.lowerrange,
                    "upperrange": service.upperrange,
                    "finalprice": service.finalprice,
                    "scheduled_time": service.scheduled_time,
                    "review": { "reviews": service.review_ids.length, "stars": 3 } // Need to fix later
                };
                current.push(ip);
            } else if (service.transaction_id === 2) {
                var ct = {
                    "transactionID": service.transaction_id,
                    "professionalId" : service.professional_id,
                    "image": service.imageBase64,
                    "name": service.name,
                    "description": service.description,
                    "category": service.category,
                    "lowerrange": service.lowerrange,
                    "upperrange": service.upperrange,
                    "finalprice": service.finalprice,
                    "scheduled_time": service.scheduled_time,
                    "review": { "reviews": service.review_ids.length, "stars": 3 } // Need to fix later
                };
                completed.push(ct);
            } else if (service.transaction_id === 3) {
                var tt = {
                    "transactionID": service.transaction_id,
                    "professionalId" : service.professional_id,
                    "image": service.imageBase64,
                    "name": service.name,
                    "description": service.description,
                    "category": service.category,
                    "lowerrange": service.lowerrange,
                    "upperrange": service.upperrange,
                    "finalprice": service.finalprice,
                    "scheduled_time": service.scheduled_time,
                    "review": { "reviews": service.review_ids.length, "stars": 3 } // Need to fix later
                };
                terminated.push(tt);
            }
        });

        this.setState({ currentTransactions: current, completedTransactions: completed, terminatedTransactions: terminated })
    }

    componentDidMount() {
        this.onLoad();
    }

    render() {
        return (
            <div className='user-page'>
                <NavBar />
                <div className='container'>
                    <div className='profile-container'>
                        <UserProfileIcon name={this.state.name} imageBase64={this.state.profile} />
                    </div>
                    <div>
                        <div className='options'>
                            <div>
                                <i onClick={()=>{this.props.navigate(PAGES["user-home-page"])}} id="back-arrow-icon" class="fa fa-arrow-left" aria-hidden="true"></i>
                                <a onClick={this.handleClick}>{this.state.view === 1 ? <u>In-progress</u> : "In-progress"}</a>
                                <a onClick={this.handleClick}>{this.state.view === 2 ? <u>Completed</u> : "Completed"}</a>
                                <a onClick={this.handleClick}>{this.state.view === 3 ? <u>Terminated</u> : "Terminated"}</a>
                            </div>
                            <button onClick={() => { this.props.navigate(PAGES["user-profile-page"], { userinfo: this.state.userinfo }) }}>Edit Profile</button>
                        </div>

                        <div className='service-container'>
                            {this.state.view === 1 && <h2>Transactions (In-Progress)</h2>}
                            {this.state.view === 2 && <h2>Transactions (Completed)</h2>}
                            {this.state.view === 3 && <h2>Transactions (Terminated)</h2>}

                            <i id="search-icon" className='fa fa-search'></i>
                            <input type="search" name="" id="" placeholder='Search Transactions' />
                            <div className='navbar'>

                            </div>
                            <div className='transaction-containers'>
                                {this.state.view === 1 && <CreateInProgressListings currentTransactions={this.state.currentTransactions} />}
                                {this.state.view === 2 && <CreateCompletedListings completedTransactions={this.state.completedTransactions} />}
                                {this.state.view === 3 && <CreateTerminatedListings terminatedTransactions={this.state.terminatedTransactions} />}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

function CreateInProgressListings(props) {
    const listing = [];
    for (let i = 0; i < props.currentTransactions.length; i += 2) {

        const row = <div className='row'>
            <ServiceCardProgress key={i} service={props.currentTransactions[i]} />
            {i + 1 < props.currentTransactions.length && <ServiceCardProgress key={i + 1} service={props.currentTransactions[i + 1]} />}
            {i + 1 >= props.currentTransactions.length && <div style={{ width: "250px" }}></div>}
        </div>
        listing.push(row)
    }

    return (
        <>
            {listing}
        </>
    )
}

function CreateCompletedListings(props) {
    const listing = [];
    for (let i = 0; i < props.completedTransactions.length; i += 2) {

        const row = <div className='row'>
            <ServiceCardCompleted key={i} service={props.completedTransactions[i]} />
            {i + 1 < props.completedTransactions.length && <ServiceCardCompleted key={i + 1} service={props.completedTransactions[i + 1]} />}
            {i + 1 >= props.completedTransactions.length && <div style={{ width: "250px" }}></div>}
        </div>
        listing.push(row)
    }

    return (
        <>
            {listing}
        </>
    )
}

function CreateTerminatedListings(props) {
    const listing = [];
    for (let i = 0; i < props.terminatedTransactions.length; i += 2) {

        const row = <div className='row'>
            <ServiceCardTerminated key={i} service={props.terminatedTransactions[i]} />
            {i + 1 < props.terminatedTransactions.length && <ServiceCardTerminated key={i + 1} service={props.terminatedTransactions[i + 1]} />}
            {i + 1 >= props.terminatedTransactions.length && <div style={{ width: "250px" }}></div>}
        </div>
        listing.push(row)
    }

    return (
        <>
            {listing}
        </>
    )
}

export default function UserTransactionPage() {
    const navigate = useNavigate();
    const userid = localStorage.getItem("user")

    //navigate to home page if the user variable is not found
    useEffect(() => {
        if (!userid) {
            navigate(PAGES["home-page"]);
        }
    }, [navigate, userid]);
    
    //else naviagate to user home page
    if (userid) {
        return <Page userid={userid} navigate={navigate} />
    }
}

/**
 * User page should take in the user id as the prop to render
 */