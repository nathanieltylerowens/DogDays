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

class SingleDog extends React.Component {
  state = {
    dog: {},
    food: false,
    potty: false,
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

  componentDidMount() {
    this.getDog();
    // this.getFood();
    this.foodCheck();
    this.pottyCheck();
  }

  render() {
    const { dog, food, potty } = this.state;

    const { dogId } = this.props.match.params;

    const updateFoodLink = `/food/${food.id}`;
    const newFoodLink = `/newfood/${dogId}`;

    const updatePottyLink = `/potty/${potty.id}`;
    const newPottyLink = `/newPotty/${dogId}`;
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
                <CardSubtitle>Last Feeding At:  {moment(food.foodDate).format('MMMM Do, h:mma')}</CardSubtitle>
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
                <CardSubtitle>{potty.pottyType}</CardSubtitle>
                <CardSubtitle>{moment(potty.pottyDate).format('MMMM Do, h:mma')}</CardSubtitle>
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
            <Card>
              <h1><i className="fas fa-baseball-ball"></i></h1>
                <CardSubtitle>{dog.dogAge}</CardSubtitle>
                <CardSubtitle>{dog.dogBreed}</CardSubtitle>
                  <ButtonGroup>
                    <Button tag={RRLink} to="/home">Update</Button>
                  </ButtonGroup>
            </Card><Card>
              <h1><i className="fas fa-soap"></i></h1>
                <CardSubtitle>{dog.dogAge}</CardSubtitle>
                <CardSubtitle>{dog.dogBreed}</CardSubtitle>
                  <ButtonGroup>
                    <Button tag={RRLink} to="/home">Update</Button>
                  </ButtonGroup>
            </Card>
          </CardGroup>
        </Col>
      </div>
    );
  }
}
export default SingleDog;
