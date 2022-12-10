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

import { JellyTriangle } from '@uiball/loaders'

import Api from './api'

function App() {

    const getCookie = (name) => {
        const matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"))
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    const [logged, setLogged] = useState({userName:getCookie('username'), userWallpaper: '', userColor: '#0D6EFD'} )
    const [loaderShow, setLoaderShow] = useState( true )

    useEffect( ()=>{
        setLogged({userName: getCookie('username'), userWallpaper: '', userColor: '#0D6EFD'})
    }, [document.cookie] )

    const [groups, setGroups] = useState([])
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

    const [todos, setTodos] = useState([])
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
        setTodos( [...todos, data] )
    }

    const [dataEditTools, setDataEditTools] = useState(
        {show:false,
            action:'upd',
            data: {
                id: 0,
                group: 0,
                title: '',
                text: '',
                start_date: '',
                start_time: '',
                deadline_date: '',
                deadline_time: '',
                status: ''
            }
        } )
    const [showTodosList, setShowTodosList] = useState(false)

    const [loginModalShow, setLoginModalShow] = useState(false)
    const [signoutModalShow, setSignoutModalShow] = useState(false)
    const [regModalShow, setRegModalShow] = useState(false)

    const [toastData, setToastData] = useState({show:false, data:{color:'success', text:'template text', textColor:'light'}})

    useEffect(()=>{
        if(getCookie('Authorization')){
            Api.get_groups()
                .then( (res)=>{
                    if(res['error']){
                            setToastData({show:true, data:{color:'danger', text:'error fetching data', textColor:'light'}})
                    } else {
                        res.data.then( (resData)=>{
                            setLoaderShow(false)

                            const localGroups = resData.values

                            setGroups( localGroups )

                            if(localGroups.length) {
                                Api.get_todos(localGroups.map(el => el.id))
                                    .then(resTodos => {
                                        resTodos.data.then(resTodos => {
                                            setTodos(resTodos)
                                        })
                                    })
                            }
                        } )
                    }
                } )
                .catch( err => {
                    setToastData({show:true, data:{color:'danger', text:'error fetching data', textColor:'light'}})
                    throw err
                } )
        } else {
            setLoaderShow(false)
            setGroups([])
            setTodos([])
            setRegModalShow(true)
        }
    }, [logged])

    return (
        <>
            {
                loaderShow
                ?
                    <div
                        style={{
                            width: '100%',
                            minHeight: '50vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'end'
                        }}
                    >
                        <JellyTriangle
                            size={60}
                            speed={0.85}
                            color={logged.userColor}
                        />
                    </div>

                :

                    <>

                        {
                            logged.userName
                            ?
                                <NewGroupForm
                                    newGroup={newGroup}
                                    setToast={setToastData}
                                />
                            :
                                <></>
                        }

                        <main
                            className="container-fluid d-flex flex-wrap pt-2 px-2 px-sm-4 pb-4 justify-content-center   horizontal">

                            {
                                groups.map(el =>
                                    <TodosGroup
                                        data={el}
                                        innerData={todos.filter(todo => todo.group === el.id)}

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

                        <TodosListComponent
                            show={showTodosList} setShow={setShowTodosList}
                            openEdit={setDataEditTools}
                            groups={groups} todos={todos}
                            username={logged.userName}
                        />
                    </>
            }
            <NavbarComponent
                setShowTodosList={setShowTodosList}
                showLoginModal={setLoginModalShow} showRegModal={setRegModalShow}
                showLogoutModal={setSignoutModalShow}
                username={logged.userName}
                bg={logged.userColor}
            />


            <LoginModal show={loginModalShow} setShow={setLoginModalShow} goReg={setRegModalShow}
                        setToast={setToastData} setLoaderShow={setLoaderShow}/>
            <RegModal show={regModalShow} setShow={setRegModalShow} goLogin={setLoginModalShow}
                      setToast={setToastData} setLoaderShow={setLoaderShow}/>
            <SignoutModal show={signoutModalShow} setShow={setSignoutModalShow} setToast={setToastData}/>


            <TodosToast show={toastData.show} setShow={setToastData} data={toastData.data}/>
        </>
    )
}

export default App
