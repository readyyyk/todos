import React, {useEffect, useRef, useState} from 'react';
import '../styles/edit-tools.css'
import Api from '../api'

const EditToolsComponent = ({show, data, setData, setToast, updateTodo, deleteTodo}) => {
    const titleInput = useRef(),
        textInput = useRef(),
        start_dateInput = useRef(),
        start_timeInput = useRef(),
        deadline_dateInput = useRef(),
        deadline_timeInput = useRef()
    useEffect( ()=>{
        titleInput.current.value = data.title
        textInput.current.value = data.text
        start_dateInput.current.value = data.start_date
        start_timeInput.current.value = data.start_time
        deadline_dateInput.current.value = data.deadline_date
        deadline_timeInput.current.value = data.deadline_time
    }, [data] )

    const handleSubmit = (e) => {
        // Api.editTodo()
        e.preventDefault()
        updateTodo(
            {
                id: data.id,
                groupId: data.groupId,
                title: titleInput.current.value,
                text: textInput.current.value,
                start_date: start_dateInput.current.value,
                start_time: start_timeInput.current.value,
                deadline_date: deadline_dateInput.current.value,
                deadline_time: deadline_timeInput.current.value,
                status: data.status
            }
        )
        setData({show: false, data: data})
        setToast({show:true, data:{color:'warning', text:'edit tool is in dev (@halone228)', textColor:'dark'}})
    }

    const handleDelete = () => {
        /*Api.delete_todo(data.id)
            .then(res =>{
                if(!res.error){
                    setToast({show:true, data:{color:'success', text:'Successfully deleted', textColor:'light'}})
                } else {
                    setToast({show:true, data:{color:'danger', text:'sth went wrong... (during deletion item)', textColor:'light'}})
                }
            })
            .catch( err=>{
                setToast({show:true, data:{color:'danger', text:'sth went wrong... (during deletion item)', textColor:'light'}})
                throw err
            } )*/
        deleteTodo(data.id)
        setData({show:false, data: data})
    }

    const handleCancel = () => {
        setData({show:false, data: data})
    }

    return (
        <div className={`tools-wrapper ${show?'show':'passive'} `} id="tools-wrapper">
            <form className={`tools ${show?'show':'passive'}`} id="tools" onSubmit={handleSubmit}>
                <div className="card px-0 overflow-auto pLib-sb-Minimal mb-2"
                     style={{width: '30em', maxWidth: '90vw', maxHeight: '60vh', height: 'fit-content'}}>
                    <div className="card-header py-3 d-flex justify-content-between align-items-center">
                        <input type="text" className="form-control mb-0" name="card-title" placeholder="Title"
                              ref={titleInput}
                        />
                    </div>
                    <div className="card-body">
                        <textarea className="form-control lh-sm"
                                  style={{letterSpacing: '.5px', maxHeight: '33vh', minHeight: '20vh'}} minLength = "1"
                                  maxLength="10000"
                                  ref={textInput}/>
                    </div>
                    <div className="card-footer fs-6 lh-1 text-secondary">
                        <div className="row">
                            <div className="col-5">
                                <input type="date" disabled className="dt-input mb-2" title="Start date"
                                       ref={start_dateInput} />
                                <input type="time" disabled className="dt-input" title="Start time"
                                       ref={start_timeInput}/>
                            </div>

                            {/*<div class="col-2 p-0 d-flex justify-content-center align-items-center">*/}
                            {/*        <input type="color" class="w-75 h-75 border-0 card-edit" value="#ffffff" title="bg color">*/}
                            {/*</div>*/}

                            <div className="col-2"></div>

                            <div className="col-5 d-flex justify-content-end flex-wrap">
                                <input type="date" className="text-end dt-input mb-2" title="Deadline date" min="2022-10-31"
                                        min = {new Date().toISOString().slice(0, -14)}
                                        ref={deadline_dateInput}/>
                                <input type="time" className="text-end dt-input" title="Deadline time"
                                       // min={(deadline_dateInput.current.value === new Date().toISOString().slice(0, -14))?new Date().toISOString().slice(0, -8).slice(11, 17):'00:00'}
                                       ref={deadline_timeInput}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tools-bar row mt-3 d-flex justify-content-center">
                    <div className="col-2 text-center p-2 rounded-3 tools-bar__tools submit"
                         onClick={(e)=>handleSubmit(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="2.4em" height="2.4em"> <path d="M17.28 9.28a.75.75 0 00-1.06-1.06l-5.97 5.97-2.47-2.47a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l6.5-6.5z" /> <path fillRule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z" /></svg>
                    </div>
                    <div className="col-2 text-center p-2 rounded-3 mx-3 tools-bar__tools delete"
                         onClick={()=>handleDelete()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="2.4em" height="2.4em">
                            <path fillRule="evenodd"
                                  d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V3h-5V1.75z" />
                            <path
                                d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z" />
                            <path
                                d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z" />
                        </svg>
                    </div>
                    <div className="col-2 text-center p-2 rounded-3 tools-bar__tools cancel"
                         onClick={() => handleCancel()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="2.4em" height="2.4em">
                            <path
                                d="M9.036 7.976a.75.75 0 00-1.06 1.06L10.939 12l-2.963 2.963a.75.75 0 101.06 1.06L12 13.06l2.963 2.964a.75.75 0 001.061-1.06L13.061 12l2.963-2.964a.75.75 0 10-1.06-1.06L12 10.939 9.036 7.976z"></path>
                            <path fillRule="evenodd"
                                  d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"></path>
                        </svg>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditToolsComponent;