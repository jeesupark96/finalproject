import React from 'react';
import MapDetails from './moredetailsmap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ModalDelete from './modal-delete';

const styles = {
  image: {
    width: '100%',
    height: '350px',
    objectFit: 'contain'
  },
  longDescription: {
    whiteSpace: 'pre-wrap'
  }
};

export default class SpotDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spots: null,
      show: false
    };
    this.ModalShow = this.ModalShow.bind(this);
  }

  componentDidMount() {
    fetch(`/api/spots/${this.props.spotId}`)
      .then(res => res.json())
      .then(spots => this.setState({ spots }));
  }

  ModalShow() {
    this.setState({ show: true });
  }

  ModalHide() {
    this.setState({ show: false });
  }

  render() {
    let show = true;
    let hide = false;
    if (this.state.show === false) {
      show = false;
      hide = true;
    } else {
      show = true;
      hide = false;
    }

    if (!this.state.spots) return null;
    const {
      eventName, photoFile, description, firstName, lastName, lat, lng, spotId
    } = this.state.spots;
    return (
      <div className="container">
        <div>
          <ModalDelete
          show={show}
          onHide={hide} >
          </ModalDelete>
        </div>
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="row">
              <div className="col">
                {/* this anchor should go back to the catalog at '#' */}
                <a href="#home" className="btn text-secondary">
                  &lt; Back to Home Page
                </a>
              </div>
            </div>
            <div className='row'>
              <h1>{firstName + ' ' + lastName}</h1>
            </div>
            <div className="row mb-4">
              <FontAwesomeIcon
              icon={(faTrash)}
                onClick={(this.ModalShow)}
               >
            </FontAwesomeIcon>

              <div className="col-12 col-sm-6 col-md-5">
                <img src={photoFile} alt={name} style={styles.image} />
              </div>
              <div className="col-12 col-sm-6 col-md-7">
                <h2>{eventName}</h2>
                <p>{description}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p style={styles.longDescription}>
                  {}
                </p>
              </div>
            </div>

            <div>
      <MapDetails
      spotId={spotId}
      position={{ lat, lng }}
      eventName={eventName}
      photoFile={photoFile}
      name={firstName + ' ' + lastName}
      >

      </MapDetails>

            </div>
          </div>
        </div>
        <ModalDelete ></ModalDelete>
      </div>
    );

  }

}
