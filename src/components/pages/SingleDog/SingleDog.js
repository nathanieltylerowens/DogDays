import React from 'react';
import moment from 'moment';

import {
  Link as RRLink,
} from 'react-router-dom';

import {
  Card,
  CardSubtitle,
  CardImg,
  ButtonGroup,
  Button,
  Row, CardGroup, Col,
} from 'reactstrap';

import 'react-datepicker/dist/react-datepicker.css';

import dogsData from '../../../helpers/data/dogsData';
import foodData from '../../../helpers/data/foodData';
import pottyData from '../../../helpers/data/pottyData';
import exerciseData from '../../../helpers/data/exerciseData';
import groomingData from '../../../helpers/data/groomingData';

import './SingleDog.scss';

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
        <h1 className="singleHeader">{dog.dogName}</h1>
          <Card className="mainCard">
          <CardGroup>
            <Card className="imageCard">
            <CardImg src={dog.dogImage} alt="Card image cap" className="singleImage" />
            </Card>
              <Card className="mainCardBody">
                  <Row className="mainCardText">
                    <CardSubtitle>
                      Age:  {dog.dogAge}
                    </CardSubtitle>
                    <CardSubtitle className="nameSub">
                      Breed:  {dog.dogBreed}
                    </CardSubtitle>
                  </Row>
            {
            food ? (
              <Row className="foodInfoUpdate">
                <ButtonGroup>
                    <Button className="foodIcon" tag={RRLink} to={updateFoodLink}><i className="fas fa-hotdog"></i></Button>
                </ButtonGroup>
                <Col className="foodWords">
                  <CardSubtitle>How Much:  {food.foodAmount}</CardSubtitle>
                  <CardSubtitle className="lastAt">Last Feeding At: {moment(food.foodDate).format('MMMM Do, h:mma')}</CardSubtitle>
                </Col>
                </Row>) : (<Row className="foodInfoNew">
                      <ButtonGroup>
                        <Button tag={RRLink} to={newFoodLink}><i className="fas fa-hotdog"></i></Button>
                      </ButtonGroup>
                    </Row>)}
            {
            potty ? (
              <Row className="pottyInfoUpdate">
                <ButtonGroup>
                    <Button className="pottyIcon" tag={RRLink} to={updatePottyLink}><i className="fas fa-toilet-paper"></i></Button>
                  </ButtonGroup>
                <Col className="pottyWords">
                  <CardSubtitle>What Kind: {potty.pottyType}</CardSubtitle>
                  <CardSubtitle className="lastAt">Last Taken Out At: {moment(potty.pottyDate).format('MMMM Do, h:mma')}</CardSubtitle>
                </Col>
              </Row>) : (<Row className="pottyInfoNew">
                  <ButtonGroup>
                    <Button tag={RRLink} to={newPottyLink}><i className="fas fa-toilet-paper"></i></Button>
                  </ButtonGroup>
              </Row>)}
          {
            exercise ? (
            <Row className="exerciseInfoUpdate">
              <ButtonGroup>
                <Button className="exerciseIcon" tag={RRLink} to={updateExerciseLink}><i className="fas fa-baseball-ball"></i></Button>
              </ButtonGroup>
              <Col className="exerciseWords">
                <CardSubtitle>What Kind: {exercise.exerciseType}</CardSubtitle>
                <CardSubtitle>How Long:  {exercise.exerciseAmount}</CardSubtitle>
                <CardSubtitle className="lastAt">Last Ran At: {moment(exercise.exerciseDate).format('MMMM Do, h:mma')}</CardSubtitle>
              </Col>
            </Row>) : (<Row className="exerciseInfoNew">
                  <ButtonGroup>
                    <Button tag={RRLink} to={newExerciseLink}><i className="fas fa-baseball-ball"></i></Button>
                  </ButtonGroup>
            </Row>)}
            {
              grooming ? (
            <Row className="groomingInfoUpdate">
              <ButtonGroup>
                <Button className="groomIcon" tag={RRLink} to={updateGroomingLink}><i className="fas fa-soap"></i></Button>
              </ButtonGroup>
              <Col className="groomingWords">
                <CardSubtitle>Last Brushed On: {moment(grooming.brushDate).format('MMMM Do')}</CardSubtitle>
                <CardSubtitle className="lastAt">Next Brush On: {moment(grooming.brushDate).add(7, 'days').format('MMMM Do')}</CardSubtitle>
                  <CardSubtitle>Last Bathed On: {moment(grooming.bathDate).format('MMMM Do')}</CardSubtitle>
                  <CardSubtitle className="lastAt">Next Bath On: {moment(grooming.bathDate).add(14, 'days').format('MMMM Do')}</CardSubtitle>
                <CardSubtitle>Nails Clipped On: {moment(grooming.nailDate).format('MMMM Do')}</CardSubtitle>
                <CardSubtitle className="lastAt">Next Clip On: {moment(grooming.nailDate).add(30, 'days').format('MMMM Do')}</CardSubtitle>
              </Col>
            </Row>) : (<Row className="groomingInfoNew">
                  <ButtonGroup>
                    <Button tag={RRLink} to={newGroomingLink}><h1><i className="fas fa-soap"></i></h1></Button>
                  </ButtonGroup>
                 </Row>)}
            </Card>
          </CardGroup>
      </Card>
    </div>
    );
  }
}
export default SingleDog;
