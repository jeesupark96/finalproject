import React from 'react';
import { Card, Button, Image, Container } from 'react-bootstrap';

export default function PostCard(props) {
  return (
    <>
      <Card>
        <Card.Img
          style={{ width: '100vw', maxHeight: '55vh', objectFit: 'cover' }}
          className='img-fluid'
          variant='top'
          src={props.firstName} />
        <Card.Body className='pt-2'>
          <Container className='d-flex px-0'>
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
                {props.reported === true
                  ? <span className='warning absolute-right'>
                    <i className='fas fa-exclamation fa-sm'></i>
                    <i className='ms-1 fas fa-eye-slash fa-sm'></i>
                  </span>
                  : null}
                {props.userName}
              </Card.Title>

              <Card.Text className='fw-bold pri-color pin-text'>
                Title: {props.title}
                {props.saved === null
                  ? null
                  : <i className='absolute-right sec-color fas fa-heart fa-lg ms-2'></i>}
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
            <Button size='lg' className='mt-3' href={props.href}>
              {props.button}
            </Button>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
}
