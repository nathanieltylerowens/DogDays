import React from 'react';
import Datepicker from 'react-datepicker';

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
} from 'reactstrap';

import 'react-datepicker/dist/react-datepicker.css';

import foodData from '../../../helpers/data/foodData';
import './UpdateFood.scss';

class EditFood extends React.Component {
  state = {
    food: {
      dogId: '',
      foodAmount: '',
      foodDate: new Date(),
    },
  }

  componentDidMount() {
    foodData.getFoodById(this.props.match.params.foodId)
      .then((res) => {
        const food = res.data;
        food.foodDate = new Date(food.foodDate);
        this.setState({ food });
      })
      .catch((err) => console.error('get food for edit done broke', err));
  }

  changeAmountEvent = (e) => {
    e.preventDefault();
    const { food } = this.state;
    food.foodAmount = e.target.value;
    this.setState({ food });
  };

  changeDateEvent = (foodDate) => {
    const { food } = this.state;
    food.foodDate = foodDate;
    this.setState({ food });
  };

  updateFoodEvent = (e) => {
    e.preventDefault();
    const { foodId } = this.props.match.params;

    foodData
      .updateFood(foodId, this.state.food)
      .then((res) => {
        // console.log(res);
        this.props.history.push(`/dogs/${res.data.dogId}`);
      })
      .catch((err) => console.error('edit food done broke', err));
  };

  render() {
    const {
      foodAmount,
      foodDate,
    } = this.state.food;

    return (
      <div className="EditFood">
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
          <Button className="saveFood" onClick={this.updateFoodEvent}><i className="fas fa-hotdog"></i></Button>
        </Form>
      </div>
    );
  }
}

export default EditFood;
