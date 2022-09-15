import React from 'react';
import ReactDOM from 'react-dom';
import Map from '../pages/map';
import {
  GoogleMap
} from '@react-google-maps/api';

const mapContainerStyles = {
  width: '10vw',
  height: '10vh'
};
const center = {
  lat: 34.052235,
  lng: -118.243683
};

const options = {
  disableDefaultUI: true,
  zoomControl: false
};

export default class NewEntry extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
    this.state = {
      username: ''
    };

  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  handleSumbit(event) {
    event.preventDefault();
  }

  renderPage() {
    return (
      <div id='modal'>
      <div className='middle'>
     <form className='newrow'>
      <h1>New Entry</h1>
      <div className="col-md-3">
        <label htmlFor="Title" className="form-label">Title</label>
            <input type="text" className="form-control input-padding-x-lg" id="TitleInput" />
      </div>
      <div className="col-md-3">
        <label htmlFor="inputPassword4" className="form-label">Rating</label>
        <input type='number' />
      </div>
          <div className="col-md-5">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="Description" rows="3"></textarea>
          </div>

            <div className="col-md-3">
              <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            <div>
              <Map>
              <GoogleMap
                mapContainerStyle={mapContainerStyles}
                zoom={10}
                center={center}
                options={options}
              >
                </GoogleMap>
              </Map>
              </div>
    </form>
      </div>
      </div>
    );
  }

  render() {
    return (
      <>

      {this.renderPage()}
      </>
    );
  }
}

ReactDOM.render(
  <NewEntry />,
  document.querySelector('#root')
);
