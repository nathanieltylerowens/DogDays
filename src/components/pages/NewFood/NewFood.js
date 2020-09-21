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

import foodData from '../../../helpers/data/foodData';
// import dogsData from '../../../helpers/data/dogsData';

class NewFood extends React.Component {
  state = {
    dogId: '',
    foodAmount: '',
    foodDate: new Date(),
  }

  changeAmountEvent = (e) => {
    e.preventDefault();
    this.setState({ foodAmount: e.target.value });
  };

  keepDogIdEvent = (e) => {
    e.preventDefault();
    this.setState({ dogId: this.props.math.params });
  };

  changeDateEvent = (foodDate) => {
    this.setState({ foodDate });
  };

  saveFoodEvent = (e) => {
    e.preventDefault();
    const { dogId } = this.props.match.params;
    const keysIWant = [
      'foodAmount',
      'foodDate',
      'dogId',
    ];
    const newFood = _.pick(this.state, keysIWant);
    newFood.dogId = dogId;
    foodData
      .createFood(newFood)
      .then((res) => {
        // console.log(newFood.dogId);
        this.props.history.push(`/dogs/${dogId}`);
      })
      .catch((err) => console.error('create food done broke', err));
  };

  render() {
    const {
      foodAmount,
      foodDate,
    } = this.state;

    return (
      <div className="NewFood">
        <h1>Edit Dog's Info</h1>
        <Form>
          <FormGroup>
            <Label htmlFor="foodAmount">Amount:</Label>
            <Input
            type="text"
            name="form-control"
            id="foodAmount"
            value={foodAmount}
            onChange={this.changeAmountEvent} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="foodDate">When:</Label>
            <Datepicker
            selected={foodDate}
            onChange={this.changeDateEvent}
            showTimeSelect
            timeFormat="p"
            timeIntervals={15}
            dateFormat="MM/dd h:mm aa"
            />
          </FormGroup>
          <Button className="btn btn-outline-warning" onClick={this.saveFoodEvent}>Fed 'Em</Button>
        </Form>
      </div>
    );
  }
}

export default NewFood;
