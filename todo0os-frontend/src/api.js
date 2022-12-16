const link = 'localhost'
const port = 8000
const maxAgeCookie = 864e3 // 10 days

const getCookie = (name) => {
    const matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"))
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

const setCookie = (name, value) => {
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; max-age=${maxAgeCookie}; SameSite=Lax`
}

class Api {
    
    constructor() {
        this.api_url = `http://${link}:${port}`
    }

    get token() {
        // console.log(getCookie('username'))
        return getCookie('Authorization')?.split(',')[0]
    }

     get headers(){
        let headers_stack = {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            "Access-Control-Allow-Origin": this.api_url, //'*',
            // 'Access-Control-Allow-Credentials': true,
        }
        if(this.token) headers_stack['Authorization'] = `Bearer ${this.token}`;
        return headers_stack;
    }

    make_request_object({body, method = 'POST'}) {
        let request_default = {
            headers: this.headers,
            method: method,
        };
        if(method !== 'HEAD' && method !== 'GET') request_default.body = JSON.stringify(body);
        return request_default;
    }

    do_request(request, url){
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
                    setCookie('Authorization', `${access_token}`)
                    setCookie('username', username)
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
                    setCookie('Authorization', `${access_token}`)
                    setCookie('username', username)
                })
            }
            return response;
        })
    }
    logout(){
        setCookie('Authorization', '')
        setCookie('username', '')
    }


    create_todo( newTodo ){
        return this.do_request(
            this.make_request_object({body: arguments[0]}),
            this.api_url+'/api/create_todo'
        )
    }
    update_todo(newTodo){
        return this.do_request(
            this.make_request_object({
                body: newTodo,
                method: 'POST'
            }),
            this.api_url+'/api/update_todo',
        )
    }
    delete_todo(todo_id){
        return this.do_request(
            this.make_request_object({body:{},method: 'DELETE'}),
            this.api_url+'/api/delete_todo/'+todo_id
        )
    }
    get_todos(ids){
        let query = this.api_url+`/api/get_todos/`
        ids.forEach(el=> query+=el+'-')
        return this.do_request(
            this.make_request_object({
                body: '',
                method: 'GET'
            }),
            query,
        )
    }


    // GROUPS
    get_groups(){
        return this.do_request(
            this.make_request_object({
                body: '',
                method: 'GET'
            }),
            this.api_url+'/api/get_groups'
        )
    }
    create_group( {title, color_scheme} ) {
        return this.do_request(
            this.make_request_object({body : arguments[0], method:'POST'}),
            this.api_url+'/api/create_group'
        )
    }
    delete_group(group_id){
        return this.do_request(
            this.make_request_object({body: {}, method: 'DELETE'}),
            this.api_url+'/api/delete_group/'+group_id
        )
    }
    update_group( {id, field, value} ){
        return this.do_request(
            this.make_request_object({body : arguments[0], method:'POST'}),
            this.api_url+'/api/update_group'
        )
    }
}

export default new Api();