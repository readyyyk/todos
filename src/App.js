import React, {useState} from 'react'
import './styles/reset.css'
import TodoGroup from "./.components/todoGroup";


function App() {

    const [todosData, dataHandler] = useState([
                {
                    id: 1,
                    title: "Card.Header",
                    text: "make different state of task",
                    startDate: "2022-10-22",
                    endDate: "2022-11-16",
                    // state: 'passive', 'in progress', 'done', 'deadlines close', 'too late'
                },
            ] )

    const addTodo = (newTodo) => {
        dataHandler([...todosData, newTodo])
    }
    const deleteItem = (deleteItemId) => {
        dataHandler(todosData.filter( el => el.id !== deleteItemId))
    }

    return (
        <div className="App">
            <TodoGroup data={todosData} addTodo={addTodo} deleteItem={deleteItem}/>
        </div>
    )
}

export default App