import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  renderLinks() {
    if (this.props.authenticated) {
      return [
        <NavItem key={1}>
          <NavLink to="/checkin" tag={Link}>
            Check In
          </NavLink>
        </NavItem>,
        <NavItem key={2}>
          <NavLink to="/history" tag={Link}>
            History
          </NavLink>
        </NavItem>,
        <NavItem key={3}>
          <NavLink to="/learderboard" tag={Link}>
            Leaderboard
          </NavLink>
        </NavItem>,
        <NavItem key={4}>
          <NavLink to="/profile" tag={Link}>
            Profile
          </NavLink>
        </NavItem>,
        <NavItem key={5}>
          <NavLink to="/signout" tag={Link}>
            Sign out
          </NavLink>
        </NavItem>
      ];
    } else {
      return [
        <NavItem key={1}>
          <NavLink to="/signin" tag={Link}>
            Sign In
          </NavLink>
        </NavItem>,
        <NavItem key={2}>
          <NavLink to="/signup" tag={Link}>
            Sign Up
          </NavLink>
        </NavItem>
      ];
    }
  }
  render() {
    return (
      <div>
        <Navbar color="faded" light toggleable className="navbar-expand-sm">
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">LBFE</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this.renderLinks()}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
