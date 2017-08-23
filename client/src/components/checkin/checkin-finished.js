import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import checkInIcon from "../../../assets/Checkin-icon.png";
import historyIcon from "../../../assets/history-clock-button.png";
import leaderboardIcon from "../../../assets/leaderboard.png";


const CheckInFinished = () => {
  return (
    <div >
    <img src={checkInIcon} className="img-fluid signin-img" />
      <div className="card text-center">
        <div className="card-body">
          <h3 className="card-title">Thanks, you're all set!</h3>
          <Link to="/history">
            <img src={historyIcon} className="img-fluid img.checkfinished-img" />
          </Link>
          <h5 className="card-text"><strong>Your history</strong></h5>
          <Link to="/leaderboard">
            <img src={leaderboardIcon} className="img-fluid img.checkfinished-img" />
          </Link>
          <h5 className="card-text"><strong>Check out how<br/>others are doing?</strong></h5>
        </div>
      </div>
    </div>
  );
}

export default CheckInFinished;