import React, {useRef} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

const NewGroupForm = ({newGroup}) => {

	const title = useRef()

	const setNewGroupData = (e) => {
		e.preventDefault()
		if(!title)
			return
		const newGroupData = {
			id: Date.now(),
			title: title.current.value
		}
		newGroup(newGroupData)
		title.current.value = ''
	}

	return (
		<div>
			<InputGroup className="p-3 pb-1">
				<Form.Control placeholder='New group title' ref={title}/>
				<Button
					variant="outline-success"
					onClick={e=>setNewGroupData(e)}
				> create new group </Button>
			</InputGroup>
		</div>
	);
};

export default NewGroupForm;