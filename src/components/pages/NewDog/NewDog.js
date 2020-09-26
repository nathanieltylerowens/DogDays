import React from 'react';
import _ from 'underscore';

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from 'reactstrap';

import authData from '../../../helpers/data/authData';
import dogsData from '../../../helpers/data/dogsData';

import './NewDog.scss';

class NewDog extends React.Component {
  state = {
    dogName: '',
    dogImage: '',
    dogAge: '',
    dogBreed: '',
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ dogName: e.target.value });
  };

  changeImageEvent = (e) => {
    e.preventDefault();
    this.setState({ dogImage: e.target.value });
  }

  changeAgeEvent = (e) => {
    e.preventDefault();
    this.setState({ dogAge: e.target.value });
  }

  changeBreedEvent = (e) => {
    e.preventDefault();
    this.setState({ dogBreed: e.target.value });
  }

  saveDogEvent = (e) => {
    e.preventDefault();

    const keysIWant = [
      'dogName',
      'dogImage',
      'dogAge',
      'dogBreed',
    ];

    const newDog = _.pick(this.state, keysIWant);
    newDog.uid = authData.getUid();

    dogsData.createDog(newDog)
      .then((res) => {
        this.props.history.push(`/stuff/${res.data.name}`);
      })
      .catch((err) => console.error('new dog done broke', err));
  };

  render() {
    const {
      dogName,
      dogImage,
      dogAge,
      dogBreed,
    } = this.state;

    return (
      <div className="NewDog">
        <h1>Add a Dog</h1>
        <Form>
        <Row>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="dogName">Name</Label>
            <Input
            type="text"
            name="form-control"
            id="dogName"
            value={dogName}
            onChange={this.changeNameEvent} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="dogImage">Photo</Label>
            <Input
            type="text"
            name="form-control"
            id="dogImage"
            value={dogImage}
            onChange={this.changeImageEvent} />
          </FormGroup>
        </Col>
      </Row>
        <Row>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="dogAge">Age</Label>
            <Input
            type="text"
            name="form-control"
            id="dogAge"
            value={dogAge}
            onChange={this.changeAgeEvent} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="dogBreed">Breed</Label>
            <Input
            type="text"
            name="form-control"
            id="dogBreed"
            value={dogBreed}
            onChange={this.changeBreedEvent} />
          </FormGroup>
        </Col>
      </Row>
          <Button className="savePet" onClick={this.saveDogEvent}><i className="fas fa-bone"></i></Button>
        </Form>
      </div>
    );
  }
}

export default NewDog;
