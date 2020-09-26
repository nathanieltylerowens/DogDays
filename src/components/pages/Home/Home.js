import React from 'react';

import { CardDeck } from 'reactstrap';

import authData from '../../../helpers/data/authData';
import dogsData from '../../../helpers/data/dogsData';
import DogCard from '../../shared/DogCard';

import './Home.scss';

class Home extends React.Component {
  state = {
    dogs: [],
  }

  getDogs = () => {
    dogsData.getDogsByUid(authData.getUid())
      .then((dogs) => this.setState({ dogs }))
      .catch((err) => console.error('get dogs done broke', err));
  }

  componentDidMount() {
    this.getDogs();
  }

  deleteDog = (dogId) => {
    dogsData.deleteDog(dogId)
      .then(() => this.getDogs())
      .catch((err) => console.error('delete dog done broke', err));
  }

  render() {
    const { dogs } = this.state;

    const dogCards = dogs.map((dog) => <DogCard key={dog.id} dog={dog} deleteDog={this.deleteDog}/>);

    return (
      <div className="Home">
        <h1>My Dogs</h1>
        <CardDeck>
          {dogCards}
        </CardDeck>
      </div>
    );
  }
}

export default Home;
