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

import exerciseData from '../../../helpers/data/exerciseData';
// import dogsData from '../../../helpers/data/dogsData';

class NewExercise extends React.Component {
  state = {
    dogId: '',
    exerciseType: '',
    exerciseAmount: '',
    exerciseDate: new Date(),
  }

  changeExerciseTypeEvent = (e) => {
    e.preventDefault();
    this.setState({ exerciseType: e.target.value });
  };

  changeExerciseAmountEvent = (e) => {
    e.preventDefault();
    this.setState({ exerciseAmount: e.target.value });
  };

  keepDogIdEvent = (e) => {
    e.preventDefault();
    this.setState({ dogId: this.props.math.params });
  };

  changeExerciseDateEvent = (exerciseDate) => {
    this.setState({ exerciseDate });
  };

  saveExerciseEvent = (e) => {
    e.preventDefault();
    const { dogId } = this.props.match.params;
    const keysIWant = [
      'exerciseType',
      'exerciseAmount',
      'exerciseDate',
      'dogId',
    ];
    const newExercise = _.pick(this.state, keysIWant);
    newExercise.dogId = dogId;
    exerciseData
      .createExercise(newExercise)
      .then((res) => {
        // console.log(newExercise.dogId);
        this.props.history.push(`/dogs/${dogId}`);
      })
      .catch((err) => console.error('create exercise done broke', err));
  };

  render() {
    const {
      exerciseType,
      exerciseAmount,
      exerciseDate,
    } = this.state;

    return (
      <div className="NewExercise">
        <h1>Edit Dog's Info</h1>
        <Form>
          <FormGroup>
            <Label htmlFor="exerciseType">Type:</Label>
            <Input
            type="text"
            name="form-control"
            id="exerciseType"
            value={exerciseType}
            onChange={this.changeExerciseTypeEvent} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="exerciseAmount">Amount:</Label>
            <Input
            type="text"
            name="form-control"
            id="exerciseAmount"
            value={exerciseAmount}
            onChange={this.changeExerciseAmountEvent} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="exerciseDate">When:</Label>
            <Datepicker
            selected={exerciseDate}
            onChange={this.changeExerciseDateEvent}
            showTimeSelect
            timeFormat="p"
            timeIntervals={15}
            dateFormat="MM/dd h:mm aa"
            />
          </FormGroup>
          <Button className="btn btn-outline-warning" onClick={this.saveExerciseEvent}>Ran 'Em</Button>
        </Form>
      </div>
    );
  }
}

export default NewExercise;
