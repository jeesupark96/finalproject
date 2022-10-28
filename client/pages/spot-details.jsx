import React from 'react';

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
      spots: null
    };
  }

  componentDidMount() {
    console.log(this.props.spotId);
    fetch(`/api/spots/${this.props.spotId}`)
      .then(res => res.json())
      .then(spots => this.setState({ spots }));
  }

  render() {
    if (!this.state.spots) return null;
    const {
      eventName, photoUrl, description, firstName, lastName
    } = this.state.spots;
    return (
      <div className="container">
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
              <div className="col-12 col-sm-6 col-md-5">
                <img src={photoUrl} alt={name} style={styles.image} />
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
          </div>
        </div>
      </div>
    );
  }
}
