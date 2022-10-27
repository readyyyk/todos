import React, {useRef} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

const ModalBs = ({modalShow, setModalShow, showToastHandler, setLoggedId}) => {

	const login = useRef(),
		password = useRef()

	const loginAction = (e) => {
		e.preventDefault()
		fetch(`/loginAction/${login.current.value}/${password.current.value}`, { method:'GET' })
		.then(response => response.json() )
		.then(response => {
			const temp = {
				show: true,
				success: false,
				action: 'login'
			}
			if(response.success){
				temp.success = true
				document.cookie = `id=${response.loggedId};`
				document.cookie =  `login=${response.loggedLogin};`
				setLoggedId({id: response.loggedId, login: response.loggedLogin})
			}

			showToastHandler(temp)
		})
	}

	return (
		<Modal size="lg" centered show={modalShow}>
			<Modal.Header>
				<Modal.Title>
					Sign in / Sign up
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Control type="text" placeholder="Login" autoComplete='on' ref={login}/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Control type="password" placeholder="Password" ref={password} autoComplete='on' omplete="on"/>
					</Form.Group>

					<Button onClick={(e)=>loginAction(e)} variant="primary" type="submit" className='me-2'> Submit </Button>
					<Button onClick={()=>setModalShow(false)} variant='secondary'> Cancel </Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default ModalBs;