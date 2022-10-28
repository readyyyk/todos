import React from 'react';
import {Toast} from 'react-bootstrap'
import {ChecklistIcon} from "@primer/octicons-react";

const ToastBs = ({setToastShow, toastData}) => {
	return (
		<Toast
			onClose={() => setToastShow( {show: false, success:toastData.success, action:toastData.action} )}
	        show={toastData.show}
            delay={3000}
			autohide
			bg={toastData.success?'success':'danger'}
			style={{position:'fixed',top:'1em',right:'1em',zIndex:'100'}}
			className={'text-light'}
		>
			<Toast.Header className='text-dark'>
				<ChecklistIcon size={24} className='rounded me-2'/>
				<strong className="me-auto"> todo0os! </strong>
			</Toast.Header>
			<Toast.Body> { toastData.text } </Toast.Body>
		</Toast>
	);
};

export default ToastBs;