import React from 'react';

import Dropdown from "react-bootstrap/Dropdown";
import Api from "../api";

const TodosElement = ({data, updateTodo, openEdit, setToast}) => {
    const update = (field, newValue ) => {
        const updTodo = data
        updTodo[field] = newValue
        return Api.update_todo(updTodo)
            .then( res => {
                if(res.error){
                    setToast({show:true, data:{color:'danger', text:'sth went wrong... (during color updadte)', textColor:'light'}})
                    throw res.error
                } else {
                    updateTodo( updTodo )
                    return true
                }
            } )
            .catch( err => {
                setToast({show:true, data:{color:'danger', text:'sth went wrong... (during color updadte)', textColor:'light'}})
                throw err
            } )
    }
    // let tempTodoData = data
    //     tempTodoData[field] = newValue
    //     updateTodo(tempTodoData)
    // }

    const variantsState = {
        'passive': "secondary",
        'IMPORTANT': "warning",
        'in progress': "primary",
        'done': "success",
        'deadlines close': "warning",
        'too late': "danger"
    }
    let dropDownData = [],
        dropDownCnt = 0
    for(const status in variantsState){
        dropDownCnt++
        dropDownData.push(
            <Dropdown.Item
                onClick={()=>update('status', `${status}`)}
                className={`text-${variantsState[status]}`}
                key={`status${data.id}${dropDownCnt}`}
            > {status} </Dropdown.Item>
        )
    }


    return (
        <div className="card-wrapper d-flex justify-content-center">
            <div className="card px-0 pLib-sb-Minimal mb-4 mx-2" style={{width: '18rem', maxHeight: '14rem'}}>
                <div className={`card-header d-flex justify-content-between align-items-center bg-opacity-25 bg-${variantsState[data.status]}`}>
                    <h5 className="mb-0"> {data.title} </h5>
                    <div className="d-flex align-items-center" style={{minWidth:'fit-content'}}>
                        <div className="btn-group me-1">
                            <Dropdown>
                                <Dropdown.Toggle variant={`${variantsState[data.status]}`} style={{padding:'0em 0.375rem'}}></Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {dropDownData}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className={`text-${variantsState[data.status]}`} style={{textShadow: '#333 0px 0px .2px'}}> {data.status} </div>
                    </div>
                </div>
                <div className="card-body overflow-auto pLib-sb-Minimal">
                    <p className="card-text lh-sm" style={{letterSpacing: '.5px'}}>
                        {data.text}
                    </p>
                </div>
                <div className="card-footer fs-6 lh-1 text-secondary">
                    <div className="row">
                        <div className="col-5">
                            <div className="w-100"> {data.start_date} </div>
                            <div className="w-100"> {data.start_time} </div>
                        </div>
                        <div className="col-2 p-0">
                            <div className="d-flex justify-content-center align-items-center border border-secondary rounded-3 border-opacity-50 bg-light p-1 card-edit"
                                onClick={()=>openEdit({show:true, action:'upd', data:data})}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path fillRule="evenodd"
                                          d="M17.263 2.177a1.75 1.75 0 012.474 0l2.586 2.586a1.75 1.75 0 010 2.474L19.53 10.03l-.012.013L8.69 20.378a1.75 1.75 0 01-.699.409l-5.523 1.68a.75.75 0 01-.935-.935l1.673-5.5a1.75 1.75 0 01.466-.756L14.476 4.963l2.787-2.786zm-2.275 4.371l-10.28 9.813a.25.25 0 00-.067.108l-1.264 4.154 4.177-1.271a.25.25 0 00.1-.059l10.273-9.806-2.94-2.939zM19 8.44l2.263-2.262a.25.25 0 000-.354l-2.586-2.586a.25.25 0 00-.354 0L16.061 5.5 19 8.44z"></path>
                                </svg>
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="w-100 text-end"> {data.deadline_date} </div>
                            <div className="w-100 text-end"> {data.deadline_time} </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodosElement;