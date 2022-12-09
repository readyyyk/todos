import React, {useRef, useState} from 'react';
import {Form, InputGroup, Button} from 'react-bootstrap';
import Api from '../api'

const NewGroupForm = ({newGroup, setToast}) => {

    const title = useRef()

    const submit = (e) => {
        e.preventDefault()

        if(title.current.value.trim()){
            Api.create_group({title: title.current.value, color_scheme: 0})
                .then( (res)=>{
                    res.data.then( resData => {
                        newGroup(resData)
                        title.current.value = ''
                    } )
                } )
                .catch( (err) => {
                    setToast({show:true, data:{color:'danger', text:'sth went wrong... <b>(during adding new group)</b>', textColor:'light'}})
                } )
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