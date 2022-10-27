import React from 'react';
import {Container, Navbar} from "react-bootstrap";
import {ChecklistIcon} from "@primer/octicons-react";

const NavbarBs = ({setModalShow, login, setLogged, setData}) => {

	const logout = () => {
		document.cookie = `id=0;`
		document.cookie =  `login=;`
		setLogged({id:0,login:''})
		setData('')
	}

	return (
		<Navbar className='px-3 container' fixed="bottom" bg="primary" variant="dark" style={{borderRadius:'20px 20px 0 0'}}>
			<Container className='position-relative'>
				<Navbar.Brand>
					<ChecklistIcon size={24} />
				</Navbar.Brand>
				<span style={{position: 'absolute',left:'50%',transform:'translate(-50%,0)'}}
				      className='text-dark bg-light rounded-3 px-2 py-1 fw-bold'
				> {login||'login'} </span>
				<Navbar.Collapse className="justify-content-end">
					<a href='#' className='me-3 text-light text-decoration-none' onClick={(e)=> { e.preventDefault(); setModalShow(true) }}> login </a>
					<a href='#' className='me-3 text-light text-decoration-none' onClick={(e)=> { logout() }}> logout </a>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarBs;