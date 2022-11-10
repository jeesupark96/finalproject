import React from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import NewPinMap from './new-spot-map';
import AppContext from '../lib/app-context';
import checkAlphanumeric from '../lib/check-alphanumeric';

export default class NewSpotForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      photoFile: '',
      description: '',
      marker: {},
      isLoading: false,
      networkError: false,
      formErrors: {},
      userId: 1
    };

    this.errorMessage = this.errorMessage.bind(this);
    this.fileInputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.setMarker = this.setMarker.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Display form field error to user when field doesn't meet requirements:
  errorMessage(message, idName) {
    if (message) {
      return (
        <Form.Text id={idName} className='d-block warning'>
          {message}
        </Form.Text>
      );
    }
  }

  // Update state with form field changes:
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  setMarker(marker) {
    this.setState({ marker });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { eventName, description, userId, marker, formErrors } = this.state;
    let errorsPresent = false;

    // Clear any error messages from a previously failed form submission:
    if (formErrors) {
      this.setState({ formErrors: {} });
    }

    // Check for empty fields and display error message where applicable:
    if (!eventName || !checkAlphanumeric(eventName)) {
      this.setState(oldState => ({
        formErrors: {
          ...oldState.formErrors,
          titleError: 'Title is a required field'
        },
        isLoading: false
      }));
      errorsPresent = true;
    }
    // if (!name || !checkAlphanumeric(name)) {
    //   this.setState(oldState => ({
    //     formErrors: {
    //       ...oldState.formErrors,
    //       nameError: 'name Name or Tag is a required field'
    //     },
    //     isLoading: false
    //   }));
    //   errorsPresent = true;
    // }
    if (!this.fileInputRef.current.files[0]) {
      this.setState(oldState => ({
        formErrors: {
          ...oldState.formErrors,
          imageError: 'A Photo upload is required'
        },
        isLoading: false
      }));
      errorsPresent = true;
    }
    if (!description || !checkAlphanumeric(description)) {
      this.setState(oldState => ({
        formErrors: {
          ...oldState.formErrors,
          descriptionError: 'Description or information about the spot is required'
        },
        isLoading: false
      }));
      errorsPresent = true;
    }
    if (!('lat' in marker) || !('lng' in marker)) {
      this.setState(oldState => ({
        formErrors: {
          ...oldState.formErrors,
          mapError: 'Please pin a location on the map and try again.'
        },
        isLoading: false
      }));
      errorsPresent = true;
    }
    if (!errorsPresent) {
      const formData = new FormData();
      formData.append('eventName', eventName);
      formData.append('image', this.fileInputRef.current.files[0]);
      formData.append('description', description);
      formData.append('lat', parseInt(marker.lat));
      formData.append('lng', parseInt(marker.lng));
      formData.append('userId', userId);

      const req = {
        method: 'POST',
        body: formData

      };
      fetch('/api/spots', req)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          this.setState({
            eventName: '',
            photoFile: 'asdf',
            description: '',
            marker: {},
            userId,
            internalError: false,
            formErrors: {}
          });
          this.fileInputRef.current.value = null;

        }
        )
        .catch(err => {
          console.error('Fetch Failed!', err);
          this.setState({ networkError: true });
        });
    }
  }

  render() {
    const { handleChange, handleSubmit, setMarker, errorMessage, state } = this;
    const { formErrors } = state;

    return (
      <Container className='form-container px-0'>
        <Form className='position-relative  pb-2' onSubmit={handleSubmit}>

          <Form.Label className='mt-2' htmlFor='title'>
            Spot Title:
          </Form.Label>
          <Form.Control
            autoFocus
            required
            id='title'
            type='text'
            name='eventName'
            value={this.state.eventName}
            placeholder='Enter Title, or "Unknown"'
            onChange={handleChange}
            aria-describedby='titleErrorMessage'
          />
          {formErrors.titleError
            ? errorMessage(formErrors.titleError, 'titleErrorMessage')
            : null
          }

          <Form.Label htmlFor='description'>
            Description or information:
          </Form.Label>

          <Form.Control
            required
            id='description'
            as='textarea'
            name='description'
            value={state.description}
            rows={4}
            placeholder='Add some description about this spot...'
            onChange={handleChange}
            aria-describedby='descriptionErrorMessage'
          />
          {formErrors.descriptionError
            ? errorMessage(formErrors.descriptionError, 'descriptionErrorMessage')
            : null
          }

          <Form.Label>Food & Spot Photo:</Form.Label>
          <Form.Control
            required
            id='image'
            type='file'
            name='image'
            ref={this.fileInputRef}
            accept='.png, .jpg, .jpeg, .webp'
            aria-describedby='imageErrorMessage'
          />
          {formErrors.imageError
            ? errorMessage(formErrors.imageError, 'imageErrorMessage')
            : null
          }

          <p className='form-label'>
            Click the map to drop a pin at the spot location:
          </p>
          <NewPinMap marker={state.marker} setMarker={setMarker}>
          </NewPinMap>
          {formErrors.mapError
            ? errorMessage(formErrors.mapError, 'mapErrorMessage')
            : null
          }

          <Button
            className='mt-3 mb-5'
            type='submit'
            disabled={state.isLoading}
          >
            Submit
          </Button>
          {state.isLoading

          }

        </Form>
      </Container>
    );
  }
}

NewSpotForm.contextType = AppContext;
