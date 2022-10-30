import React, {useRef} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

const ModalBs = ({setModalShow, modalShow, setToastShow, setLoggedId, popoverShowSet, apiLink}) => {

	const login = useRef(),
		password = useRef(),
		passwordRep = useRef()

	const loginAction = (e) => {
		e.preventDefault()
		fetch(`${apiLink}/loginAction/${login.current.value}/${password.current.value}`, { method:'GET' })
		.then(response => response.json() )
		.then(response => {
			const temp = {
				show: true,
				success: false,
				action: 'login',
				text: 'You are not logged in'
			}
			if(response.success){
				temp.success = true
				temp.text = 'Successfully logged in'

				document.cookie = `id=${response.loggedId};`
				document.cookie =  `login=${response.loggedLogin};`
				setLoggedId({id: response.loggedId, login: response.loggedLogin})
			}

			popoverShowSet(true)
			setToastShow(temp)
			setModalShow({show:false, action:'login'})
		})
	}

	const regAction = (e) => {
		e.preventDefault()
		if(password.current.value === passwordRep.current.value){
			fetch(`${apiLink}/regAction/${login.current.value}/${password.current.value}`, { method:'POST' })
			.then(response => response.json() )
			.then(response => {
				const temp = {
					show: true,
					success: false,
					action: 'reg',
					text: 'You are not registered'
				}
				if(response.success){
					temp.success = true
					temp.text = 'Successfully registered'

					document.cookie = `id=${response.loggedId};`
					document.cookie =  `login=${login.current.value};`
					setLoggedId({id: response.loggedId, login: login.current.value})
				} else {
					temp.text = response.error
				}

				popoverShowSet(true)
				setToastShow(temp)
				setModalShow({show:!temp.success, action:'reg'})
			})
		} else {
			popoverShowSet(true)
			setToastShow({show: true, success: false, action: 'login', text: 'Passwords are different'})
			setModalShow({show: true, action:'reg'})
		}
	}

	return (
		<Modal size="lg" centered show={modalShow.show}>
			<Modal.Header>
				<Modal.Title>
					{modalShow.action==='login'?'Log in':'Sign up'}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3">
						<Form.Control type="text" placeholder="Login" autoComplete='on' ref={login}/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Control type="password" placeholder="Password" ref={password} autoComplete='on'/>
					</Form.Group>
					{
						(modalShow.action==='login')?
						(<></>):
						(
						<Form.Group className="mb-3">
							<Form.Control type="password" placeholder="repeat your Password" ref={passwordRep} autoComplete='off'/>
						</Form.Group>
						)
					}

					{
						(modalShow.action==='login')?
						(<Button onClick={(e)=>loginAction(e)} variant="primary" type="submit" className='me-2'> Log in </Button>):
						(<Button onClick={(e)=>regAction(e)} variant="success" type="submit" className='me-2'> Sign up </Button>)
					}

					<Button onClick={()=>{setModalShow(false);popoverShowSet(true)}} variant='secondary'> Cancel </Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default ModalBs;