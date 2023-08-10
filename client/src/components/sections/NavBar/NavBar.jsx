import React from 'react';
import './NavBar.css';
import { useNavigate } from "react-router-dom";
import PAGES from "../../enums"

class Bar extends React.Component {

    render() {
        return (
            <div className='navBar'>
                <div className='icon-group'>

                    <div onClick={() => {this.props.navigate(PAGES["home-page"])}} className='icon-group-icon'>

                    </div>

                    <div className="icon-group-companyname">
                        <h3 className="companyName">HIREFIX</h3>
                        <h3 className='companyMoto'>ONE FOR ALL</h3>
                    </div>

                </div>
                <div className='nav-group'>
                    <a onClick={() => {this.props.navigate(PAGES["home-page"])}}  className="nav-group-link" href=''>About</a>
                    <a onClick={() => {this.props.navigate(PAGES["user-home-page"])}}  className="nav-group-link" href=''>Services</a>
                    <a onClick={() => {this.props.navigate(PAGES["do-it-yourself-page"])}} className="nav-group-link" href=''>Do-it-Yourself</a>
                    <a className="nav-group-link" href=''>Reviews</a>
                </div>
            </div>
        )
    }
}

export default function NavBar() {
    return <Bar navigate={useNavigate()} />
}