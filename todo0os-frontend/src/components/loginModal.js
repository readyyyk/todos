import React, {useRef, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";

import Api from '../api'

const LoginModal = ({show, setShow, goReg, setToast, setLoaderShow}) => {

    const usernameEl = useRef(),
        passwordEl = useRef(),
        [usernameFeedback, setUsernameFeedback] = useState({show: false, data: <></>}),
        [passwordFeedback, setPasswordFeedback] = useState({show: false, data: <></>})

    const close = () => {
        setShow(false)
        setUsernameFeedback({show: false, data: <></>})
        setPasswordFeedback({show: false, data: <></>})
    }
    const handleSubmit = () => {
        const username = usernameEl.current.value,
            password = passwordEl.current.value

        setUsernameFeedback('')
        setPasswordFeedback('')

        if(!username){
            setUsernameFeedback({show: true, data: <>Please enter username</>})
        } else if(!password){
            setPasswordFeedback({show: true, data: <>Please enter password</>})
        } else {
            Api.login({username: username, password: password} )
                .then( (res)=>{
                    if(res.error){
                        res.info.text
                            .then( resError => {
                                resError = JSON.parse(resError)
                                switch (resError.error){
                                    case '0':
                                        setUsernameFeedback({show:true, data: <> no user with username <b><i>{username}</i></b> found </>} )
                                        break
                                    case '1':
                                        setPasswordFeedback({show: true, data: <> Wrong password! </>})
                                        break
                                    default:
                                        setToast({show:true, data:{color:'danger', text:'Sth went wrong... (during login)', textColor:'light'}})
                                        break
                                }
                            } )
                    } else {
                        setShow(false)
                        setToast({show: true,data: {color: 'success', text: 'Successfully logged in', textColor: 'light'}})
                        setLoaderShow(true)
                    }
                } )
                .catch( (err)=>{
                    setToast({show:true, data:{color:'danger', text:'Sth went wrong... (during login)', textColor:'light'}})
                    throw err
                } )
        }
    }


    return (
        <Modal show={show} centered onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title> Login </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='mb-3'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label> Username </Form.Label>
                        <Form.Control type="text" placeholder="Username" ref={usernameEl} className={`${usernameFeedback.show?'is-invalid':''}`}/>
                        <div className="invalid-feedback"> {usernameFeedback.data} </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={passwordEl} className={`${passwordFeedback.show?'is-invalid':''}`}/>
                        <div className="invalid-feedback"> {passwordFeedback.data} </div>
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
                    <span className='text-secondary'> Already have an account? <a href='#' onClick={()=>{goReg(true); close();}}> Sign up </a> </span>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default LoginModal;