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

import exerciseData from '../../../helpers/data/exerciseData';

import './UpdateExercise.scss';

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
        <h1>Exercise</h1>
        <Form>
        <Col md={{ size: 6, offset: 3 }}>
          <FormGroup>
            <Label htmlFor="exerciseType">Type:</Label>
            <Input
            type="select"
            name="select"
            id="exerciseType"
            value={exerciseType}
            onChange={this.changeTypeEvent}>
              <option>Fetch</option>
              <option>Run</option>
              <option>Walk</option>
              <option>Play</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="exerciseAmount">Amount:</Label>
            <Input
            type="select"
            name="select"
            id="exerciseAmount"
            value={exerciseAmount}
            onChange={this.changeAmountEvent}>
              <option>10 min</option>
              <option>20 min</option>
              <option>30 min</option>
              <option>40 min</option>
              <option>50 min</option>
              <option>60 min</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label className="datePadding" htmlFor="exerciseDate">When:</Label>
            <Datepicker
            selected={exerciseDate}
            onChange={this.changeDateEvent}
            showTimeSelect
            timeFormat="p"
            timeIntervals={15}
            dateFormat="MM/dd h:mm aa"
            />
          </FormGroup>
          </Col>
          <Button className="saveExercise" onClick={this.updateExerciseEvent}><i className="fas fa-baseball-ball"></i></Button>
        </Form>
      </div>
    );
  }
}

export default EditExercise;
