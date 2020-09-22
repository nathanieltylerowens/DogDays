import React from 'react';
import Datepicker from 'react-datepicker';

import {
  Button,
  Form,
  FormGroup,
  Label,
} from 'reactstrap';

import 'react-datepicker/dist/react-datepicker.css';

import groomingData from '../../../helpers/data/groomingData';

class EditGrooming extends React.Component {
  state = {
    grooming: {
      dogId: '',
      nailDate: new Date(),
      brushDate: new Date(),
      bathDate: new Date(),
    },
  }

  componentDidMount() {
    groomingData.getGroomingById(this.props.match.params.groomingId)
      .then((res) => {
        const grooming = res.data;
        grooming.bathDate = new Date(grooming.bathDate);
        grooming.brushDate = new Date(grooming.brushDate);
        grooming.nailDate = new Date(grooming.nailDate);
        this.setState({ grooming });
      })
      .catch((err) => console.error('get grooming for edit done broke', err));
  }

  changeBathDateEvent = (bathDate) => {
    const { grooming } = this.state;
    grooming.bathDate = bathDate;
    this.setState({ grooming });
  };

  changeBrushDateEvent = (brushDate) => {
    const { grooming } = this.state;
    grooming.brushDate = brushDate;
    this.setState({ grooming });
  };

  changeNailDateEvent = (nailDate) => {
    const { grooming } = this.state;
    grooming.nailDate = nailDate;
    this.setState({ grooming });
  };

  updateGroomingEvent = (e) => {
    e.preventDefault();
    const { groomingId } = this.props.match.params;

    groomingData
      .updateGrooming(groomingId, this.state.grooming)
      .then((res) => {
        // console.log(res);
        this.props.history.push(`/dogs/${res.data.dogId}`);
      })
      .catch((err) => console.error('edit grooming done broke', err));
  };

  render() {
    const {
      nailDate,
      brushDate,
      bathDate,
    } = this.state.grooming;

    return (
      <div className="EditGrooming">
        <h1>Edit Dog's Info</h1>
        <Form>
        <FormGroup>
            <Label htmlFor="brushDate">Last Brushed:</Label>
            <Datepicker
            selected={brushDate}
            onChange={this.changeBrushDateEvent}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="bathDate">Last Bathed:</Label>
            <Datepicker
            selected={bathDate}
            onChange={this.changeBathDateEvent}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="nailDate">Nails Clipped:</Label>
            <Datepicker
            selected={nailDate}
            onChange={this.changeNailDateEvent}
            />
          </FormGroup>
          <Button className="btn btn-outline-warning" onClick={this.updateGroomingEvent}>Groomed 'Em</Button>
        </Form>
      </div>
    );
  }
}

export default EditGrooming;
