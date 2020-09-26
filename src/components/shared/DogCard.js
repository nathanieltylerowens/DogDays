import React from 'react';
import PropTypes from 'prop-types';

import {
  Link as RRLink,
} from 'react-router-dom';

import {
  Card, CardImg, CardBody,
  CardTitle, ButtonGroup, Button, CardImgOverlay,
} from 'reactstrap';

import './DogCard.scss';

import dogShape from '../../helpers/propz/dogShape';

const DogCard = (props) => {
  const { dog, deleteDog } = props;

  const singleDogLink = `/dogs/${dog.id}`;
  const editDogLink = `/edit/${dog.id}`;

  return (
    <div className="dogCard">
      <Card className="homeCard">
        <CardImg top width="100%" src={dog.dogImage} className="homeImage" alt="Card image cap" />
          <CardBody className="homeCardBody">
            <CardImgOverlay tag={RRLink} to={singleDogLink}>
              <CardTitle className="homeName">{dog.dogName}</CardTitle>
            </CardImgOverlay>
          </CardBody>
        <ButtonGroup>
          <Button className="homeEdit" tag={RRLink} to={editDogLink}>EDIT PET</Button>
          <Button className="homeDelete" onClick={() => { deleteDog(dog.id); }}>DELETE</Button>
        </ButtonGroup>
      </Card>
    </div>
  );
};

DogCard.propTypes = {
  dog: dogShape.dogShape,
  deleteDog: PropTypes.func.isRequired,
};

export default DogCard;
