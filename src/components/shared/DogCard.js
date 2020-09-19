import React from 'react';

import {
  Link as RRLink,
} from 'react-router-dom';

import {
  Card, CardImg, CardBody,
  CardTitle, ButtonGroup, Button,
} from 'reactstrap';

import dogShape from '../../helpers/propz/dogShape';

class DogCard extends React.Component {
  static propTypes = {
    dog: dogShape.dogShape,
  }

  render() {
    const { dog } = this.props;

    const singleDogLink = `/dogs/${dog.id}`;

    return (
      <div>
      <Card>
        <CardImg top width="100%" src={dog.dogImage} alt="Card image cap" />
          <CardBody>
            <CardTitle>{dog.dogName}</CardTitle>
            <ButtonGroup>
              <Button><i className="fas fa-edit"></i></Button>
              <Button tag={RRLink} to={singleDogLink}><i className="fas fa-eye"></i></Button>
          </ButtonGroup>
          </CardBody>
      </Card>
    </div>
    );
  }
}

export default DogCard;
