class Api {
    api_url = "http://ip:5000";
    
    static headers() {
        if(!Headers.has('Authorization')){
            return {
               'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        return {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.get_auth()
        }
    };
    static make_request_object(body_, method = 'POST'){
        return {
            body: body_,
            headers: this.headers(),
            METHOD: method
        }
    };
    static do_request(request, url){
        response = fetch(url, request)
        .then(response => {
            if(response.status != 200){
                return {
                    error: true,   
                    info: {
                    status_code: response.status,
                    text: response.text()}   
                    }
                }
                return {
                    error: false,
                    data: response.json()
                }   
            }
        )
    };
    static set_auth(access_token){
        Headers.set('Authorization', 'Bearer '+access_token);
    }
    static get_auth(){
        return Headers.get('Authorization')
    }
    static registration(params = {username, password, email}) {
        response = this.do_request(
            this.make_request_object(params,'POST'),
            this.api_url+'/registration'
        );
        if(!response['error']){
            return response;
        }
        this.set_auth(response['data']['access_token'])
        return response;
    };
    static login(params = {username, password}){
        response = this.do_request(
            this.make_request_object(params,'POST'),
            this.api_url+'/login'
        );
        if(!response['error']){
            return response;
        }
        this.set_auth(response['data']['access_token']);
        return response;
    }
    // TODO
    static create_todo(group_id, params = {title, text, deadline_date, status}){
        return this.do_request(
            this.make_request_object(params, 'POST'),
            this.api_url+'/api/create_todo/'+group_id
        )
    }
    static update_status(todo_id, status){
        return this.do_request(
            this.make_request_object({'status': status},'POST'),
            this.api_url+'/api/update_status/'+todo_id
        )
    }
    static delete_todo(todo_id){
        return this.do_request(
            this.make_request_object({},'DELETE'),
            this.api_url+'/api/delete_todo/'+todo_id
        )
    }
    // END TODO
    ///////////
    // GROUPS
    static get_groups(){
        return this.do_request(
            this.make_request_object({}, 'GET'),
            this.api_url+'/api/groups'
        )
    }    
    static create_group(params = {group_title, background_color, title_color, text_shadow}){
        return this.do_request(
            this.make_request_object(params,'POST'),
            this.api_url+'/api/create_group'
        )
    }
    static delete_group(group_id){
        return this.do_request(
            this.make_request_object({}, 'DELETE'),
            this.api_url+'/api/delete_group/'+group_id
        ) 
    }
}
module.exports = Api;