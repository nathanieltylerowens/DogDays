import React from 'react';

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import dogsData from '../../../helpers/data/dogsData';

class EditDog extends React.Component {
  state = {
    dog: {
      dogName: '',
      dogImage: '',
      dogAge: '',
      dogBreed: '',
    },
  }

  componentDidMount() {
    dogsData.getDogById(this.props.match.params.dogId)
      .then((res) => {
        const dog = res.data;
        dog.seenAt = new Date(dog.seenAt);
        this.setState({ dog });
      })
      .catch((err) => console.error('get dog for edit done broke', err));
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    const { dog } = this.state;
    dog.dogName = e.target.value;
    this.setState({ dog });
  };

  changeImageEvent = (e) => {
    e.preventDefault();
    const { dog } = this.state;
    dog.dogImage = e.target.value;
    this.setState({ dog });
  }

  changeAgeEvent = (e) => {
    e.preventDefault();
    const { dog } = this.state;
    dog.dogAge = e.target.value;
    this.setState({ dog });
  }

  changeBreedEvent = (e) => {
    e.preventDefault();
    const { dog } = this.state;
    dog.dogBreed = e.target.value;
    this.setState({ dog });
  }

  updateDogEvent = (e) => {
    e.preventDefault();
    const { dogId } = this.props.match.params;

    dogsData
      .updateDog(dogId, this.state.dog)
      .then(() => {
        this.props.history.push(`/home/${dogId}`);
      })
      .catch((err) => console.error('edit dog done broke', err));
  };

  render() {
    const {
      dogName,
      dogImage,
      dogAge,
      dogBreed,
    } = this.state.dog;

    return (
      <div className="EditDog">
        <h1>Edit Dog's Info</h1>
        <Form>
          <FormGroup>
            <Label htmlFor="dogName">Name</Label>
            <Input
            type="text"
            name="form-control"
            id="dogName"
            value={dogName}
            onChange={this.changeNameEvent} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="dogImage">Photo</Label>
            <Input
            type="text"
            name="form-control"
            id="dogImage"
            value={dogImage}
            onChange={this.changeImageEvent} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="dogAge">Age</Label>
            <Input
            type="text"
            name="form-control"
            id="dogAge"
            value={dogAge}
            onChange={this.changeAgeEvent} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="dogBreed">Breed</Label>
            <Input
            type="text"
            name="form-control"
            id="dogBreed"
            value={dogBreed}
            onChange={this.changeBreedEvent} />
          </FormGroup>
          <Button className="btn btn-outline-warning" onClick={this.updateDogEvent}>Save</Button>
        </Form>
      </div>
    );
  }
}

export default EditDog;
