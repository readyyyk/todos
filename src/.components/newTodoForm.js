import React, {useRef} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Moment from 'moment'

const NewTodoForm = ({addTodo, groupId}) => {
	const title = useRef(),
		text = useRef(),
		endDate = useRef()

	function setData(e){
		e.preventDefault()
		if(!title.current.value || !text.current.value || !endDate.current.value)
			return
		const currentDate = Moment().format('YYYY-MM-DD')
		const newTask = {
			id: Date.now(),
			groupId: groupId,
			title: title.current.value,
			text: text.current.value,
			startDate: `${currentDate}`,
			endDate: endDate.current.value,
			status: "passive"
		}
		addTodo(newTask)

		title.current.value = ''
		text.current.value = ''
		endDate.current.value = ''
	}

	return (
		<div>
			<InputGroup className="p-3 pb-1" border="secondary">
				<Form.Control placeholder='title' ref={title}/>
				<Form.Control placeholder='text' ref={text}/>
				<Form.Control placeholder='deadline' type='date' min={Moment().format('YYYY-MM-DD')} ref={endDate}/>
				<Button variant="outline-success" onClick={e=>setData(e)}>create</Button>
			</InputGroup>
		</div>
	);
};

export default NewTodoForm;