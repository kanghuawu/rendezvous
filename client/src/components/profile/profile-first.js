import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { submit } from "redux-form";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProfileEdit from "./profile-edit";
import PasswordEdit from "./password-edit";
import Loader from "../util/loader-circle";
import { fetchProfile, updateProfile, updatePassword } from "../../actions";

class ProfileFirst extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileModal: false,
      passwordModal: false
    };

    this.profileToggle = this.profileToggle.bind(this);
    this.passwordToggle = this.passwordToggle.bind(this);
    this.updateMyProfile = this.updateMyProfile.bind(this);
    this.updateMyPassword = this.updateMyPassword.bind(this);
  }

  componentWillMount() {
    this.props.fetchProfile();
  }

  profileToggle() {
    this.setState({
      profileModal: !this.state.profileModal
    });
  }

  passwordToggle() {
    this.setState({
      passwordModal: !this.state.passwordModal
    });
  }

  updateMyProfile() {
    this.refs.profile.getWrappedInstance().submit();
    this.profileToggle();
  }

  submitProfile(values) {
    return this.props.updateProfile(values, () => {
      this.profileToggle();
    });
  }

  updateMyPassword() {
    this.refs.password.getWrappedInstance().submit();
  }

  submitPassword(values) {
    console.log(this.props);
    return this.props.updatePassword(values, () => {
      this.passwordToggle();
    });
  }

  render() {
    if (this.props.profile == null) {
      return <Loader/>;
    }

    return (
      <div>
        <div className="card ">
          <div className="card-body ">
            <h3 className="card-title history-detail">Profile</h3>
            <p className="card-text history-detail">
              Name:{" "}
              {this.props.profile.first_name +
                " " +
                this.props.profile.last_name}{" "}
              <br />
              Phone: {this.props.profile.phone} <br />
              Hearts: {this.props.profile.hearts} <br />
              Badges: {this.props.profile.badges}
            </p>
            <div className="history-detail">
              <button
                className="btn profile-btn btn-md"
                onClick={this.profileToggle}
              >
                Update Profile
              </button>
              <Modal
                isOpen={this.state.profileModal}
                toggle={this.profileToggle}
                className={this.props.className}
              >
                <ModalHeader toggle={this.profileToggle}>
                  Update Profile
                </ModalHeader>
                <ModalBody>
                  <ProfileEdit
                    ref={"profile"}
                    onSubmit={this.submitProfile.bind(this)}
                  />
                </ModalBody>
                <ModalFooter>
                  <button
                    className="btn profile-btn"
                    onClick={this.updateMyProfile}
                  >
                    Update
                  </button>{" "}
                  <Button color="secondary" onClick={this.profileToggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>{" "}
              <button className="btn profile-btn" onClick={this.passwordToggle}>
                Update Password
              </button>
              <Modal
                isOpen={this.state.passwordModal}
                toggle={this.passwordToggle}
                className={this.props.className}
              >
                <ModalHeader toggle={this.passwordToggle}>
                  Update Password
                </ModalHeader>
                <ModalBody>
                  <PasswordEdit
                    ref={"password"}
                    onSubmit={this.submitPassword.bind(this)}
                  />
                </ModalBody>
                <ModalFooter>
                  <button
                    className="btn profile-btn"
                    onClick={this.updateMyPassword}
                  >
                    Update
                  </button>{" "}
                  <Button color="secondary" onClick={this.passwordToggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(mapStateToProps, {
  fetchProfile,
  updateProfile,
  updatePassword
})(ProfileFirst);
