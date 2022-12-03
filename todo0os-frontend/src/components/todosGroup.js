import React, {useRef} from 'react';
import '../styles/main-module.css'

import {OverlayTrigger} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";

import TodosElement from './todosElement'
import Api from '../api'

const color_schemes = [
    ['#e9a49e', '#c96359'],
    ['#ffdaaf', '#f0a958'],
    ['#ccff90', '#7eb63d'],
    ['#cbf0f8', '#569dad'],
    ['#d7aefb', '#a068d1'],
    ['#c9c9c9', '#838383'],
]


const RenameGroupModal = ({title, show, update, close}) => {
    const newTitle = useRef()
    const submit = (e) => {
        e.preventDefault()
        // Api.updateGroup(data, field, newData)
        if(newTitle.current.value.trim()) {
            update('title', newTitle.current.value)
            close()
        }
    }
    return (
        <Modal centered show={show} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Rename group
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submit}>
                    <Form.Control type="text" required placeholder='new title' defaultValue={title} ref={newTitle} className='w-100 mb-3'/>
                    <Button variant="success" type='submit' className='me-2' > Submit </Button>
                    <Button variant="secondary" onClick={close}> Close </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
const DeleteGroupModal = ({show, deleteThis, close}) => {
    const submit = (e) => {
        e.preventDefault()
        // Api.deleteGroup(data, field, newData)
        deleteThis()
        close()
    }

    return (
        <Modal centered show={show} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title> Delete group </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span className='fs-4'> Are you sure? </span>
                <div className='mt-3'>
                    <form onSubmit={submit}>
                        <Button variant="danger" type='submit' className='me-2' autoFocus> Submit </Button>
                        <Button variant="secondary" onClick={close}> Cancel </Button>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
}


const TodosGroup = ({data, innerData, updateGroup, updateTodo, deleteGroup, setToast, openEdit}) => {
    const [renameGroupModalShow, setRenameGroupModalShow] = React.useState({show: false, title: data.title})
    const [deleteGroupModalShow, setDeleteGroupModalShow] = React.useState(false)
    const update = (field, newValue ) => {
        /*Api.updateGroup(data, field, newValue)
            .then( res => {
                if(res.error){
                    setToast({show:true, data:{color:'danger', text:'sth went wrong... (during color updadte)', textColor:'light'}})
                    throw res.error
                } else {

                }
            } )
            .catch( err => {
                setToast({show:true, data:{color:'danger', text:'sth went wrong... (during color updadte)', textColor:'light'}})
                throw err
            } )*/
        let tempGroupData = data
        tempGroupData[field] = newValue
        updateGroup(tempGroupData)
    }

    const popper = (
        <ul className="d-flex bg-light py-2 mt-1 rounded-3 border border-secondary">
            {color_schemes.map((el, i) =>
                <li key={`group-${data.id}-${el[0]}`}>
                    <div
                        onClick={()=>update('color_scheme', i)}
                        className="rounded-circle mx-2 cursor-pointer"
                        style={{border: '2.5px dotted #333', height: '1.3rem', width: '1.3rem', backgroundColor: el[1]}}></div>
                </li>
            )}
        </ul>
    )


    return (
        <fieldset className="bg-opacity-10 m-2 m-sm-3 mt-3 px-2 px-sm-3 pb-0"
                  style={{backgroundColor: `${color_schemes[data.color_scheme][0]}`}} >
            <legend className="rounded-3 p-1 p-lg-2 row mw-100 align-items-center justify-content-around"
                    style={{backgroundColor: `${color_schemes[data.color_scheme][1]}`}} >
                <h5 className="my-0 px-1 pe-lg-3 overflow-hidden group-title col-8 col-lg-auto text-center">
                    {data.title}
                </h5>
                <div className="col-4 col-lg-3 row mt-0 justify-content-end group-tools-container" style={!innerData.length?{minWidth: '3.9em'}:{}}>

                    <OverlayTrigger trigger="click" placement="bottom" overlay={popper}>
                        <button className="btn btn-light p-1 lh-sm  col-6 col-lg-3 group-tools">
                            <svg fill={`${color_schemes[data.color_scheme][1]}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 18a6 6 0 100-12 6 6 0 000 12z"></path></svg>
                        </button>
                    </OverlayTrigger>

                    <button className="btn btn-light p-1 lh-sm  col-6 col-lg-3 group-tools" onClick={()=>setRenameGroupModalShow({show:true, title: data.title})}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fillRule="evenodd"
                                  d="M17.263 2.177a1.75 1.75 0 012.474 0l2.586 2.586a1.75 1.75 0 010 2.474L19.53 10.03l-.012.013L8.69 20.378a1.75 1.75 0 01-.699.409l-5.523 1.68a.75.75 0 01-.935-.935l1.673-5.5a1.75 1.75 0 01.466-.756L14.476 4.963l2.787-2.786zm-2.275 4.371l-10.28 9.813a.25.25 0 00-.067.108l-1.264 4.154 4.177-1.271a.25.25 0 00.1-.059l10.273-9.806-2.94-2.939zM19 8.44l2.263-2.262a.25.25 0 000-.354l-2.586-2.586a.25.25 0 00-.354 0L16.061 5.5 19 8.44z"></path>
                        </svg>
                    </button>
                    <button className="btn btn-light p-1 lh-sm  col-6 col-lg-3 group-tools" onClick={()=>setDeleteGroupModalShow(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fillRule="evenodd"
                                  d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V3h-5V1.75z"></path>
                            <path
                                d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"></path>
                            <path
                                d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"></path>
                        </svg>
                    </button>
                    <button className="btn btn-light p-1 lh-sm  col-6 col-lg-3 group-tools" onClick={()=>openEdit({show:true, action:'new', data: {groupId:data.id}})} >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="24" height="24">
                            <path fillRule="evenodd"
                                  d="M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 110 1.5H8.5v4.25a.75.75 0 11-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z"></path>
                        </svg>
                    </button>
                </div>
            </legend>

            {
                innerData.map( (el)=>
                    <TodosElement data={el} key={`todo-${el.id}`} updateTodo={updateTodo} openEdit={openEdit}/>
                )
            }

            <DeleteGroupModal show={deleteGroupModalShow} deleteThis={()=>deleteGroup(data.id)} close={()=>setDeleteGroupModalShow(false)}/>
            <RenameGroupModal title={renameGroupModalShow.title} show={renameGroupModalShow.show} update={update} close={()=>setRenameGroupModalShow({show:false})}/>
        </fieldset>
    );
};

export default TodosGroup;