import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const CheckInFinished = () => {
  return (
    <div >
    <img src="assets/Checkin-icon.png" className="img-fluid signin-img" />
      <div className="card text-center">
        <div className="card-body">
          <h3 className="card-title">Thanks, you're all set!</h3>
          <Link to="/history">
            <img src="assets/history-clock-button.png" className="img-fluid img.checkfinished-img" />
          </Link>
          <h5 className="card-text"><strong>Your history</strong></h5>
          <Link to="/leaderboard">
            <img src="assets/leaderboard.png" className="img-fluid img.checkfinished-img" />
          </Link>
          <h5 className="card-text"><strong>Check out how<br/>others are doing?</strong></h5>
        </div>
      </div>
    </div>
  );
}

export default CheckInFinished;