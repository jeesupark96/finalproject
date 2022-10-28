import React from 'react';

export default class myProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spots: []
    };
  }

  componentDidMount() {
    if (props.saved === 'yes') {
      fetch('/api/spots')
        .then(res => res.json)
        .then(spots => this.setState({ spots }))
        .catch(err => {
          console.log('Error Reading Data' + err);
        });
    }
  }
}
