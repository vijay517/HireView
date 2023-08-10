import React, { Component } from 'react'
import "./UserProfileIcon.css"

export default class UserProfileIcon extends Component {

    render() {
        const imageBase64 = this.props.imageBase64;
        const imageSrc = "data:image/jpeg;base64," + imageBase64;

        return (
            <div className='user-profile-icon-page'>
                <img className='circle' src={imageSrc} alt="" />
                <div className='box'>
                    <h3 className='username'>
                        {this.props.name && this.props.name}
                        {!this.props.name && "user name"}
                    </h3>
                    <h4 className='date'>
                        {"Joined "}
                        {this.props.joinDate && this.props.joinDate}
                        {!this.props.joinDate && "May 2023"}
                    </h4>
                </div>
            </div>
        )
    }
}


/**
 *props used:
  - profilePicPath: "absolute path of the profile pic"
  - name: username
  - userid: userid
  - joinDate:joined date 
 *
 */