import React, {useState} from 'react'
import './styles/reset.css'
import './styles/style.css'
import TodoGroup from "./.components/todoGroup";
import NewGroupForm from "./.components/newGroupForm";


function App() {
    const [groupsData, groupsDataHandler] = useState( [{id:0, title:"first group"}] )
    const [groupsInnerData, groupsInnerDataHandler] = useState( [
        {
            id: 0,
            groupId: 0,
            title: "first todo",
            text: "first todo text",
            startDate: "2022-10-22",
            endDate: "2022-11-16",
            status: "in progress"
        }
    ] )

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

        </div>
    )
}

export default App