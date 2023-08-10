import React from 'react';
import NavBar from '../../sections/NavBar/NavBar';
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import PAGES from "../../enums"

export default class HomePage extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <>
                <NavBar />
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
                <Section5 />
            </>
        )
    }
}

function Section1() {
    return <div className='intro-image'></div>
}

function Section2() {
    const navigate = useNavigate();

    return (
        <div className='welcome-content'>
            <div className='welcome-content-header'> Welcome to HIREFIX!</div>
            <div className='welcome-content-group'>
                <p>
                    We understand that finding the right service provider for your home repair needs can be a frustrating and time-consuming process. HIREFIX provides a simple and efficient platform you to connect with the best professional based on your needs. You can be rest assured that every professional you find on HireFix is trustworthy, skilled, and committed to providing exceptional service.
                </p>
                <div className='button-group'>
                    <button className='welcome-content-button ' onClick={() => { navigate(PAGES["login-page"]) }}> Login</button>
                    <button className='welcome-content-button ' onClick={() => { navigate(PAGES["user-sign-up-page"]) }}> Sign Up</button>
                    <button className='welcome-content-button'> Register As a professional</button>
                </div>

            </div>
        </div>
    )
}

function Section3() {
    return (
        <div className='icons-container'>
            <div className='icon-group'>
                <div className='icon-group-pair'>
                    <div className='icon plummbing'></div>
                    <div>Plummbing</div>
                    <div>Works</div>
                </div>

                <div className='icon-group-pair'>
                    <div className='icon electrical'></div>
                    <div>Electrical</div>
                    <div>Works</div>
                </div>

                <div className='icon-group-pair'>
                    <div className='icon aircon'></div>
                    <div>Aircon works</div>
                    <div>Works</div>

                </div>

                <div className='icon-group-pair'>
                    <div className='icon window'></div>
                    <div>Window</div>
                    <div>Works</div>
                </div>

                <div className='icon-group-pair'>
                    <div className='icon painting'></div>
                    <div>Painting</div>
                    <div>Works</div>
                </div>

                <div className='icon-group-pair'>
                    <div className='icon others'></div>
                    <div>Other</div>
                    <div>Works</div>
                </div>

            </div>
        </div>
    )
}

function Section4() {

    return (
        <div className='section-4-container'>
            <div className='section-4-header'>
                How to book?
            </div>

            <div className='section-4-line-icons-group'>
                <div className='section-4-line'>

                </div>

                <div className='section-4-icons'>
                    <div className='section-4-icon'>
                        <div className='section-4-icon-1'></div>
                    </div>

                    <div className='section-4-icon'>
                        <div className='section-4-icon-2'></div>
                    </div>

                    <div className='section-4-icon'>
                        <div className='section-4-icon-3'></div>
                    </div>

                    <div className='section-4-icon'>
                        <div className='section-4-icon-4'></div>
                    </div>

                    <div className='section-4-icon'>
                        <div className='section-4-icon-5'></div>
                    </div>
                </div>

                <div className='section-4-icons-des'>
                    <div className='section-4-icon-des'>
                        <div className='section-4-icon-des-header'>1. Select Category</div>
                        <div>Select the type of service you require from our extensive list</div>
                    </div>

                    <div className='section-4-icon-des'>
                        <div className='section-4-icon-des-header'>2. Seek Quotation</div>
                        <div>Upload images on current condition or damage for accurate quotation from preferred service providery</div>
                    </div>

                    <div className='section-4-icon-des'>
                        <div className='section-4-icon-des-header'>3. Confirm Order</div>
                        <div>Upon confirmation,  service provider will deliver service based on mutually accepted timeline</div>
                    </div>

                    <div className='section-4-icon-des'>
                        <div className='section-4-icon-des-header'>4. Make Payment</div>
                        <div>Transfer payment to service provider upon completion of Service using payNow or PayLah</div>
                    </div>

                    <div className='section-4-icon-des'>
                        <div className='section-4-icon-des-header'>5. Review Service</div>
                        <div>Leave your reviews for service provided</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Section5() {
    return (
        <div className='section-5-container'>

            <div className='section-5-header'>Do-it-Yourself</div>

            <div className='section-5-info-image'>
                <div className='section-5-info'>
                    <p> You may think some simple home repairs are out of your league, but even beginner DIYS can handle many of the quick fixes if
                        they have access to right information.Explore our curated collection of instructional videos for DIY home repairs and tackle
                        your next repair with confidence!
                    </p>

                    <p>If you have a specifc enquiry, do feel free to post your query.</p>

                    <div className='section-5-button-group'>
                        <button className='section-5-button'>Explore DIY Content</button>
                        <button className='section-5-button'>Post a Query</button>
                    </div>

                </div>

                <div className='section-5-image'>
                </div>

            </div>


        </div>
    )
}