import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";

const ModalBs = ({modalShow, setModalShow}) => {

	return (
		<Modal size="lg" centered show={modalShow}>
			<Modal.Header>
				<Modal.Title>
					Sign in / Register
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Control type="text" placeholder="Login" aria-autocomplete='both'/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Control type="password" placeholder="Password"/>
					</Form.Group>
					<Button variant="primary" type="submit" className='me-2'
						/*onClick={login request here}*/
					> Submit </Button>
					<Button onClick={()=>setModalShow(false)} variant='secondary'> Cancel </Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default ModalBs;