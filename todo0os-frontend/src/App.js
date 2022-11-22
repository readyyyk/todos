import React, {useEffect, useState} from 'react'
import './styles/reset.css'

import NavbarComponent from "./components/navbarComponent"
import TodosListComponent from "./components/todosListComponent"
import NewGroupForm from "./components/newGroupForm";

import LoginModal from "./components/loginModal"
import RegModal from "./components/regModal"
import SignoutModal from "./components/signoutModal";

import TodoToast from "./components/toast";

import Api from './api'

function App() {

    const [showTodosList, setShowTodosList] = useState(false)

    const [loginModalShow, setLoginModalShow] = useState(false)
    const [signoutModalShow, setSignoutModalShow] = useState(false)
    const [regModalShow, setRegModalShow] = useState(false)

    const [toastData, setToastData] = useState({show:true, data:{color:'success', text:''}})



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

            <main className="container-fluid d-flex flex-wrap pt-2 px-2 px-sm-4 pb-4 justify-content-center   horizontal">
                <NewGroupForm />

                {/*  todo: map on groups array  */}

                {/* todo:<EditToolsComponent />*/}

            </main>

            <NavbarComponent setShowTodosList={setShowTodosList} showLoginModal={setLoginModalShow} showRegModal={setRegModalShow} showLogoutModal={setSignoutModalShow}/>

            <LoginModal show={loginModalShow} setShow={setLoginModalShow} goReg={setRegModalShow} />
            <RegModal show={regModalShow} setShow={setRegModalShow} goLogin={setLoginModalShow}/>
            <SignoutModal show={signoutModalShow} setShow={setSignoutModalShow}/>

            <TodosListComponent show={showTodosList} setShow={setShowTodosList}/>

            <TodoToast show={toastData.show} setShow={setToastData} data={toastData.data}/>
        </>
    )
}

export default App
