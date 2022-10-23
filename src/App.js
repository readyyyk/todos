import React, {useState} from 'react'
import './styles/reset.css'
import './styles/style.css'
import {ChecklistIcon} from '@primer/octicons-react'
import TodoGroup from "./.components/todoGroup"
import NewGroupForm from "./.components/newGroupForm"
import {Container, Navbar, Modal, Button, Form} from 'react-bootstrap'


function App() {
    // request for groupsData, groupsInnerData
    const [groupsData, groupsDataHandler] = useState( [{id:0, title:"first group", bgColor:"#BFBFBF", textColor:"#0D6EFD"}] )
    const [groupsInnerData, groupsInnerDataHandler] = useState( [
        {
            id: 1,
            groupId: 0,
            title: "First todo",
            text: "First todo text",
            startDate: "2022-10-22",
            endDate: "2022-11-16",
            status: "in progress"
        }
    ] )
    const [modalShow, setModalShow] = React.useState(false);

    const newGroup = (newGroupData) => {
        groupsDataHandler([...groupsData, newGroupData])
    }

    const addTodo = (newTodo) => {
        groupsInnerDataHandler([...groupsInnerData, newTodo])
    }
    const deleteItem = (deleteItemId) => {
        groupsInnerDataHandler(groupsInnerData.filter( el => el.id !== deleteItemId))
    }
    const deleteGroupHandler = (groupId) => {
        groupsInnerDataHandler(groupsInnerData.filter( el => el.groupId !== groupId))
        groupsDataHandler(groupsData.filter( el => el.id !== groupId))
    }

    const setStatus = (newStatus, id) => {
        let currentData = groupsInnerData
        currentData.find( el => el.id===id ).status = newStatus
        groupsInnerDataHandler([...currentData])
    }

    return (
        <div className="App">
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

            <NewGroupForm newGroup={newGroup}/>
            {
                groupsData.map( groupData =>
                    <TodoGroup
                        key={groupData.id}
                        data={groupData}
                        innerData={groupsInnerData.filter( el => el.groupId===groupData.id )}
                        deleteGroupHandler={deleteGroupHandler}
                        addTodo={addTodo}
                        deleteItem={deleteItem}
                        setStatus={setStatus}
                    />
                )
            }

            <Modal size="lg" centered show={modalShow}>
                <Modal.Header>
                    <Modal.Title>
                        Sign in / Register
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Login" aria-autocomplete='both'/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password"/>
                        </Form.Group>
                        <Button variant="primary" type="submit" className='me-2'
                            /*onClick={login request here}*/
                        > Submit </Button>
                        <Button onClick={()=>setModalShow(false)} variant='secondary'> Cancel </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default App