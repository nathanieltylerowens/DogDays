import React from 'react';
import Datepicker from 'react-datepicker';
import _ from 'underscore';

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import 'react-datepicker/dist/react-datepicker.css';

import pottyData from '../../../helpers/data/pottyData';

class NewPotty extends React.Component {
  state = {
    dogId: '',
    pottyType: '',
    pottyDate: new Date(),
  }

  changePottyTypeEvent = (e) => {
    e.preventDefault();
    this.setState({ pottyType: e.target.value });
  };

  keepDogIdEvent = (e) => {
    e.preventDefault();
    this.setState({ dogId: this.props.math.params });
  };

  changePottyDateEvent = (pottyDate) => {
    this.setState({ pottyDate });
  };

  savePottyEvent = (e) => {
    e.preventDefault();
    const { dogId } = this.props.match.params;
    const keysIWant = [
      'pottyType',
      'pottyDate',
      'dogId',
    ];
    const newPotty = _.pick(this.state, keysIWant);
    newPotty.dogId = dogId;
    pottyData
      .createPotty(newPotty)
      .then((res) => {
        // console.log(newPotty.dogId);
        this.props.history.push(`/dogs/${dogId}`);
      })
      .catch((err) => console.error('create potty done broke', err));
  };

  render() {
    const {
      pottyType,
      pottyDate,
    } = this.state;

    return (
      <div className="NewPotty">
        <h1>Edit Dog's Info</h1>
        <Form>
          <FormGroup>
            <Label htmlFor="pottyType">Type:</Label>
            <Input
            type="text"
            name="form-control"
            id="pottyType"
            value={pottyType}
            onChange={this.changePottyTypeEvent} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="pottyDate">When:</Label>
            <Datepicker
            selected={pottyDate}
            onChange={this.changeDateEvent}
            showTimeSelect
            timeFormat="p"
            timeIntervals={15}
            dateFormat="MM/dd h:mm aa"
            />
          </FormGroup>
          <Button className="btn btn-outline-warning" onClick={this.savePottyEvent}>Take 'Em Out</Button>
        </Form>
      </div>
    );
  }
}

export default NewPotty;
