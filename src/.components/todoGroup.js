import React from 'react'
import TodoItem from "./todoItem"
import TodoForm from "./todoForm";
import {TrashIcon} from "@primer/octicons-react";
import Button from "react-bootstrap/Button";

const TodoGroup = ({data, innerData, deleteGroupHandler, addTodo, deleteItem, setStatus}) => {
	let moreThanThree = innerData.length>3?"justify-content-xxl-between":"justify-content-xxl-start"
	let moreThanTwo = innerData.length>2?"justify-content-xl-between":"justify-content-xl-start"
	return (
		<div className="bg-opacity-25 bg-black m-3 mt-4 p-4 rounded-3">
			<h1 className="fs-2 fw-bold text-primary d-flex justify-content-center align-items-center">
				<span className="me-2">
					{data.title}
				</span>
				<div className="tools">
					<Button onClick={()=>deleteGroupHandler(data.id)} variant="outline-light" className="p-1 d-flex align-content-center">
						<TrashIcon size={24}/>
					</Button>
				</div>
			</h1>
			<TodoForm addTodo={addTodo} groupId={data.id}/>
			<div className={"d-flex justify-content-center justify-content-lg-start" + moreThanTwo + " " + moreThanThree + " flex-wrap mt-3"}>
				{
					innerData.map( (todoElData, i) =>
						<TodoItem
							cnt={i+1}
							data={todoElData}
							key={todoElData.id}
							deleteItem={deleteItem}
							setStatus={setStatus}
						/>
					)
				}
			</div>
		</div>
	)
}

export default TodoGroup