import React from 'react';
import {
  Link,
  NavLink as RRNavLink,
} from 'react-router-dom';
import {
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Button,
  Collapse,
} from 'reactstrap';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
// import './Navbar.scss';

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
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={RRNavLink} to="/home">My Dogs</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to="/new">Add Dog</NavLink>
          </NavItem>
          <NavItem>
            <Button className="nav-link btn btn-light logout-button" onClick={this.logoutClickEvent}>Logout</Button>
          </NavItem>
        </Nav>
        );
      }
      return <Nav className="ml-auto" navbar></Nav>;
    };

    return (
      <Navbar color="light" expand="md">
        <Link className="navbar-brand" to="/">Dog Days</Link>
          <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          {buildNavbar()}
        </Collapse>
      </Navbar>
    );
  }
}

export default myNavbar;
