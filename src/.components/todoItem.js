import React from 'react'
import Card from 'react-bootstrap/Card'
import {TrashIcon} from '@primer/octicons-react'
import Button from 'react-bootstrap/Button'

 const TodoItem = ({data, cnt, deleteItem}) => {
	return (
		<Card className="m-3 mb-4">
			<Card.Header className="d-flex justify-content-between align-items-center">
				<span> in progress </span>
				<div className="tools">
					<Button onClick={()=>deleteItem(data.id)} variant="light" className="p-1 d-flex align-content-center">
						<TrashIcon size={24}/>
					</Button>
				</div>
			</Card.Header>
			<Card.Body>
				<Card.Title className="fs-4 text-primary">
					<span> {cnt} </span>{/**/}
					<span> {data.title} </span>
				</Card.Title>
				<Card.Text>
					{data.text}
				</Card.Text>
			</Card.Body>
			<Card.Footer className="text-muted d-flex justify-content-between">
				<div> {data.startDate} </div>
				<div> {data.endDate} </div>
			</Card.Footer>
		</Card>
	);
};

export default TodoItem