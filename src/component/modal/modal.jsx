import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalServer() {
    useEffect(()=>{
handleShow();
    },[])
  const [show, setShow] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  return (
    <>
 
      <Modal show={show} fullscreen={fullscreen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalServer;