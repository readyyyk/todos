import React, {useEffect, useState} from 'react'
import './styles/reset.css'

// global components todo: (recreate in tabs)
import NavbarComponent from "./components/navbarComponent"
import TodosListComponent from "./components/todosListComponent"

// todos components
import TodosGroup from "./components/todosGroup";

// forms
import NewGroupForm from "./components/newGroupForm";
import EditToolsComponent from "./components/editToolsComponent";

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

    const [todos, setTodos] = useState([
        {
            id: 0,
            groupId: 0,
            title: 'template todo title',
            text: 'lorem lorem lorem v lorem lorem lorem lorem lorem lorem lorem',
            start_date: '16-11-2006',
            start_time: '00:00',
            deadline_date: '16-11-2022',
            deadline_time: '23:59',
            status: 'IMPORTANT'
        },
        {
            id: 1,
            groupId: 1,
            title: '2 todo title',
            text: 'lorem ',
            start_date: '26-12-2007',
            start_time: '13:30',
            deadline_date: '16-11-3022',
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

    const [dataEdtTools, setDataEdtTools] = useState( {show:false, data: {id:undefined, title:'title', text:'lorem', startDate:{time:'00:00', date:'11/16/2006'}, endDate:{time:'12:00', date:'11/16/20022'}}} )
    const [showTodosList, setShowTodosList] = useState(false)

    const [loginModalShow, setLoginModalShow] = useState(false)
    const [signoutModalShow, setSignoutModalShow] = useState(false)
    const [regModalShow, setRegModalShow] = useState(false)

    const [toastData, setToastData] = useState({show:false, data:{color:'success', text:'template text', textColor:'light'}})



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

            <NewGroupForm />

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
                            key={`group-${el.id}`}
                        />
                    )
                }

                <EditToolsComponent show={dataEdtTools.show} data={dataEdtTools.data} setData={setDataEdtTools} setToast={setToastData}/>

            </main>

            <NavbarComponent setShowTodosList={setShowTodosList} showLoginModal={setLoginModalShow} showRegModal={setRegModalShow} showLogoutModal={setSignoutModalShow}/>

            <LoginModal show={loginModalShow} setShow={setLoginModalShow} goReg={setRegModalShow} setToast={setToastData}/>
            <RegModal show={regModalShow} setShow={setRegModalShow} goLogin={setLoginModalShow} setToast={setToastData}/>
            <SignoutModal show={signoutModalShow} setShow={setSignoutModalShow} setToast={setToastData}/>

            <TodosListComponent show={showTodosList} setShow={setShowTodosList}/>

            <TodosToast show={toastData.show} setShow={setToastData} data={toastData.data}/>
        </>
    )
}

export default App
