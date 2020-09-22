import React from 'react';
import Datepicker from 'react-datepicker';

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import 'react-datepicker/dist/react-datepicker.css';

import pottyData from '../../../helpers/data/pottyData';

class EditPotty extends React.Component {
  state = {
    potty: {
      dogId: '',
      pottyType: '',
      pottyDate: new Date(),
    },
  }

  componentDidMount() {
    pottyData.getPottyById(this.props.match.params.pottyId)
      .then((res) => {
        const potty = res.data;
        potty.pottyDate = new Date(potty.pottyDate);
        this.setState({ potty });
      })
      .catch((err) => console.error('get potty for edit done broke', err));
  }

  changePottyTypeEvent = (e) => {
    e.preventDefault();
    const { potty } = this.state;
    potty.pottyType = e.target.value;
    this.setState({ potty });
  };

  changePottyDateEvent = (pottyDate) => {
    const { potty } = this.state;
    potty.pottyDate = pottyDate;
    this.setState({ potty });
  };

  updatePottyEvent = (e) => {
    e.preventDefault();
    const { pottyId } = this.props.match.params;

    pottyData
      .updatePotty(pottyId, this.state.potty)
      .then((res) => {
        // console.log(res);
        this.props.history.push(`/dogs/${res.data.dogId}`);
      })
      .catch((err) => console.error('edit potty done broke', err));
  };

  render() {
    const {
      pottyType,
      pottyDate,
    } = this.state.potty;

    return (
      <div className="EditPotty">
        <h1>Edit Dog's Info</h1>
        <Form>
        <FormGroup>
            <Label htmlFor="pottyType">Type:</Label>
            <Input
            type="text"
            name="form-control"
            id="pottyType"
            value={pottyType}
            onChange={this.changePottyTypeEvent} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="pottyDate">When:</Label>
            <Datepicker
            selected={pottyDate}
            onChange={this.changePottyDateEvent}
            showTimeSelect
            timeFormat="p"
            timeIntervals={15}
            dateFormat="MM/dd h:mm aa"
            />
          </FormGroup>
          <Button className="btn btn-outline-warning" onClick={this.updatePottyEvent}>Taken Out!</Button>
        </Form>
      </div>
    );
  }
}

export default EditPotty;
