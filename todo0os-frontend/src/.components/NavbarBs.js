import React from 'react';
import {Container, Navbar} from "react-bootstrap";
import {ChecklistIcon} from "@primer/octicons-react";

const NavbarBs = ({setModalShow}) => {
	return (
		<Navbar className='px-3 container' fixed="bottom" bg="primary" variant="dark" style={{borderRadius:'20px 20px 0 0'}}>
			<Container>
				<Navbar.Brand>
					<ChecklistIcon size={24} />
				</Navbar.Brand>
				<Navbar.Collapse className="justify-content-end">
					<a href='#' className='me-3 text-light text-decoration-none' onClick={(e)=> { e.preventDefault(); setModalShow(true) }}> login </a>
					<a href='#' className='me-3 text-light text-decoration-none' /*onClick={logout request here}*/> logout </a>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarBs;