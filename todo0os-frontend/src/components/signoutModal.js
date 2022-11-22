import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";

const SignoutModal = ({show, setShow}) => {

    const handleSubmit = () => {
        document.cookie = ''
        setShow(false)
    }

    return (
        <Modal show={show} onHide={()=>setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title> Sign out </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span className='fs-3'> Are you sure? </span>
                <div className='mt-3'>
                    <Button variant="danger" onClick={()=>handleSubmit()} className='me-2'>
                        Sign out
                    </Button>
                    <Button variant="secondary" onClick={()=>setShow(false)}>
                        Cancel
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default SignoutModal;