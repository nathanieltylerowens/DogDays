import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  Button,
  ButtonGroup,
} from 'reactstrap';

import { faCircle, faDog, faWater } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Auth.scss';

class Auth extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div className="authContainer">
        <h1 className="allLogoAuth">Dog
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
        Days</h1>
        <p className="authWelcome">
          Welcome to Dog Days!
        </p>
        <p className="authWelcome">
          Before we help you keep track of your pups health, go ahead and register below.
        </p>
        <ButtonGroup>
          <Button className="googleAuth" onClick={this.loginClickEvent}>Google Login</Button>
        </ButtonGroup>
        </div>
    );
  }
}

export default Auth;
