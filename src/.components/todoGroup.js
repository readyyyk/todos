import React from 'react'
import TodoItem from "./todoItem"
import TodoForm from "./todoForm";

const TodoGroup = ({data, addTodo, deleteItem}) => {
	return (
		<div className="todo">
			<h1 style={{textAlign: 'center'}}> {data.title} </h1>
			<TodoForm addTodo={addTodo}/>
			{
				data.map( (todoElData, i) =>
					<TodoItem cnt={i+1} data={todoElData} key={todoElData.id} deleteItem={deleteItem}/>
				)
			}
		</div>
	)
}

export default TodoGroup