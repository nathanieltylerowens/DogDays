import React from 'react';
import Datepicker from 'react-datepicker';
import _ from 'underscore';

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
} from 'reactstrap';

import 'react-datepicker/dist/react-datepicker.css';
import './NewFood.scss';

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
        <h1>Food</h1>
        <Form>
        <Col md={{ size: 6, offset: 3 }}>
          <FormGroup>
            <Label htmlFor="foodAmount">Amount:</Label>
            <Input
            type="select"
            name="select"
            id="foodAmount"
            value={foodAmount}
            onChange={this.changeAmountEvent}>
              <option>.5 cup</option>
              <option>1 cup</option>
              <option>1.5 cups</option>
              <option>2 cups</option>
              <option>2.5 cups</option>
              <option>3 cups</option>
              <option>3.5 cups</option>
              <option>4 cups</option>
              <option>4.5 cups</option>
              <option>5 cups</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label className="datePadding" htmlFor="foodDate">When:</Label>
            <Datepicker
            selected={foodDate}
            onChange={this.changeDateEvent}
            showTimeSelect
            timeFormat="p"
            timeIntervals={15}
            dateFormat="MM/dd h:mm aa"
            />
          </FormGroup>
        </Col>
          <Button className="saveFood" onClick={this.saveFoodEvent}><i className="fas fa-hotdog"></i></Button>
        </Form>
      </div>
    );
  }
}

export default NewFood;
