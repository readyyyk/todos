import React, {useState} from 'react';
import {Container, Button, Navbar, OverlayTrigger, Popover, ListGroup} from "react-bootstrap";
import {ChecklistIcon} from "@primer/octicons-react";

const NavbarBs = ({setModalShow, login, setLogged, setData, popoverShow, popoverShowSet}) => {

	const logout = () => {
		document.cookie = `id=0;`
		document.cookie =  `login=;`
		setLogged({id:0,login:''})
		setData('')
		popoverShowSet(true);
	}

	return (
		<Navbar className='px-3 container' fixed="bottom" bg="primary" variant="dark" style={{borderRadius:'20px 20px 0 0'}}>
			<Container className='position-relative'>
				<Navbar.Brand>
					<ChecklistIcon size={24} />
				</Navbar.Brand>

				<OverlayTrigger
					trigger='click'
					key='login-dropdown'
					placement='top'
					overlay={
						<Popover id={`popover-positioned-top`} style={{display:popoverShow?'block':'none'}}>
							<Popover.Body className='p-0 text-center'>
								<ListGroup>
									<ListGroup.Item>
										<a href='#'
											className='text-decoration-none'
											onClick={(e)=> { e.preventDefault(); popoverShowSet(false); setModalShow({show:true, action:'login'}) }}
										> Log in </a>
									</ListGroup.Item>
									<ListGroup.Item>
										<a href='#'
											className='text-decoration-none'
											onClick={(e)=> { logout() }}
										> Log out </a>
									</ListGroup.Item>
									<ListGroup.Item> 
										<a href='#'
											className='text-decoration-none'
											onClick={(e)=> { e.preventDefault(); popoverShowSet(false); setModalShow({show:true, action:'reg'}) }}
										> Register </a>
									</ListGroup.Item>
								</ListGroup>
							</Popover.Body>
						</Popover>
					}
					>
					<Button
						style={{position: 'absolute',left:'50%',transform:'translate(-50%,0)'}}
						className='text-dark bg-light rounded-3 px-2 py-1 fw-bold'
						onClick={(e)=>{popoverShowSet(true)}}
					> {login||'login'} </Button>
				</OverlayTrigger>

				<div className="justify-content-end d-none d-sm-inline">
					<a href='#' className='me-3 text-light text-decoration-none' onClick={(e)=> { e.preventDefault(); popoverShowSet(false); setModalShow({show:true, action:'reg'}) }}> Register </a>
					<a href='#' className='me-3 text-light text-decoration-none' onClick={(e)=> { e.preventDefault(); setModalShow({show:true, action:'login'}) }}> LogIn </a>
					<a href='#' className='me-3 text-light text-decoration-none' onClick={(e)=> { logout() }}> LogOut </a>
				</div>
			</Container>
		</Navbar>
	);
};

export default NavbarBs;