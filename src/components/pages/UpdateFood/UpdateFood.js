import React from 'react';
import Datepicker from 'react-datepicker';

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import 'react-datepicker/dist/react-datepicker.css';

import foodData from '../../../helpers/data/foodData';

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
          <Button className="btn btn-outline-warning" onClick={this.updateFoodEvent}>Fed</Button>
        </Form>
      </div>
    );
  }
}

export default EditFood;
