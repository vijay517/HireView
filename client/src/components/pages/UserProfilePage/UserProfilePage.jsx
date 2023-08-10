import React, { Component, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import NavBar from "../../sections/NavBar/NavBar"
import "./UserProfilePage.css"
import { getUserInfoById, updateUser, updateUserProfileImage } from "../../helper/HelperFucntion";
import PAGES from "../../enums"

class Page extends Component {
  constructor() {
    super();
    this.state = {userinfo: ""};
    this.handleClick = this.handleClick.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.userid = localStorage.getItem("user");
  }

  async onLoad() {
    var userInfo = await getUserInfoById(this.userid);
    this.setState({ userinfo: userInfo })
  }

  componentDidMount() {
    this.onLoad();
  }

  async handleClick() {
    const inputElem = document.getElementById('input-file');
    inputElem.click();
  }

  async handleFileChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const imageBase64 = reader.result.split(',')[1];    
      await updateUserProfileImage(this.userid, imageBase64);
      this.setState(prevState => ({
        userinfo: {
          ...prevState.userinfo,
          profilepic: imageBase64,
        },
      }));
    };
  }

  async handleSubmit(e) {
    e.preventDefault()
    const form = document.forms.editprofile;
    const userInfo = this.state.userinfo;
    const updateInfo = {};

    updateInfo.id = this.userid;
    if (form.elements.firstName.value !== "" && form.elements.firstName.value !== userInfo.firstName) {
      updateInfo.firstName = form.elements.firstName.value;
    }
    if (form.elements.lastName.value !== "" && form.elements.lastName.value !== userInfo.lastName) {
      updateInfo.lastName = form.elements.lastName.value;
    }
    if (form.elements.postalCode.value !== "" && form.elements.postalCode.value !== userInfo.postalcode) {
      updateInfo.postalcode = form.elements.postalCode.value;
    }
    if (form.elements.email.value !== "" && form.elements.email.value !== userInfo.email) {
      updateInfo.email = form.elements.email.value;
    }
    if (form.elements.address.value !== "" && form.elements.address.value !== userInfo.address) {
      updateInfo.address = form.elements.address.value;
    }
    if (form.elements.phoneNumber.value !== "" && form.elements.phoneNumber.value !== userInfo.phone) {
      updateInfo.phone = form.elements.phoneNumber.value;
    }

    await updateUser(updateInfo);
    this.props.navigate(PAGES["user-home-page"])
  }

  render() {
    const imageBase64 = this.state.userinfo.profilepic;
    const imageSrc = "data:image/jpeg;base64," + imageBase64;

    return (
      <div className='user-info-edit-page'>
        <NavBar />

        <h1>User Profile (View/Edit)</h1>
        <div className='page-container'>
          <div className='profile-image'>
            <img alt="" src={imageSrc}></img>
            <p>Please upload a clear frontal photo</p>
            <input onChange={this.handleFileChange} id="input-file" type="file"></input>
            <button onClick={this.handleClick}>Update Profile Pic</button>
          </div>
          <form name='editprofile' onSubmit={this.handleSubmit}>
            <div className='edit-form'>
              <div className='left-form'>
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" placeholder={this.state.userinfo.firstName} value={this.state.firstName} onChange={(e) => this.setState({firstName: e.target.value})}  />

                <label htmlFor="postalCode">Postal Code</label>
                <input type="number" name="postalCode" placeholder={this.state.userinfo.postalcode} value={this.state.postalcode} onChange={(e) => this.setState({postalcode: e.target.value})} />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder={this.state.userinfo.email} value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
              </div>
              <div className='right-form'>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" placeholder={this.state.userinfo.lastName} value={this.state.lastName} onChange={(e) => this.setState({lastName: e.target.value})} />

                <label htmlFor="address">Address</label>
                <input type="text" name="address" placeholder={this.state.userinfo.address} value={this.state.address} onChange={(e) => this.setState({address: e.target.value})} />

                <label htmlFor="phoneNumber">Contact Number</label>
                <input type="phone" name="phoneNumber" placeholder={this.state.userinfo.phone} value={this.state.phone} onChange={(e) => this.setState({phone: e.target.value})} />
              </div>
              <input type="submit" value="Update Changes" />
            </div>
          </form>
        </div>
      </div>
    )
  }
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
  
  //else naviagate to user profile page home page
  if (userid) {
      return <Page navigate={navigate} />
  }
}