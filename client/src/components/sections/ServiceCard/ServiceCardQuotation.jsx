import React, { Component } from 'react'
import ReviewStar from '../ReviewStar/ReviewStar'
import "./ServiceCardQuotation.css"


export default class ServiceCardQuotation extends Component {
    render() {
        return (
            <div className='service-card-quotation-page'>
                <div className='image'>
                    <img src={this.props.service} alt="" />
                </div>
                <div className='card-details'>
                <h3>{this.props.service.description}</h3>
                    <p className='category'><b>Cateogory:</b> {this.props.service.category} </p>
                    <p className='company-name'><b>Company Name:</b> {this.props.service.name}</p>
                    <p className='price-range'><b>Price Range:</b> ${this.props.service.lowerrange}-${this.props.service.upperrange}</p>
                    <ReviewStar review={{reviews:3, stars:3}} />
                </div>

            </div>
        )
    }
}


