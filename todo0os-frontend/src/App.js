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

    const getCookie = (name) => {
        const match = document.cookie.replace(' ', '').split(/[,;=]/g)
        return match[match.indexOf(name)+1]
    }

    const [logged, setLogged] = useState({userName:getCookie('username'), userWallpaper: ''} )

    const [groups, setGroups] = useState([
        // {
        //     id: 0,
        //     title: 'template title',
        //     color_scheme: 4
        // }
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
                return todo.group!==id
            } )
        )
    }
    const newGroup = (data) => {
        setGroups( [...groups, data] )
    }

    const [todos, setTodos] = useState([
        // {
        //     id: 0,
        //     group: 0,
        //     title: 'template title',
        //     text: 'lorem lorem lorem v lorem lorem lorem lorem lorem lorem lorem',
        //     start_date: '2006-11-16',
        //     start_time: '00:00',
        //     deadline_date: '2022-11-16',
        //     deadline_time: '23:59',
        //     status: 'IMPORTANT'
        // }
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
        console.log([...todos,
            {
                id: todos.at(-1).id+1,
                ...data
            }
        ])
    }

    const [dataEditTools, setDataEditTools] = useState(
        {show:false,
            action:'upd',
            data: {
                id: 0,
                group: 0,
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

    const [toastData, setToastData] = useState({show:false, data:{color:'success', text:'template text', textColor:'light'}})

    useEffect(()=>{
        // if(document.cookie){
            Api.get_groups()
                .then( (res)=>{
                    if(res['error']){
                            setToastData({show:true, data:{color:'danger', text:'error fetching data', textColor:'light'}})
                    } else {
                        res.data.then( (resData)=>{
                            const localGroups = resData.values
                            const localTodos = []

                            setGroups( localGroups )

                            Api.get_todos(localGroups.map(el=>el.id))
                                .then( resTodos => {
                                    resTodos.data.then( resTodos => {
                                        setTodos(resTodos)
                                    } )
                                } )

                            // Promise.all( localGroups.map( group => { return Api.get_group_todo( group.id ) } ) )
                            //     .then( values => {
                            //         values.forEach( groupRes => {
                            //
                            //             groupRes.data.then( groupResData => {
                            //                 localTodos.push(...groupResData.todos)
                            //                 console.log(localTodos)
                            //             } )
                            //         } )
                            //         setTodos(localTodos)
                            //     } )
                        } )
                    }
                } )
                .catch( err => {
                    setToastData({show:true, data:{color:'danger', text:'error fetching data', textColor:'light'}})
                    throw err
                } )
        // }
    }, [logged])

    return (
        <>

            <NewGroupForm
                newGroup={newGroup}
                setToast={setToastData}
            />

            <main className="container-fluid d-flex flex-wrap pt-2 px-2 px-sm-4 pb-4 justify-content-center   horizontal">

                {
                    groups.map( el =>
                        <TodosGroup
                            data={el}
                            innerData={todos.filter(todo=>todo.group===el.id)}

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

            <NavbarComponent
                setShowTodosList={setShowTodosList}
                showLoginModal={setLoginModalShow} showRegModal={setRegModalShow} showLogoutModal={setSignoutModalShow}
                username={logged.userName}
            />

            <LoginModal show={loginModalShow} setShow={setLoginModalShow} goReg={setRegModalShow} setToast={setToastData} setLogged={setLogged} />
            <RegModal show={regModalShow} setShow={setRegModalShow} goLogin={setLoginModalShow} setToast={setToastData} setLogged={setLogged}/>
            <SignoutModal show={signoutModalShow} setShow={setSignoutModalShow} setToast={setToastData}/>

            <TodosListComponent
                show={showTodosList} setShow={setShowTodosList}
                openEdit={setDataEditTools}
                groups={groups} todos={todos}
                username ={logged.userName}
            />

            <TodosToast show={toastData.show} setShow={setToastData} data={toastData.data}/>
        </>
    )
}

export default App
