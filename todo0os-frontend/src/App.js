import React, {useEffect, useState} from 'react'
import './styles/reset.css'
import './styles/style.css'
import Spinner from 'react-bootstrap/Spinner'
import TodoGroup from "./.components/todoGroup"
import NewGroupForm from "./.components/newGroupForm"
import NavbarBs from './.components/NavbarBs'
import ModalBs from "./.components/ModalBs";

const tempId = 2
//          updRequestCfg.body.loggedId = tempId
//         updRequestCfg.body.data = (JSON.stringify([groupsData, groupsInnerData])).replace('\"', '"')
//         fetch('/upd', updRequestCfg)

function App() {
    const updRequestCfg = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
            loggedId: '',
            data: ''
        },
    }

    const [dataJSON, setData] = useState('')

    useEffect(() => {
        fetch("/api")
        .then(response => response.json() )
        .then(resData => {
            resData.replace('\"', `'`)
            setData(resData)
        })
    }, [])

    const [groupsData, groupsDataHandler] = useState( [] )
    const [groupsInnerData, groupsInnerDataHandler] = useState( [] )
    const [modalShow, setModalShow] = React.useState(false)

    useEffect( () => {
        if( dataJSON !== '' ){
            const data = JSON.parse(dataJSON)
            groupsDataHandler([...data[0]])
            groupsInnerDataHandler([...data[1]])
        }
    }, [dataJSON] )

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

    let groupsReact = []
    const loadGroups = () => {
        groupsReact = []

        groupsData.map(groupData => {
            groupsReact.push(
                <TodoGroup
                    key={groupData.id}
                    data={groupData}
                    innerData={groupsInnerData.filter(el => el.groupId===groupData.id )}
                    deleteGroupHandler={deleteGroupHandler}
                    addTodo={addTodo}
                    deleteItem={deleteItem}
                    setStatus={setStatus}
                />
            )
        })
        return groupsReact
    }
    return (
        <div className="App">

            <NavbarBs setModalShow={setModalShow}/>

            {
                ( dataJSON !== '' ) ?
                ( <> <NewGroupForm newGroup={newGroup}/> { loadGroups() }  </>) :
                (   <div style={{position:"fixed",width:"100vw",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
                       <Spinner animation='border'/>
                    </div> )
            }

            <ModalBs setModalShow={setModalShow} modalShow={modalShow}/>
        </div>
    )
}

export default App
