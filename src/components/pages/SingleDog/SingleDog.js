import React from 'react';
import moment from 'moment';

import {
  Link as RRLink,
} from 'react-router-dom';

import {
  Card,
  CardBody,
  CardGroup,
  CardSubtitle,
  CardImg,
  ButtonGroup,
  Button,
  Col,
} from 'reactstrap';

import 'react-datepicker/dist/react-datepicker.css';

import dogsData from '../../../helpers/data/dogsData';
import foodData from '../../../helpers/data/foodData';
import pottyData from '../../../helpers/data/pottyData';
import exerciseData from '../../../helpers/data/exerciseData';
import groomingData from '../../../helpers/data/groomingData';

class SingleDog extends React.Component {
  state = {
    dog: {},
    food: false,
    potty: false,
    exercise: false,
    grooming: false,
  }

  getDog = () => {
    const { dogId } = this.props.match.params;

    dogsData.getDogById(dogId)
      .then((res) => this.setState({ dog: res.data }))
      .catch((err) => console.error('get single dog broke', err));
  }

  // getFood = () => {
  //   const { dogId } = this.props.match.params;

  //   foodData.getFoodByDogId(dogId)
  //     .then((res) => this.setState({ food: res[0] }))
  //     .catch((err) => console.error('get food done broke', err));
  // }

  foodCheck = () => {
    const { dogId } = this.props.match.params;

    foodData.getFoodByDogId(dogId)
      .then((res) => {
        if (res.length > 0) {
          this.setState({ food: res[0] });
        }
      })
      .catch((err) => console.error('food check done broke', err));
  }

  pottyCheck = () => {
    const { dogId } = this.props.match.params;

    pottyData.getPottyByDogId(dogId)
      .then((res) => {
        if (res.length > 0) {
          this.setState({ potty: res[0] });
        }
      })
      .catch((err) => console.error('potty check done broke', err));
  }

  exerciseCheck = () => {
    const { dogId } = this.props.match.params;

    exerciseData.getExerciseByDogId(dogId)
      .then((res) => {
        if (res.length > 0) {
          this.setState({ exercise: res[0] });
        }
      })
      .catch((err) => console.error('exercise check done broke', err));
  }

  groomingCheck = () => {
    const { dogId } = this.props.match.params;

    groomingData.getGroomingByDogId(dogId)
      .then((res) => {
        if (res.length > 0) {
          this.setState({ grooming: res[0] });
        }
      })
      .catch((err) => console.error('grooming check done broke', err));
  }

  componentDidMount() {
    this.getDog();
    // this.getFood();
    this.foodCheck();
    this.pottyCheck();
    this.exerciseCheck();
    this.groomingCheck();
  }

  render() {
    const {
      dog,
      food,
      potty,
      exercise,
      grooming,
    } = this.state;

    const { dogId } = this.props.match.params;

    const updateFoodLink = `/food/${food.id}`;
    const newFoodLink = `/newfood/${dogId}`;

    const updatePottyLink = `/potty/${potty.id}`;
    const newPottyLink = `/newpotty/${dogId}`;

    const updateExerciseLink = `/exercise/${exercise.id}`;
    const newExerciseLink = `/newexercise/${dogId}`;

    const updateGroomingLink = `/grooming/${grooming.id}`;
    const newGroomingLink = `/newgrooming/${dogId}`;

    return (
      <div className="SingleDog">
        <h1>{dog.dogName}</h1>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Card>
            <CardImg top width="40%" src={dog.dogImage} alt="Card image cap" />
              <CardBody>
                  <CardSubtitle>{dog.dogName}'s Age:  {dog.dogAge}</CardSubtitle>
                  <CardSubtitle>{dog.dogName}'s Breed:  {dog.dogBreed}</CardSubtitle>
                <ButtonGroup>
                  <Button tag={RRLink} to="/home">Return</Button>
                </ButtonGroup>
              </CardBody>
          </Card>
          <CardGroup>
            {
            food ? (
            <Card>
              <h1><i className="fas fa-hotdog"></i></h1>
                <CardSubtitle>How Much:  {food.foodAmount}</CardSubtitle>
                <CardSubtitle>Last Feeding At: {moment(food.foodDate).format('MMMM Do, h:mma')}</CardSubtitle>
                  <ButtonGroup>
                    <Button tag={RRLink} to={updateFoodLink}>Update</Button>
                  </ButtonGroup>
            </Card>) : (<Card>
              <h1><i className="fas fa-hotdog"></i></h1>
                  <ButtonGroup>
                    <Button tag={RRLink} to={newFoodLink}>Feed 'Em</Button>
                  </ButtonGroup>
            </Card>)}
            {
            potty ? (
              <Card>
              <h1><i className="fas fa-toilet-paper"></i></h1>
                <CardSubtitle>What Kind: {potty.pottyType}</CardSubtitle>
                <CardSubtitle>Last Taken Out At: {moment(potty.pottyDate).format('MMMM Do, h:mma')}</CardSubtitle>
                  <ButtonGroup>
                    <Button tag={RRLink} to={updatePottyLink}>Update</Button>
                  </ButtonGroup>
            </Card>) : (<Card>
              <h1><i className="fas fa-toilet-paper"></i></h1>
                  <ButtonGroup>
                    <Button tag={RRLink} to={newPottyLink}>Take 'Em Out</Button>
                  </ButtonGroup>
            </Card>)}
          </CardGroup>
          <CardGroup>
          {
            exercise ? (
            <Card>
              <h1><i className="fas fa-baseball-ball"></i></h1>
                <CardSubtitle>What Kind: {exercise.exerciseType}</CardSubtitle>
                <CardSubtitle>How Long:  {exercise.exerciseAmount}</CardSubtitle>
                <CardSubtitle>Last Ran At: {moment(exercise.exerciseDate).format('MMMM Do, h:mma')}</CardSubtitle>
                  <ButtonGroup>
                    <Button tag={RRLink} to={updateExerciseLink}>Update</Button>
                  </ButtonGroup>
            </Card>) : (<Card>
              <h1><i className="fas fa-baseball-ball"></i></h1>
                  <ButtonGroup>
                    <Button tag={RRLink} to={newExerciseLink}>Ran 'Em</Button>
                  </ButtonGroup>
            </Card>)}
            {
              grooming ? (
            <Card>
              <h1><i className="fas fa-soap"></i></h1>
                <CardSubtitle>Last Brushed On: {moment(grooming.brushDate).format('MMMM Do')}</CardSubtitle>
                <CardSubtitle>Next Brush On: {moment(grooming.brushDate).add(7, 'days').format('MMMM Do')}</CardSubtitle>
                  <CardSubtitle>Last Bathed On: {moment(grooming.bathDate).format('MMMM Do')}</CardSubtitle>
                  <CardSubtitle>Next Bath On: {moment(grooming.bathDate).add(14, 'days').format('MMMM Do')}</CardSubtitle>
                <CardSubtitle>Nails Clipped On: {moment(grooming.nailDate).format('MMMM Do')}</CardSubtitle>
                <CardSubtitle>Next Clip On: {moment(grooming.nailDate).add(30, 'days').format('MMMM Do')}</CardSubtitle>
                  <ButtonGroup>
                    <Button tag={RRLink} to={updateGroomingLink}>Update</Button>
                  </ButtonGroup>
            </Card>) : (<Card>
              <h1><i className="fas fa-soap"></i></h1>
                  <ButtonGroup>
                    <Button tag={RRLink} to={newGroomingLink}>Groomed 'Em</Button>
                  </ButtonGroup>
            </Card>)}
          </CardGroup>
        </Col>
      </div>
    );
  }
}
export default SingleDog;
