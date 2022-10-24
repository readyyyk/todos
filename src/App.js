import React, {useState} from 'react'
import './styles/reset.css'
import './styles/style.css'
import TodoGroup from "./.components/todoGroup"
import NewGroupForm from "./.components/newGroupForm"
import NavbarBs from './.components/NavbarBs'
import ModalBs from "./.components/ModalBs";

// import {connectionCfg, selectQuery, updateQuery} from './backend'

function App() {
    // const loginId = "2"
    // const initialData = selectQuery(connectionCfg, loginId),
    //     groupsInitialData = initialData[0]
    //     groupsInnerDataInitialData = initialData[1]
    // for update: const updateData = JSON.stringify([...groupsData, ...groupsInnerData])

    const [groupsData, groupsDataHandler] = useState( [{id:0, title:"first group", bgColor:"#BFBFBF", textColor:"#0D6EFD"}] )
    const [groupsInnerData, groupsInnerDataHandler] = useState( [{id: 1,groupId: 0,title: "First todo",text: "First todo text",startDate: "2022-10-22",endDate: "2022-11-16",status: "in progress"}] )
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

            <NavbarBs setModalShow={setModalShow}/>

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

            <ModalBs setModalShow={setModalShow} modalShow={modalShow}/>
        </div>
    )
}

export default App