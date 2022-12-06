import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

const variantsState = {
    'passive': "secondary",
    'IMPORTANT': "warning",
    'in progress': "primary",
    'done': "success",
    'deadlines close': "warning",
    'too late': "danger"
}
const color_schemes = [
    ['#e9a49eCC', '#c96359'],
    ['#ffdaafCC', '#f0a958'],
    ['#ccff90CC', '#7eb63d'],
    ['#cbf0f8CC', '#569dad'],
    ['#d7aefbCC', '#a068d1'],
    ['#c9c9c9CC', '#838383'],
]

const TodosListComponent = ({show, setShow, openEdit, groups, todos, username}) => {
    return (
        <Offcanvas show={show} onHide={()=>setShow(false)}>
            <Offcanvas.Header  closeButton>
                <Offcanvas.Title> <h4 className='h4 lh-base mb-0'> @{username} </h4> </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='pt-0 pLib-sb-Minimal pe-2'>

                <div className="text-secondary" style={{fontSize: '14px'}}> (Click on the group title to get more information about it)</div>
                <div className="mt-2">
                    <ul className="list-group">
                    {
                        groups.map( (group, groupI) =>
                            <li key={`todosListGroup${groupI}`} className="list-group-item list-group-item-action p-3" style={{background:`${color_schemes[group.color_scheme][0]}`}}>
                                <details>
                                    <summary> {group.title} </summary>
                                    <ul className="list-group mt-3 mb-2">
                                        {
                                            todos.filter( (todo) => todo.groupId===group.id ).map( (todo, todoI) =>
                                                <li
                                                    key={`todosListTodo${todoI}`}
                                                    className={`list-group-item list-group-item-action py-3 list-group-item-${variantsState[todo.status]}`}
                                                    onClick={()=> {openEdit({show: true, action: 'upd', data: todo});setShow(false)}}
                                                >
                                                    <b> {todo.title} </b>
                                                    <p className="lh-1 pt-2"> {todo.text} </p>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </details>
                            </li>
                        )
                    }
                    </ul>
                </div>

            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default TodosListComponent;