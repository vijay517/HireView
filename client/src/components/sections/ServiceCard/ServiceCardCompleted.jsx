import React, { Component } from 'react'
import ReviewStar from '../ReviewStar/ReviewStar';
import "./ServiceCard.css"

export default class ServiceCardCompleted extends Component {

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.target.style.color = e.target.style.color == "black" ? "red" : "black";
    }

    render() {
        const imageBase64 = this.props.service.image;

        return (
            <div className='service-card-page'>
                <div className='card'>
                    <div>
                        <img src={imageBase64} alt="" />
                    </div>
                    <div className='service-card-category'>
                        <p> {this.props.service.category}</p>
                        <i value={this.props.service.transactionID} id='heart' className="fa fa-heart" onClick={this.handleClick}> </i>
                    </div>
                    <p> {this.props.service.name}</p>
                    <p> {this.props.service.description}</p>
                    <p> ${this.props.service.finalprice}</p>
                    <p> Completed: {this.props.service.time}</p>
                    <ReviewStar review={this.props.service.review} />
                    <button> Review </button>
                </div>
            </div>
        )
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
        price
        time
        review: {reviews, stars}
    }
}

*/
