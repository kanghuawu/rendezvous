import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import roseIcon from "../../../assets/rose.png";

class Signout extends Component {
  componentWillMount() {
    this.props.signOutUser();
  }
  render() {
    return (
      <div className="sectionLight">
        <div className="row">
          <div className="col-sm-12">
            <div className="jumbotron jumbotron-fluid">
              <img src={roseIcon} className="img-fluid signin-img" />
              <div className="container">
                <p className="display-4 text-center">
                  Thanks for visiting us <br />
                  See you next time
                </p>
              </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col" />
      </div>
    </div>
    );
  }
}

export default connect(null, actions)(Signout);
