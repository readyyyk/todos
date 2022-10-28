import React, {useEffect, useState} from 'react'
import './styles/reset.css'
import './styles/style.css'
import Spinner from 'react-bootstrap/Spinner'
import TodoGroup from "./.components/todoGroup"
import NewGroupForm from "./.components/newGroupForm"
import NavbarBs from './.components/NavbarBs'
import ModalBs from "./.components/ModalBs";
import ToastBs from "./.components/ToastBs";

function App() {
    const [dataJSON, setData] = useState('')
    const [logged, setLogged] = useState({id:0,login:''} )

    useEffect( () => {
        const c = document.cookie
        if(c)
            setLogged({
                id: Number(c.split('; ').find((kv) => kv.startsWith('id='))?.split('=')[1]),
                login: c.split('; ').find((kv) => kv.startsWith('login='))?.split('=')[1],
            })
    }, [] )

    useEffect(() => {
        if(logged.id)
            fetch(`/api/${logged.id}`, { method:'GET' })
            .then(response => response.json() )
            .then(resData => {
                resData.replace('\"', `'`)
                setData(resData)
            })
        else{
            groupsDataHandler([])
            groupsInnerDataHandler([])
        }
    }, [logged])

    const [groupsData, groupsDataHandler] = useState( [] )
    const [groupsInnerData, groupsInnerDataHandler] = useState( [] )
    const [modalShow, setModalShow] = React.useState({show:false, action:'login'})
    const [toastShow, setToastShow] = React.useState({show:false, success:false, action:'', text:''})
    const [popoverShow, popoverShowSet] = useState( false )

    const updRequestCfg = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
            loggedId: '',
            data: ''
        },
    }
    useEffect( () => {
        if( dataJSON !== '' ){
            const data = JSON.parse(dataJSON)
            groupsDataHandler([...data[0]])
            groupsInnerDataHandler([...data[1]])
        }
    }, [dataJSON] )

    useEffect( () => {
        if( groupsData.length ){
            let temp = {
                loggedId: logged.id,
                data: JSON.stringify([groupsData, groupsInnerData]).replace('\"','"'),
            }
            updRequestCfg.body = JSON.stringify(temp)
            fetch('/upd', updRequestCfg)
        }
    }, [groupsData, groupsInnerData] )

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

            <NavbarBs
                setModalShow={setModalShow}
                login={logged.login}
                setLogged={setLogged}
                setData={setData}
                popoverShow={popoverShow}
                popoverShowSet={popoverShowSet}
            />

            {
                ( dataJSON !== '' ) ?
                ( <> <NewGroupForm newGroup={newGroup}/> { loadGroups() }  </>) :
                (   <div style={{position:"fixed",width:"100vw",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
                       <Spinner animation='border'/>
                    </div> )
            }

            {/*todo: todos list of tasks inside offcanvas*/}

            <ModalBs
                setModalShow={setModalShow}
                modalShow={modalShow}
                setToastShow={setToastShow}
                setLoggedId={setLogged}
                popoverShowSet={popoverShowSet}
            />

            <ToastBs
                setToastShow={setToastShow}
                toastData={toastShow}
            />

        </div>
    )
}

export default App
