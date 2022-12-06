import React, {useRef, useState} from 'react';
import {Form, InputGroup, Button} from 'react-bootstrap';
import Api from '../api'

const NewGroupForm = ({lastId, newGroup}) => {

    const title = useRef()

    const submit = (e) => {
        e.preventDefault()

        if(title.current.value.trim()){
            // Api.create_group({title:newGroupTitle, color_scheme:'0'})
            newGroup({id:lastId+1, title:title.current.value, color_scheme:5})
            title.current.value = ''
        }
    }

    return (
        <div className='container-fluid mt-3'>
            <div className='container mb-3' style={{maxWidth:'33em'}}>
                <Form onSubmit={submit}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="New group title"
                            ref={title}
                        />
                        <Button variant="success" type='submit'>
                            Submit
                        </Button>
                    </InputGroup>
                </Form>
            </div>
        </div>
    );
};

export default NewGroupForm;