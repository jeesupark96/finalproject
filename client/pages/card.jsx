import React from 'react';
import { Card, Button, Image, Container } from 'react-bootstrap';

export default function PostCard(props) {
  return (
    <>
      <Card>
        <Card.Img
          style={{ width: '20px', maxHeight: '55vh', objectFit: 'cover' }}
          className='img-fluid'
          variant='top'
          src={props.firstName}/>
        <Card.Body className='pt-2'>
          <Container className='d-flex px-0 container'>
            <Container className='img-cont' >

            </Container>
            <Container className='spot-info'>
              <Card.Title
                className={
                  `head-text pri-color py-2 ${props.reported === true
                    ? 'me-5'
                    : ''}`
                }
              >
                {props.reported === true}
                {props.userName}
              </Card.Title>

              <Card.Text className='fw-bold pri-color pin-text'>
                Title: {props.title}
                {props.saved === null}
              </Card.Text>
              <Card.Text>
                {props.description}
              </Card.Text>
              <Image
                className='profile-pic sec-bk-color'
                src={props.photoUrl}>
              </Image>
            </Container>
          </Container>
          <Container className='d-grid'>
            <Button size='med' className='mt-2' href={'#map' + props.href}>
              {props.button}
            </Button>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
}
