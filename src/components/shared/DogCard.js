import React from 'react';
import PropTypes from 'prop-types';

import {
  Link as RRLink,
} from 'react-router-dom';

import {
  Card, CardImg, CardBody,
  CardTitle, ButtonGroup, Button,
} from 'reactstrap';

import dogShape from '../../helpers/propz/dogShape';

const DogCard = (props) => {
  const { dog, deleteDog } = props;

  const singleDogLink = `/dogs/${dog.id}`;
  const editDogLink = `/edit/${dog.id}`;

  return (
    <div>
      <Card>
        <CardImg top width="100%" src={dog.dogImage} alt="Card image cap" />
          <CardBody>
            <CardTitle>{dog.dogName}</CardTitle>
            <Button tag={RRLink} to={singleDogLink}><i className="fas fa-eye"></i></Button>
            <ButtonGroup>
              <Button tag={RRLink} to={editDogLink}><i className="fas fa-edit"></i></Button>
              <Button onClick={() => { deleteDog(dog.id); }}><i className="fas fa-trash"></i></Button>
          </ButtonGroup>
          </CardBody>
      </Card>
    </div>
  );
};

DogCard.propTypes = {
  dog: dogShape.dogShape,
  deleteDog: PropTypes.func.isRequired,
};

export default DogCard;
