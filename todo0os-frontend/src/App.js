import React, {useEffect, useState} from 'react'
import './styles/reset.css'
import NavbarComponent from "./components/navbarComponent";
import TodosListComponent from "./components/todosListComponent";

const server = {
    ip: '127.0.0.1',
    port: '5000'
}
const apiLink = `http://${server.ip}:${server.port}`

function App() {

    const [showTodosList, setShowTodosList] = useState(false)

    // useEffect( () => {
    //     // cookies
    // }, [] )

    return (
        <>

            <main className="container-fluid d-flex flex-wrap px-2 px-sm-4 pb-4 justify-content-center   horizontal">
                {/* todo: form for new group */}

                {/*  todo: map on groups array  */}

                {/* todo:<EditToolsComponent />*/}

            </main>

            <NavbarComponent setShowTodosList={setShowTodosList}/>

            <TodosListComponent show={showTodosList} setShow={setShowTodosList}/>

        </>
    )
}

export default App
