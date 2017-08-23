import React, { Component } from "react";
import ProfileFirst from "./profile-first";
import ProfileSecond from "./profile-second";
import profileIcon from "../../../assets/profile-icon.png";

const Profile = () => {
  return (
    <div>
      <img src={profileIcon} className="img-fluid signin-img" />
      <ProfileFirst />
      <ProfileSecond />
    </div>
  );
};

export default Profile;
