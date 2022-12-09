import React, {useRef, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";

import Api from '../api'

const LoginModal = ({show, setShow, goReg, setToast, setLogged}) => {

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
            Api.login({username: username, password: password} )
                .then( (res)=>{
                    if(res.error){
                        setToast({show:true, data:{color:'danger', text:'pop up sth went wrong...', textColor:'light'}})
                    } else {
                        setShow(false)
                        setLogged(username)
                        setToast({show:true, data:{color:'success', text:'Successfully logged in', textColor:'light'}})
document.location.reload()
                    }
                } )
                .catch( (err)=>{
                    setToast({show:true, data:{color:'danger', text:'pop up sth went wrong...  (during login)', textColor:'light'}})
                    throw err
                } )
        }
    }


    return (
        <Modal show={show} centered onHide={()=>setShow(false)}>
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
                    <div className='w-100'>
                        <Button variant="primary" onClick={()=>handleSubmit()} className='me-2'>
                            Login
                        </Button>
                        <Button variant="secondary" onClick={()=>setShow(false)}>
                            Close
                        </Button>
                    </div>
                    <span className='text-secondary'> Already have an account? <a href='#' onClick={()=>{setShow(false); goReg(true)}}> Sign up </a> </span>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default LoginModal;