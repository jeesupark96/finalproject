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
      .then(spots => this.setState({ spots }))
      .catch(err => {
        console.log('Error Reading Data' + err);
      });
  }

  render() {
    const { spot } = this.state;
    const { user } = this.context;
    return (
      <Container className='feed-cont'>
        <Row className='pt-5'>
          <Col>
            {spot => (
              <PostCard
                key={spot.postId}
                title={spot.eventName}
                photoUrl={spot.photoUrl}
                userName={spot.firstName}
                button='View More'
                href={`#pins?postId=${spot.postId}`}
                saver={spot.saver}
                userId={user.userId}
                reported={spot.reported}
              />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
