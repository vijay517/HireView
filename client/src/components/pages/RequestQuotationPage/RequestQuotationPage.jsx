import React, { Component, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import NavBar from '../../sections/NavBar/NavBar'
import UserProfileBar from '../../sections/UserProfileBar/UserProfileBar'
import "./RequestQuotationPage.css"
import { createQuoteRequest, approveQuoteRequest, setServiceInProgress } from "../../helper/HelperFucntion";
import PAGES from "../../enums"
import ServiceCardQuotation from '../../sections/ServiceCard/ServiceCardQuotation';

class Page extends Component {
    constructor() {
        super()
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.userid = localStorage.getItem("user");
    }

    onLoad() {
    }

    resizeTextBox() {
        let textarea = document.querySelector(".resize-ta");
        let numberOfLineBreaks = (textarea.value.match(/\n/g) || []).length;
        let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
        textarea.style.height = newHeight + "px";
    }

    componentDidMount() {
        this.onLoad();
    }

    async handleSubmit(e) {
        e.preventDefault()
        const form = document.forms.quoterequest;
        const serviceDetail = form.querySelector(".resize-ta").value;
        const selectedRadioValue = form.querySelector('input[name="date"]:checked').value;
        const serviceId = this.props.service.id;
        let serviceTime;

        if (selectedRadioValue === "0") {
            serviceTime = "Immediate";
        } else {
            serviceTime = form.querySelector('input[type="date"]').value;
        }
        
        const inputRequest = {
            user_id: this.userid,
            service_id: serviceId,
            explanation: serviceDetail,
            service_time: serviceTime
        };
        const result = await createQuoteRequest(inputRequest);
        console.log("Response result from server from createQuoteRequest: ", result);

        // Since the professional side's console interface is not implemented,
        // the following code serves as a mock implementation 
        // to simulate the process of sending a quote request to a professional,
        // having the request approved, updating the service status to 'in progress' (1), 
        // and displaying it on the User's Transaction screen.
        const requestId = result.id;
        const isApproved = await approveQuoteRequest(requestId); 
        if(isApproved){
            let updateStatusForService = {
                "id": serviceId,
                "transaction_id": 1,
                "user_id": this.userid,
            };
            const isStatusUpdated = await setServiceInProgress(updateStatusForService);
            console.log("isStatusUpdated: ", isStatusUpdated);
            if (isStatusUpdated){
                this.props.navigate(PAGES["user-transactions-page"])
            }else{
                console.group("Failed updating a service");
            }
        }
    }
        
    render() {
        return (
            <div className='request-quotation-page'>
                <NavBar />
                <div className="review-container">
                    <UserProfileBar></UserProfileBar>
                    <div className='review-card'>
                        <div className='card-1'>
                            <div className='card-1-heading'>
                                <i onClick={() => { this.props.navigate(PAGES["user-home-page"]) }} className="fa fa-arrow-left" aria-hidden="true"></i>
                                <h2>Request Quotation</h2>
                            </div>
                            <ServiceCardQuotation service={this.props.service} />
                        </div>

                        <div className='card-2'>
                            <form name='quoterequest' onSubmit={this.handleSubmit}>
                                <span>Provide detail of the service needed</span>
                                <textarea placeholder='e.g. my kitchen sink pipe is leaking.' onKeyUp={this.resizeTextBox} class="textarea resize-ta"></textarea>

                                <span>Select Service Time</span>
                                <br />
                                <input type="radio" value="0" name='date' />
                                <label>Immediate(Less than 6 hours)</label>
                                <br />

                                <input type="radio" value="1" name='date' />
                                <label>Specific period</label>

                                <input type='date'></input>

                                <input type='submit' value="Request for quotation" />
                            </form>

                        </div>
                    </div>
                </div>
                <></>
            </div>
        )
    }
}


export default function RequestQuotationPage(props) {
    const navigate = useNavigate();
    const user = localStorage.getItem("user")
    var service = localStorage.getItem("quotation-service")
    service = JSON.parse(service)

    //navigate to home page if the user variable is not found
    useEffect(() => {
        if (!user)
            navigate(PAGES["home-page"]);
    }, [navigate])

    //else naviagate to user home page
    if (user) {
        return <Page user={user} navigate={navigate} service={service} />
    }
}
