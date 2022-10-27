import React, {useRef} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

const NewGroupForm = ({newGroup}) => {

	const title = useRef(),
		colorBg = useRef(),
		colorText = useRef()

	const setNewGroupData = (e) => {
		let shadow = document.querySelector("#text-shadow-checkbox").checked
		e.preventDefault()
		if(!title.current.value)
			return
		const newGroupData = {
			id: Date.now(),
			title: title.current.value,
			bgColor: colorBg.current.value,
			textColor: colorText.current.value,
			textShadow: shadow
		}
		newGroup(newGroupData)
		title.current.value = ''
		colorBg.current.value = '#BFBFBF'
		colorText.current.value = '#0D6EFD'
		document.querySelector("#text-shadow-checkbox").checked = false
	}

	return (
		<div>
			<InputGroup className="p-3 pb-1">
				<Form.Control placeholder='New group title' ref={title}/>

				<InputGroup.Text className='d-none d-md-inline'> Bg color: </InputGroup.Text>
				<Form.Control title='Bg color' ref={colorBg} type='color' defaultValue="#BFBFBF" style={{maxWidth:"3em"}}/>

				<InputGroup.Text className='d-none d-md-inline'> Text color: </InputGroup.Text>
				<Form.Control title='Text color' ref={colorText} type='color' defaultValue="#0D6EFD" style={{maxWidth:"3em"}}/>

				<InputGroup.Text className='d-none d-md-inline'> Text Shadow: </InputGroup.Text>
				<InputGroup.Checkbox type="checkbox" title="text shadow" id='text-shadow-checkbox'/>
				<Button
					variant="outline-success"
					onClick={e=>setNewGroupData(e)}
				> create new group </Button>
			</InputGroup>
		</div>
	);
};

export default NewGroupForm;