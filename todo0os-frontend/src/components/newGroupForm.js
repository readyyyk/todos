import React, {useRef, useState} from 'react';
import {Form, InputGroup, Button} from 'react-bootstrap';
import Api from '../api'

const NewGroupForm = () => {

    const title = useRef()

    const newGroup = (newGroupTitle) => {
        if(newGroupTitle.trim()){
            console.log(Api.create_group({title:newGroupTitle, color_scheme:'0'}))
            title.current.value = ''
        }
    }

    return (
        <div className='container mb-3' style={{maxWidth:'33em'}}>
            <Form>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="New group title"
                        ref={title}
                    />
                    <Button variant="outline-success" onClick={()=>newGroup(title.current.value)}>
                        Submit
                    </Button>
                </InputGroup>
            </Form>
        </div>
    );
};

export default NewGroupForm;