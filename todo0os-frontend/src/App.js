import React, {useEffect, useState} from 'react'
import './styles/reset.css'

import NavbarComponent from "./components/navbarComponent"
import TodosListComponent from "./components/todosListComponent"
import NewGroupForm from "./components/newGroupForm";

import LoginModal from "./components/loginModal"
import RegModal from "./components/regModal"
import SignoutModal from "./components/signoutModal";

import TodosToast from "./components/todosToast";

import Api from './api'
import EditToolsComponent from "./components/editToolsComponent";

function App() {

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

            <main className="container-fluid d-flex flex-wrap pt-2 px-2 px-sm-4 pb-4 justify-content-center   horizontal">
                <NewGroupForm />

                {/*  todo: map on groups array  */}

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
