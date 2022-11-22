import React from 'react';

import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const TodosToast = ({show, setShow, data}) => {
    return (
        <ToastContainer className="p-3" position='top-end'>
            <Toast onClose={() => setShow({show:false, data:data})} show={show} delay={3000} autohide bg={data.color}>
                <Toast.Header>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.5em" height="1.5em" fill="#000" className='me-2'><path d="M3.5 3.75a.25.25 0 01.25-.25h13.5a.25.25 0 01.25.25v10a.75.75 0 001.5 0v-10A1.75 1.75 0 0017.25 2H3.75A1.75 1.75 0 002 3.75v16.5c0 .966.784 1.75 1.75 1.75h7a.75.75 0 000-1.5h-7a.25.25 0 01-.25-.25V3.75z"></path><path d="M6.25 7a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm-.75 4.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm16.28 4.53a.75.75 0 10-1.06-1.06l-4.97 4.97-1.97-1.97a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l5.5-5.5z"></path></svg>
                    <strong className="me-auto">Todooos.live</strong>
                    <small> just now </small>
                </Toast.Header>
                <Toast.Body> <span className={`text-${data.textColor}`}> {data.text} </span> </Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default TodosToast;