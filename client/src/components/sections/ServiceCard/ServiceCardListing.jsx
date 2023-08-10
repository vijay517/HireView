import React, { Component, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import PAGES from "../../enums"
import ReviewStar from '../ReviewStar/ReviewStar';
import "./ServiceCard.css"

class Listing extends Component {

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.target.style.color = e.target.style.color == "black" ? "red" : "black";
    }

    render() {
        return (
            <div className='service-card-page'>
                <div className='card'>
                    <div>
                        <img src={this.props.service.image} alt="" />
                    </div>
                    <div className='service-card-category'>
                        <p> {this.props.service.category}</p>
                        <i value={this.props.service.transactionID} id='heart' className="fa fa-heart" onClick={this.handleClick}> </i>
                    </div>
                    <p> {this.props.service.name}</p>
                    <p> ${this.props.service.lowerrange} - ${this.props.service.upperrange}</p>
                    <p> {this.props.service.description}</p>
                    <ReviewStar review={this.props.service.review} />
                    <button onClick={() => { localStorage.setItem("quotation-service", JSON.stringify(this.props.service)); this.props.navigate(PAGES["user-requestion-quotation-page"]) }}> Request for Quotation </button>
                </div>
            </div>
        )
    }
}


export default function ServiceCardListing(props) {
    const navigate = useNavigate();
    const user = localStorage.getItem("user")

    //navigate to home page if the user variable is not found
    useEffect(() => {
        if (!user)
            navigate(PAGES["home-page"]);
    }, [navigate])

    //else naviagate to user home page
    if (user) {
        const userid = "@vijay";
        return <Listing userid={userid} navigate={navigate} service={props.service} />
    }
}

/*props used
{
    service : {
        transactionID
        image
        name
        category
        company
        priceLower
        priceUpper
        warrenty
        review: {reviews, stars}
    }
}

*/