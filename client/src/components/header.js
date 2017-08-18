import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderLinks() {
    if(this.props.authenticated){
      return [
        <li className="nav-item" key={1}>
          <Link to="/checkin" className="nav-link">Check In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link to="/history" className="nav-link">History</Link>
        </li>,
        <li className="nav-item" key={3}>
          <Link to="/learderboard" className="nav-link">Leaderboard</Link>
        </li>,
        <li className="nav-item" key={4}>
          <Link to="/profile" className="nav-link">Profile</Link>
        </li>,
        <li className="nav-item" key={5}>
          <Link to="/signout" className="nav-link">Sign out</Link>
        </li>
        ];
    }else{
      return [
        <li className="nav-item" key={1}>
          <Link to="/signin" className="nav-link">Sign In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link to="/signup" className="nav-link">Sign Up</Link>
        </li>
      ];
    }

  }
  render(){
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link to="/" className="navbar-brand">LBFE</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
