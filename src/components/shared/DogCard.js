import React from 'react';

import {
  Card, CardImg, CardBody,
  CardTitle,
} from 'reactstrap';

import dogShape from '../../helpers/propz/dogShape';

class DogCard extends React.Component {
  static propTypes = {
    dog: dogShape.dogShape,
  }

  render() {
    const { dog } = this.props;

    return (
      <div>
      <Card>
        <CardImg top width="100%" src={dog.dogImage} alt="Card image cap" />
          <CardBody>
            <CardTitle>{dog.dogName}</CardTitle>
          </CardBody>
      </Card>
    </div>
    );
  }
}

export default DogCard;
