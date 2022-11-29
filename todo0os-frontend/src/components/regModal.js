import React, {useRef, useState} from 'react';
import Api from '../api'

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const RegModal = ({show, setShow, goLogin, setToast}) => {

    const usernameEl = useRef(),
        password1El = useRef(),
        password2El = useRef(),

        [usernameFeedback, setUsernameFeedback] = useState(''),
        [password1Feedback, setPassword1Feedback] = useState(''),
        [password2Feedback, setPassword2Feedback] = useState(''),
        format = /^[a-zA-Z0-9_]+$/;

    const handleSubmit = () => {

        setUsernameFeedback('')
        setPassword1Feedback('')
        setPassword2Feedback('')

        const username = usernameEl.current.value,
            p1 = password1El.current.value,
            p2 = password2El.current.value

        if(!username){
            setUsernameFeedback('please choose a username')
        } else if(!format.test(username)){
            setUsernameFeedback('username should contain only latin letters, numbers and underscore')
        } else if(p1.length < 4){
            setPassword1Feedback('passwords should contain at least 4 symbols')
        } else if(p1 !== p2){
            setPassword2Feedback('passwords are different')
        } else {
            Api.registration({username, p1})
            .then( (res)=>{
                if(res.error){
                    setToast({show:true, data:{color:'danger', text:'sth went wrong... ', textColor:'light'}})
                } else {
                    console.log(`registered successfully u:${username} p:${p1}`)
                    setToast({show:true, data:{color:'success', text:'Successfully registered', textColor:'light'}})
                    setShow(false)
                }
            })
            .catch( (err)=>{
                setToast({show:true, data:{color:'danger', text:'sth went wrong... (during registration)', textColor:'light'}})
                throw err
            } )
        }

    }

    return (
        <Modal show={show} centered onHide={()=>setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title> Registration </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='mb-3'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label> Username </Form.Label>
                        <Form.Control type="text" placeholder="Username" ref={usernameEl} className={`${usernameFeedback?'is-invalid':''}`}/>
                        <div className="invalid-feedback">{usernameFeedback}</div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={password1El} className={`${password1Feedback?'is-invalid':''}`}/>
                        <div className="invalid-feedback">{password1Feedback}</div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label> Repeat your password</Form.Label>
                        <Form.Control type="password" placeholder="Repeat your password" ref={password2El} className={`${password2Feedback?'is-invalid':''}`}/>
                        <div className="invalid-feedback">{password2Feedback}</div>
                    </Form.Group>
                </Form>

                <div className='w-100 d-flex justify-content-between align-items-end'>
                    <div className='w-100'>
                        <Button variant="success" onClick={()=>handleSubmit()} className='me-2'>
                            Submit
                        </Button>
                        <Button variant="secondary" onClick={()=>setShow(false)}>
                            Cancel
                        </Button>
                    </div>
                    <span className='text-secondary'> Already have an account? <a href='#' onClick={()=>{setShow(false); goLogin(true)}}> Sign in </a> </span>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default RegModal;