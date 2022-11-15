
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ModalDelete(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title className='warning'>
            Delete This City Canvas Pin
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to delete this City Canvas pin?
        </Modal.Body>

        <Modal.Footer className='position-relative pt-3 pb-4'>
          <Button
            className='cancel'
            onClick={props.close}
            disabled={props.isLoading}
          >
            Cancel
          </Button>
          <Button
            className='del warning-bk'
            onClick={props.deletePin}
            disabled={props.isLoading}
          >
            Delete
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}
