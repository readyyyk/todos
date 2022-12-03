import React, {useEffect, useState} from 'react'
import './styles/reset.css'

// global components todo: (recreate in tabs)
import NavbarComponent from "./components/navbarComponent"
import TodosListComponent from "./components/todosListComponent"

// todos components
import TodosGroup from "./components/todosGroup";

// forms
import NewGroupForm from "./components/newGroupForm";
import TodoModalComponent from "./components/todoModalComponent";

// modals
import LoginModal from "./components/loginModal"
import RegModal from "./components/regModal"
import SignoutModal from "./components/signoutModal";

import TodosToast from "./components/todosToast";

import Api from './api'

function App() {

    const [data, setData] = useState({userId:0, userName:'admin'} )
    const [groups, setGroups] = useState([
        {
            id: 0,
            title: 'template title',
            color_scheme: 4
        },
        {
            id: 1,
            title: 'template title 2',
            color_scheme: 3
        }
    ])
    const updateGroup = (data) => {
        setGroups(
            groups.map( group => {
                if(group.id === data.id){
                    return data
                }
                return group
            } )
        )
    }
    const deleteGroup = (id) => {
        setGroups(
            groups.filter( group => {
                return group.id!==id
            } )
        )
        setTodos(
            todos.filter( todo => {
                return todo.groupId!==id
            } )
        )
    }
    const newGroup = (data) => {
        setGroups( [...groups, data] )
    }

    const [todos, setTodos] = useState([
        {
            id: 0,
            groupId: 0,
            title: 'template title',
            text: 'lorem lorem lorem v lorem lorem lorem lorem lorem lorem lorem',
            start_date: '2006-11-16',
            start_time: '00:00',
            deadline_date: '2022-11-16',
            deadline_time: '23:59',
            status: 'IMPORTANT'
        },
        {
            id: 1,
            groupId: 0,
            title: '2',
            text: '123',
            start_date: '2506-11-16',
            start_time: '00:00',
            deadline_date: '2022-11-16',
            deadline_time: '23:59',
            status: 'IMPORTANT'
        },
        {
            id: 2,
            groupId: 1,
            title: '2 todo title',
            text: 'lorem ',
            start_date: '2007-12-26',
            start_time: '13:30',
            deadline_date: '3022-11-16',
            deadline_time: '13:55',
            status: 'in progress'
        },
    ])
    const updateTodo = (data) => {
        setTodos(
            todos.map( todo => {
                if(todo.id === data.id){
                    return data
                }
                return todo
            } )
        )
    }
    const deleteTodo = (id) => {
        setTodos( todos.filter( (el)=> el.id!==id ) )
    }
    const addTodo = (data) => {
        setTodos( [...todos,
            {
                id: todos.at(-1).id+1,
                ...data
            }
        ] )
    }

    const [dataEditTools, setDataEditTools] = useState(
        {show:false,
            action:'upd',
            data: {
                id: 0,
                groupId: 0,
                title: 'template todo title',
                text: 'lorem lorem lorem v lorem lorem lorem lorem lorem lorem lorem',
                start_date: '11-16-2006',
                start_time: '00:00',
                deadline_date: '11-16-2022',
                deadline_time: '23:59',
                status: 'IMPORTANT'
            }
        } )
    const [showTodosList, setShowTodosList] = useState(false)

    const [loginModalShow, setLoginModalShow] = useState(false)
    const [signoutModalShow, setSignoutModalShow] = useState(false)
    const [regModalShow, setRegModalShow] = useState(false)

    const [toastData, setToastData] = useState({show:false, action:'upd', data:{color:'success', text:'template text', textColor:'light'}})



    useEffect(()=>{
        if(document.cookie){
            Api.get_groups()
                .then( (res)=>{
                    if(res['error']){

                        // pop up error
                    } else {
                        res['data']
                            .then( (res)=>{
                                console.log(res)
                            } )
                    }
                } )

        }
    }, [])


    return (
        <>

            <NewGroupForm lastId={groups.at(-1).id} newGroup={newGroup}/>

            <main className="container-fluid d-flex flex-wrap pt-2 px-2 px-sm-4 pb-4 justify-content-center   horizontal">

                {
                    groups.map( el =>
                        <TodosGroup
                            data={el}
                            innerData={todos.filter(todo=>todo.groupId===el.id)}

                            updateGroup={updateGroup}
                            updateTodo={updateTodo}

                            deleteGroup={deleteGroup}

                            setToast={setToastData}

                            openEdit={setDataEditTools}
                            key={`group-${el.id}`}
                        />
                    )
                }

                <TodoModalComponent
                    show={dataEditTools.show}
                    action={dataEditTools.action}
                    data={dataEditTools.data} setData={setDataEditTools}
                    setToast={setToastData}
                    deleteTodo={deleteTodo} updateTodo={updateTodo} addTodo={addTodo}
                />

            </main>

            <NavbarComponent setShowTodosList={setShowTodosList} showLoginModal={setLoginModalShow} showRegModal={setRegModalShow} showLogoutModal={setSignoutModalShow}/>

            <LoginModal show={loginModalShow} setShow={setLoginModalShow} goReg={setRegModalShow} setToast={setToastData}/>
            <RegModal show={regModalShow} setShow={setRegModalShow} goLogin={setLoginModalShow} setToast={setToastData}/>
            <SignoutModal show={signoutModalShow} setShow={setSignoutModalShow} setToast={setToastData}/>

            <TodosListComponent
                show={showTodosList} setShow={setShowTodosList}
                openEdit={setDataEditTools}
                groups={groups} todos={todos}
                username ={data.userName}
            />

            <TodosToast show={toastData.show} setShow={setToastData} data={toastData.data}/>
        </>
    )
}

export default App
