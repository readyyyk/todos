import React from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const SignoutModal = ({show, setShow, setToast}) => {

    const handleSubmit = () => {
        document.cookie = ''
        setToast({show:true, data:{color:'success', text:'Successfully signed out', textColor:'light'}})
        setShow(false)
    }

    return (
        <Modal show={show} centered onHide={()=>setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title> Sign out </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span className='fs-4'> Are you sure? </span>
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