import React, {useRef, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";

const LoginModal = ({show, setShow, goReg}) => {

    const usernameEl = useRef(),
        passwordEl = useRef(),
        [usernameFeedback, setUsernameFeedback] = useState(''),
        [passwordFeedback, setPasswordFeedback] = useState('')


    const handleSubmit = () => {
        const username = usernameEl.current.value,
            password = passwordEl.current.value

        setUsernameFeedback('')
        setPasswordFeedback('')

        if(!username){
            setUsernameFeedback('Please enter username')
        } else if(!password){
            setPasswordFeedback('Please enter password')
        } else {
            //api query
        }
    }


    return (
        <Modal show={show} onHide={()=>setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title> Login </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='mb-3'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label> Username </Form.Label>
                        <Form.Control type="text" placeholder="Username" ref={usernameEl} className={`${usernameFeedback?'is-invalid':''}`}/>
                        <div className="invalid-feedback"> {usernameFeedback} </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={passwordEl} className={`${passwordFeedback?'is-invalid':''}`}/>
                        <div className="invalid-feedback"> {passwordFeedback} </div>
                    </Form.Group>
                </Form>
                <div className="w-100 d-flex justify-content-between align-items-end">
                    <div>
                        <Button variant="secondary" onClick={()=>setShow(false)} className='me-2'>
                            Close
                        </Button>
                        <Button variant="primary" onClick={()=>handleSubmit()}>
                            Login
                        </Button>
                    </div>
                    <span className='text-secondary'> Already have an account? <a href='#' onClick={()=>{setShow(false); goReg(true)}}> Sign up </a> </span>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default LoginModal;