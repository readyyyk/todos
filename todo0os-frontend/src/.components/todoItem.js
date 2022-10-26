import React from 'react'
import Card from 'react-bootstrap/Card'
import {TrashIcon} from '@primer/octicons-react'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from "react-bootstrap/Dropdown";

const TodoItem = ({data, cnt, deleteItem, setStatus}) => {

	const variantsData = {
		'passive': "secondary",
		'IMPORTANT': "warning",
		'in progress': "primary",
		'done': "success",
		'deadlines close': "warning",
		'too late': "danger"
	}

	let dropDownData = []
    for(const [status, i] in variantsData)
		 dropDownData.push(
			<Dropdown.Item
				onClick={()=>setStatus(status, data.id)}
				className={"text-"+variantsData[status]}
				key={"status"+toString(i)+toString(data.id)}
			> {status} </Dropdown.Item>
		 )

	return (
		<Card className="m-2 shadow-sm" border="secondary" style={{width:"24rem"}}>
			<Card.Header className="pe-2 d-flex justify-content-between align-items-center">
				<div className={'text-'+variantsData[data.status]+" d-flex align-items-center"}>
					<span className="me-2"> {data.status} </span>
					<DropdownButton autoClose={true} title="" variant='secondary' className="dropDownEl">
						{dropDownData}
					</DropdownButton>
				</div>
				<div className="tools d-flex">
					<Button onClick={()=>deleteItem(data.id)} variant="light" className="p-1 d-flex align-content-center">
						<TrashIcon size={24}/>
					</Button>
				</div>
			</Card.Header>
			<Card.Body>
				<Card.Title className={'fs-4 text-'+variantsData[data.status]}>
					<span> {cnt} </span>{/**/}
					<span> {data.title} </span>
				</Card.Title>
				<Card.Text>
					{data.text}
				</Card.Text>
			</Card.Body>
			<Card.Footer className={"text-muted d-flex justify-content-between bg-opacity-25 bg-"+variantsData[data.status]}>
				<div> {data.startDate} </div>
				<div> {data.endDate} </div>
			</Card.Footer>
		</Card>
	);
};

export default TodoItem