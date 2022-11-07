import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PostCard from './card';

export default class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spots: []
    };
  }

  componentDidMount() {

    fetch('/api/spots')
      .then(res => res.json())
      .then(spots =>
        this.setState({ spots }))
      .catch(err => {
        console.log('Error Reading Data' + err);
      });

  }

  render() {
    const { spots } = this.state;
    return (
      <Container className='feed-cont'>
        <h1></h1>
        <Row className='pt-5'>
          <Col>
            {spots.map(spots => (
              <PostCard
                key={spots.userId}
                title={spots.eventName}x
                photoUrl={spots.photoUrl}
                description={spots.description}
                userName={spots.firstName}
                button='View More'
                href={`${spots.spotId}`}
                saver={spots.saver}
                reported={spots.reported}
              />
            ))}
          </Col>
        </Row>
      </Container>
    );
  }

}
