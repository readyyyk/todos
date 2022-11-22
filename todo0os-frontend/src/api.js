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
//            ^
// Deprecated |


const link = 'localhost'
const port = 8000

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

class Api {
    
    constructor() {
        this.api_url = `http://${link}:${port}`

    }

    get token() {
        // const auth = document.cookie
        //     .split(';')[0]
        //     .split('Authorization=')[1]
        // console.log(getCookie('Authorization'))
        return getCookie('Authorization').split(',')[0]

    }

     get headers(){
        let headers_stack = {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': this.api_url,
        }
        if(this.token !== null) headers_stack['Authorization'] = `Bearer ${this.token}`;
        return headers_stack;
    }

    make_request_object({body, method = 'POST'}) {
        let request_default = {
            headers: this.headers,
            method: method,
        };
        if(method !== 'HEAD' && method !== 'GET')request_default.body = JSON.stringify(body);
        return request_default;
    }

    do_request(request, url){
        // console.log(request)
        // console.log(url)
        return fetch(url, request)
            .then(response => {
                if (response.status !== 200) {
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
            })
    }

    registration( {username, password} ) {
        return this.do_request(
            this.make_request_object({
                body: arguments[0],
                method:'POST'
            }),
            this.api_url+'/registration'
        ).then((response) => {
            if(!response['error']){
                response.data.then(data => {
                    let access_token = data['access_token']
                    document.cookie = `Authorization=${access_token}, path='/';` 
                    console.log(access_token)
                })    
            }
            return response;
        })
    }
    login( {username, password} ){
        return this.do_request(
            this.make_request_object({
                body: '',
                method: 'GET'
            }),
            this.api_url+`/login?username=${username}&password=${password}`
        ).then((response) => {
            if(!response['error']){
                response.data.then((json) => {
                    let access_token = json['access_token']
                    document.cookie = `Authorization=${access_token}, path='/';`
                })
            }
            return response;
        })
    }


    create_todo( {title, text, deadline_date, start_date, status}, group_id){
        return this.do_request(
            this.make_request_object({body: arguments[0]}),
            this.api_url+'/api/create_todo/'+group_id
        )
    }
    update_status(todo_id, status){
        return this.do_request(
            this.make_request_object({body: {'status': status}}),
            this.api_url+'/api/update_status/'+todo_id
        )
    }
    delete_todo(todo_id){
        return this.do_request(
            this.make_request_object({body:{},method: 'DELETE'}),
            this.api_url+'/api/delete_todo/'+todo_id
        )
    }


    // GROUPS
    get_groups(){
        return this.do_request(
            this.make_request_object({
                body: '',
                method: 'GET'
            }),
            this.api_url+'/api/groups'
        )
    }    
    create_group( {title, color_scheme} ) {
        return this.do_request(
            this.make_request_object({body : arguments[0]}),
            this.api_url+'/api/create_group'
        )
    }
    delete_group(group_id){
        return this.do_request(
            this.make_request_object({body: {}, method: 'DELETE'}),
            this.api_url+'/api/delete_group/'+group_id
        ) 
    }
}

export default new Api();