import React from 'react';

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

import dogsData from '../../../helpers/data/dogsData';

class SingleStuff extends React.Component {
  state = {
    dog: {},
  }

  componentDidMount() {
    const { dogId } = this.props.match.params;

    dogsData.getDogById(dogId)
      .then((res) => this.setState({ dog: res.data }))
      .catch((err) => console.error('get single dog broke', err));
  }

  render() {
    const { dog } = this.state;

    return (
      <div className="SingleDog">
        <h1>{dog.dogName}</h1>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
        <CardGroup>
          <Card>
            <CardImg top width="40%" src={dog.dogImage} alt="Card image cap" />
              <CardBody>
                  <CardSubtitle>{dog.dogAge}</CardSubtitle>
                  <CardSubtitle>{dog.dogBreed}</CardSubtitle>
                <ButtonGroup>
                  <Button tag={RRLink} to="/home">Return</Button>
                </ButtonGroup>
              </CardBody>
          </Card>
        </CardGroup>
        </Col>
      </div>
    );
  }
}
export default SingleStuff;
