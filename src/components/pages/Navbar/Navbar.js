import React from 'react';
import {
  NavLink as RRNavLink,
} from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Collapse,
} from 'reactstrap';
import { faCircle, faDog, faWater } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';

import './Navbar.scss';

class myNavbar extends React.Component {
  state = {
    isOpen: false,
  }

  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  logoutClickEvent = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  toggle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  render() {
    const { isOpen } = this.state;

    const buildNavbar = () => {
      const { authed } = this.props;

      if (authed) {
        return (
        <Nav className="ml-auto"navbar>
          <NavItem>
            <NavLink tag={RRNavLink} to="/home">My Dogs</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to="/new">Add Dog</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.logoutClickEvent}>Logout</NavLink>
          </NavItem>
        </Nav>
        );
      }
      return <Nav className="ml-auto" navbar></Nav>;
    };

    return (
      <Navbar expand="md">
        <NavbarBrand className="allLogo" tag={RRNavLink} to="/home">Dog
          <span className="fa-layers fa-fw" transform="up-3">
            <FontAwesomeIcon
              icon={faWater}
              mask={faCircle}
              transform="down-4 shrink-2"
              fixedWidth
            />
            <FontAwesomeIcon
            icon={faDog}
            transform="down-1.5 shrink-3.4"
            />
          </span>
        Days</NavbarBrand>

          <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          {buildNavbar()}
        </Collapse>
      </Navbar>
    );
  }
}

export default myNavbar;
