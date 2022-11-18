import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

const TodosListComponent = ({show, setShow}) => {
    return (
        <Offcanvas show={show} onHide={()=>setShow(false)}>
            <Offcanvas.Header  closeButton>
                <Offcanvas.Title> <h4 className='h4 lh-base mb-0'> Tasks list </h4> </Offcanvas.Title>

            </Offcanvas.Header>
            <Offcanvas.Body className='pt-0 pLib-sb-Minimal pe-2'>

                <div className="text-secondary" style={{fontSize: '14px'}}> (Click on the group title to get more information about it)</div>

{/*!!!!! DEMO !!!!!*/}
    <div className="mt-2">
        <ul className="list-group">
            <li className="list-group-item list-group-item-action p-3">
                <details>
                    <summary> Group 1 </summary>
                    <ul className="list-group mt-3 mb-2">
                        <li className="list-group-item list-group-item-action py-3 list-group-item-primary">
                            <b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur deleniti doloremque eos est eveniet facilis incidunt, inventore necessitatibus quas sunt, suscipit tempora. A ab beatae cupiditate hic laboriosam neque obcaecati. </b>
                            <p className="lh-1 pt-2"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi delectus expedita hic ipsam quas quis repellat sed temporibus? Accusantium dolores iste maiores maxime nemo non qui ratione saepe sequi voluptates. </p>
                        </li>
                        <li className="list-group-item list-group-item-action py-3 list-group-item-warning">
                            <b> Important task </b>
                            <p className="lh-1 pt-2"> very very important </p>
                        </li>
                        <li className="list-group-item list-group-item-action py-3 list-group-item-danger">
                            <b> You lost deadlines.. </b>
                            <p className="lh-1 pt-2"> but u don't worry ☺ </p>
                        </li>
                    </ul>
                </details>
            </li>
        </ul>
    </div>

            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default TodosListComponent;