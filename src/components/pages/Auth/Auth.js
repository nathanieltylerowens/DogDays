import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Button } from 'reactstrap';

class Auth extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div className="Auth">
        <Button className="btn btn-info" onClick={this.loginClickEvent}>Google Login</Button>
      </div>
    );
  }
}

export default Auth;
