import React from "react";

export default () => {
  return (
    <footer className="footer bg-inverse">
      <div className="row">
        <div className="col-sm-12 col-lg-6 footerCol">
          <p>
            909 Hyde Street, Suite 628 <br />
            San Francisco, CA 94109 <br />
            Phone: (415) 771-7957 <br />
            info@littlebrotherssf.org
          </p>
        </div>
        <div className="col-sm-12 col-lg-6 footerCol">
          <div>Connect with us</div>
          <a
            href="https://www.facebook.com/LittleBrothersFriendsOfTheElderlySanFrancisco/"
            target="_blank"
          >
            <i className="fa fa-facebook-square fa-3x" aria-hidden="true" />
          </a>
          <a href="https://twitter.com/LittleBrosSF" target="_blank">
            <i className="fa fa-twitter fa-3x" aria-hidden="true" />
          </a>
          <a href="https://www.instagram.com/littlebrotherssf/" target="_blank">
            <i className="fa fa-instagram fa-3x" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};
