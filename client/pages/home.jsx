import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PostCard from './card';

export default class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spots: [],
      users: []
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

    fetch('api/users')
      .then(res => res.json())
      .then(users =>
        console.log(users)
        // this.setState({ users }))
      )
      .catch(err => {
        console.log('Error Reading Data' + err);
      });
  }

  render() {
    const { spots } = this.state;
    const { user } = this.context;
    return (
      <Container className='feed-cont'>
        <Row className='pt-5'>
          <Col>
            {spots.map(spots => (
              <PostCard
                key={spots.spotId}
                title={spots.eventName}
                photoUrl={spots.photoUrl}
                description={spots.description}
                userName={spots.userId}
                button='View More'
                href={`#pins?postId=${spots.postId}`}
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
