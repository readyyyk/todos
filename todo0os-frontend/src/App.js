import React, {useEffect, useState} from 'react'
import './styles/reset.css'

import NavbarComponent from "./components/navbarComponent";
import TodosListComponent from "./components/todosListComponent";
import NewGroupForm from "./components/newGroupForm"
import LoginModal from "./components/loginModal"
import RegModal from "./components/regModal"

import Api from './api'

function App() {

    const [showTodosList, setShowTodosList] = useState(false)

    const [loginModalShow, setLoginModalShow] = useState(false)
    const [regModalShow, setRegModalShow] = useState(false)


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

            <NavbarComponent setShowTodosList={setShowTodosList} showLoginModal={setLoginModalShow} showRegModal={setRegModalShow}/>

            <LoginModal show={loginModalShow} setShow={setLoginModalShow} goReg={setRegModalShow} />
            <RegModal show={regModalShow} setShow={setRegModalShow} goLogin={setLoginModalShow}/>

            <TodosListComponent show={showTodosList} setShow={setShowTodosList}/>

        </>
    )
}

export default App
