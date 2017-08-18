import React from 'react';

export default () => {
  return (
    <footer className="footer bg-inverse">
      <div className="row">
        <div className="col-sm-12 col-lg-6 lbInfo">
          <p>909 Hyde Street, Suite 628</p>
          <p>San Francisco, CA 94109</p>
          <p>Phone: (415) 771-7957</p>
          <p>info@littlebrotherssf.org</p>
        </div>
        <div className="col-sm-12 col-lg-6 socialWrapper">
          <a href="https://www.facebook.com/LittleBrothersFriendsOfTheElderlySanFrancisco/" target="_blank">
            <i className="fa fa-facebook-square fa-3x" aria-hidden="true"></i>
          </a>
          <a href="https://twitter.com/LittleBrosSF" target="_blank">
            <i className="fa fa-twitter fa-3x" aria-hidden="true"></i>
          </a>
          <a href="https://www.instagram.com/littlebrotherssf/" target="_blank">
            <i className="fa fa-instagram fa-3x" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}