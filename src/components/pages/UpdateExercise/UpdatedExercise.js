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

import exerciseData from '../../../helpers/data/exerciseData';

class EditExercise extends React.Component {
  state = {
    exercise: {
      dogId: '',
      exerciseType: '',
      exerciseAmount: '',
      exerciseDate: new Date(),
    },
  }

  componentDidMount() {
    exerciseData.getExerciseById(this.props.match.params.exerciseId)
      .then((res) => {
        const exercise = res.data;
        exercise.exerciseDate = new Date(exercise.exerciseDate);
        this.setState({ exercise });
      })
      .catch((err) => console.error('get exercise for edit done broke', err));
  }

  changeTypeEvent = (e) => {
    e.preventDefault();
    const { exercise } = this.state;
    exercise.exerciseType = e.target.value;
    this.setState({ exercise });
  };

  changeAmountEvent = (e) => {
    e.preventDefault();
    const { exercise } = this.state;
    exercise.exerciseAmount = e.target.value;
    this.setState({ exercise });
  };

  changeDateEvent = (exerciseDate) => {
    const { exercise } = this.state;
    exercise.exerciseDate = exerciseDate;
    this.setState({ exercise });
  };

  updateExerciseEvent = (e) => {
    e.preventDefault();
    const { exerciseId } = this.props.match.params;

    exerciseData
      .updateExercise(exerciseId, this.state.exercise)
      .then((res) => {
        // console.log(res);
        this.props.history.push(`/dogs/${res.data.dogId}`);
      })
      .catch((err) => console.error('edit exercise done broke', err));
  };

  render() {
    const {
      exerciseType,
      exerciseAmount,
      exerciseDate,
    } = this.state.exercise;

    return (
      <div className="EditExercise">
        <h1>Edit Dog's Info</h1>
        <Form>
          <FormGroup>
            <Label htmlFor="exerciseType">Type:</Label>
            <Input
            type="text"
            name="form-control"
            id="exerciseType"
            value={exerciseType}
            onChange={this.changeTypeEvent} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="exerciseAmount">Amount:</Label>
            <Input
            type="text"
            name="form-control"
            id="exerciseAmount"
            value={exerciseAmount}
            onChange={this.changeAmountEvent} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="exerciseDate">When:</Label>
            <Datepicker
            selected={exerciseDate}
            onChange={this.changeDateEvent}
            showTimeSelect
            timeFormat="p"
            timeIntervals={15}
            dateFormat="MM/dd h:mm aa"
            />
          </FormGroup>
          <Button className="btn btn-outline-warning" onClick={this.updateExerciseEvent}>Ran 'Em</Button>
        </Form>
      </div>
    );
  }
}

export default EditExercise;
