/*
    from peewee import (
        SqliteDatabase,
        AutoField,
        Model,
        TextField,
        ForeignKeyField,
        DateField,
        BooleanField
    )

    db = SqliteDatabase('main.db')


    class BaseModel(Model):
        class Meta:
            database = db


    class User(BaseModel):
        id = AutoField(primary_key=True)
        username = TextField(unique=True)
        password = TextField()
        email = TextField(unique=True)


    class Group(BaseModel):
        id = AutoField(primary_key=True)
        group_title = TextField()
        background_color = TextField()
        title_color = TextField()
        user = ForeignKeyField(User, field='id', on_delete="CASCADE")
        text_shadow = BooleanField(default=False)


    class Todos(BaseModel):
        id = AutoField(primary_key=True)
        group = ForeignKeyField(Group, field='id', on_delete='CASCADE')
        title = TextField()
        text = TextField()
        deadline_date = DateField()
        start_date = DateField()
        status = TextField()


    def init():
        User.create_table()
        Group.create_table()
        Todos.create_table()


    class Statuses(str, Enum):
        passive = "passive"
        important = "important"
        in_progress = "in_progress"
        done = "done"
        deadline_close = "deadline_close"
        too_late = "too_late"
*/


// Api.set_headers(headersData)
// Api.{query}( {data}, {headers} )

const link = 'localhost'
const port = 5000

class Api {
    
    constructor() {
        this.api_url = `http://${link}:${port}`
        this.headers = {}
    }

    set_headers (headersData){
        if( headersData.has('Authorization') ) {
            this.headers = {
               'accept': 'application/json',
               'Content-Type': 'application/json'
            }
        }
        this.headers = {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.get_auth()
        }
    }

    make_request_object(body, method = 'POST'){
        return {
            body: body,
            headers: this.headers,
            METHOD: method
        }
    };
    do_request(request, url){
        return fetch(url, request)
        .then(response => {
            if(response.status !== 200){
                return {
                    error: true,   
                    info: {
                        status_code: response.status,
                        text: response.text()
                    }
                }
            }
            return {
                error: false,
                data: response.json()
            }
        } )
    };
    set_auth(access_token){
        Headers.set('Authorization', 'Bearer '+access_token);
    }
    get_auth(){
        return Headers.get('Authorization')
    }
    // func : (access_token) => {some code}
    // window.__INITIAL_HEADERS__['Authorization']
    registration( {username, password, email}, func) {
        const response = this.do_request(
            this.make_request_object(arguments[0],'POST'),
            this.api_url+'/registration'
        );
        if(!response['error']){
            return response;
        }
        func(response['data']['access_token'])
        return response;
    };
    login( {username, password}, func ){
        const response = this.do_request(
            this.make_request_object(arguments[0],'POST'),
            this.api_url+'/login'
        );
        if(!response['error']){
            return response;
        }
        func(response['data']['access_token']);
        return response;
    }
    // TODO
    create_todo(group_id, {title, text, deadline_date, status}){
        return this.do_request(
            this.make_request_object(arguments[1], 'POST'),
            this.api_url+'/api/create_todo/'+group_id
        )
    }
    update_status(todo_id, status){
        return this.do_request(
            this.make_request_object({'status': status},'POST'),
            this.api_url+'/api/update_status/'+todo_id
        )
    }
    delete_todo(todo_id){
        return this.do_request(
            this.make_request_object({},'DELETE'),
            this.api_url+'/api/delete_todo/'+todo_id
        )
    }


    // GROUPS
    get_groups(){
        return this.do_request(
            this.make_request_object({}, 'GET'),
            this.api_url+'/api/groups'
        )
    }    
    create_group( {group_title, background_color, title_color, text_shadow} ) {
        return this.do_request(
            this.make_request_object(arguments[0],'POST'),
            this.api_url+'/api/create_group'
        )
    }
    delete_group(group_id){
        return this.do_request(
            this.make_request_object({}, 'DELETE'),
            this.api_url+'/api/delete_group/'+group_id
        ) 
    }
}

export default new Api()