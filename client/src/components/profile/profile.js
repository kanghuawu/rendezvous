import React, { Component } from "react";
import ProfileFirst from "./profile-first";
import ProfileSecond from "./profile-second";

const Profile = () => {
  return (
    <div>
      <img src="assets/profile-icon.png" className="img-fluid signin-img" />
      <ProfileFirst />
      <ProfileSecond />
    </div>
  );
};

export default Profile;
