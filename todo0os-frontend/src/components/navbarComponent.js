import React from 'react';
import {
	ChecklistIcon,
	SearchIcon,
	ListOrderedIcon,
	SyncIcon,
	PersonIcon,
	SignInIcon,
	SignOutIcon,
	GearIcon,
	PersonAddIcon
} from '@primer/octicons-react'
import "../styles/navbar-module.css";

const NavbarComponent = () => {
	return (
		<nav className="navbar fixed-bottom bg-primary py-2 px-3 text-light container-md" style={{borderRadius: '1.3em 1.3em 0 0'}}>
			<div className="py-1 d-flex">
				<a href="#" className="me-3">
					<ChecklistIcon size={24} width='2em' height='2em' fill="#fff"/>
				</a>
				<div className="me-3 input-group rounded-2 overflow-hidden">
					<input type="text" className="form-control search-input" placeholder="Search" />
						<SearchIcon size={16} className="input-group-text p-1 h-auto w-auto cursor-pointer" width="1.3em" height="1.3em"/>
				</div>
			</div>

			<div className="d-flex">
				<div className="me-3 d-flex align-items-center cursor-pointer" data-bs-toggle="offcanvas"
				     data-bs-target="#offcanvas">
					<ListOrderedIcon size={16} style={{width:"1.5em", height:"1.5em"}} />
				</div>
				<div className="me-4 d-flex align-items-center cursor-pointer">
					<SyncIcon size={16} style={{width:"1.5em", height:"1.5em"}} onClick={()=>document.location.reload()}/>
				</div>

				<div className="rounded-circle bg-light cursor-pointer dropup">
					<PersonIcon size={24} className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" width="2.3em" height="2.3em"/>

					<ul className="dropdown-menu flex-column px-3 fs-6"
					    style={{transform: 'translate(-75%, -7%)', width: 'fit-content'}}>
						<li className="my-2 d-flex align-items-center hover-text-primary hover-bg-secondary w-100"
						    style={{width: 'fit-content'}}>
							<SignInIcon size={16} className="me-3" width="24" height="24" />
							<span> Sign in </span>
						</li>
						<li className="my-2 d-flex align-items-center hover-text-primary hover-bg-secondary w-100"
						    style={{width: 'fit-content'}}>
							<SignOutIcon size={16} className="me-3" width="24" height="24"/>
							<span> Sign out </span>
						</li>
						<li className="my-2 d-flex align-items-center hover-text-primary hover-bg-secondary w-100"
						    style={{width: 'fit-content'}}>
							<PersonAddIcon size={16} className="me-3"  width="24" height="24"/>
							<span> Sign up </span>
						</li>
						<li className="my-2 d-flex align-items-center hover-text-primary hover-bg-secondary w-100"
						    style={{width: 'fit-content'}}>
							<GearIcon size={16} className="me-3" width="24" height="24" />
							<span> Settings </span>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavbarComponent;