import React, { Component, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import NavBar from '../../sections/NavBar/NavBar'
import UserProfileBar from '../../sections/UserProfileBar/UserProfileBar'
import ServiceCardListing from '../../sections/ServiceCard/ServiceCardListing'
import "./UserHomePage.css"
import PAGES from "../../enums"
import { getAllAvailableServices } from "../../helper/HelperFucntion";

class Page extends Component {
    constructor() {
        super()
        this.state = { "minPrice": 0, "maxPrice": 0, "minRating": 1, listings: [], filteredListings: [] }
        this.onChange = this.onChange.bind(this)
    }

    onChange() {
        const searchKeyword = document.getElementById("search-bar").value.trim().toLowerCase()
        const categoryOption = document.getElementById("category-option").value.trim().toLowerCase()
        const minPrice = document.getElementById("min-price").value.trim()
        const maxPrice = document.getElementById("max-price").value.trim()
        const minReviews = document.getElementById("min-rating").value.trim()

        var filteredListings = this.state.listings

        //filter by search keyword
        if (searchKeyword.length != 0) {
            filteredListings = filteredListings.filter(obj => obj.name.toLowerCase().startsWith(searchKeyword))
        }

        //filter by category option
        if (categoryOption.length != 0) {
            filteredListings = filteredListings.filter(obj => obj.category.toLowerCase().startsWith(categoryOption))
        }

        //filter by min price
        if (minPrice.length != 0) {
            filteredListings = filteredListings.filter(obj => parseInt(obj.lowerrange) >= parseInt(minPrice))
        }

        //filter by maxprice
        if (maxPrice.length != 0) {
            if (minPrice.length == 0 || minPrice.length != 0 && Number(minPrice) < Number(maxPrice)) {
                filteredListings = filteredListings.filter(obj => parseInt(obj.upperrange) <= parseInt(maxPrice))
            }
        }

        //filter by min reviews
        if (minReviews.length != 0) {
            const n = minReviews.replace(/\+/g, '');
            filteredListings = filteredListings.filter(obj => obj.review.stars >= Number(n))
        }

        //set state after filtering
        this.setState({ filteredListings: filteredListings })

    }

    async onLoad() {
        var services = await getAllAvailableServices();
        var newlycreated = [];

        services.forEach((service) => {
            if (service.transaction_id === 0) {
                var listing = {
                    "id": service.id,
                    "transactionID": service.transaction_id,
                    "professionalId": service.professional_id,
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
                newlycreated.push(listing);
            }
        });
        this.setState({ "listings": newlycreated, filteredListings: newlycreated })
    }

    componentDidMount() {
        this.onLoad();
    }

    render() {
        return (
            <div className='user-home-page'>
                <NavBar />
                <div className="listing-container">
                    <UserProfileBar></UserProfileBar>
                    <div className='listings'>
                        <div className='filter-bar'>

                            <div>
                                <input onChange={this.onChange} name="search" id="search-bar" placeholder='Search Transactions By Name' />
                            </div>

                            <div className="filter">
                                <label htmlFor="category">Category</label>
                                <select name="category" id="category-option" onChange={this.onChange}>
                                    <option value=""></option>
                                    <option value="Electrical Works">Electrical Works</option>
                                    <option value="Aircon Service">Aircon Service</option>
                                    <option value="Plumbing Works">Plumbing Works</option>
                                    <option value="Window Works">Window Works</option>
                                    <option value="Painting Works">Painting Works</option>
                                </select>
                            </div>

                            <div className="filter">
                                <label htmlFor="minPrice">Min Price</label>
                                <input type="number" id="min-price" name="minPrice" onChange={this.onChange}></input>
                            </div>

                            <div className="filter">
                                <label htmlFor="maxPrice">Max Price</label>
                                <input type="number" id="max-price" name="maxPrice" onChange={this.onChange}></input>
                                <></>
                            </div>

                            <div className="filter">
                                <label htmlFor="minRating">Min Rating</label>
                                <select name="minRating" id="min-rating" onChange={this.onChange}>
                                    <option value="1">1+</option>
                                    <option value="2">2+</option>
                                    <option value="3">3+</option>
                                    <option value="4">4+</option>
                                    <option value="5">5+</option>
                                </select>
                            </div>

                        </div>

                        <div className='listing-card'>
                            <CreateListing listings={this.state.filteredListings}></CreateListing>
                        </div>
                    </div>
                </div>
                <></>
            </div>
        )
    }
}

function CreateListing(props) {
    const listing = [];
    for (let i = 0; i < props.listings.length; i += 3) {

        const row = <div className='row'>
            <ServiceCardListing key={i} service={props.listings[i]} />
            {i + 1 < props.listings.length && <ServiceCardListing key={i + 1} service={props.listings[i + 1]} />}
            {i + 2 < props.listings.length && <ServiceCardListing key={i + 2} service={props.listings[i + 2]} />}

            {i + 1 >= props.listings.length && <div key={i + 1} style={{ width: "250px" }}></div>}
            {i + 2 >= props.listings.length && <div key={i + 2} style={{ width: "250px" }}></div>}
        </div>
        listing.push(row)
    }

    return (
        <>
            {listing}
        </>
    )
}

export default function UserHomePage() {
    const navigate = useNavigate();
    const userid = localStorage.getItem("user")

    //navigate to home page if the user variable is not found
    useEffect(() => {
        if (!userid)
            navigate(PAGES["home-page"]);
    }, [navigate])

    //else naviagate to user home page
    if (userid) {
        return <Page userid={userid} navigate={navigate} />
    }
}