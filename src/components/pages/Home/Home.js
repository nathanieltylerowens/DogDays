import React from 'react';

import { CardColumns } from 'reactstrap';

import authData from '../../../helpers/data/authData';
import dogsData from '../../../helpers/data/dogsData';
import DogCard from '../../shared/DogCard';

class Home extends React.Component {
  state = {
    dogs: [],
  }

  componentDidMount() {
    dogsData.getDogsByUid(authData.getUid())
      .then((dogs) => this.setState({ dogs }))
      .catch((err) => console.error('get dogs done broke', err));
  }

  render() {
    const { dogs } = this.state;

    const dogCards = dogs.map((dog) => <DogCard key={dog.id} dog={dog}/>);

    return (
      <div className="Home">
        <h1>My Dogs</h1>
        <CardColumns>
          {dogCards}
        </CardColumns>
      </div>
    );
  }
}

export default Home;
