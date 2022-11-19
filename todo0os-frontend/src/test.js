import Api from "./api.js";

// console.log(await Api.login(
//     {
//         username:'halone228',
//         password:'asdasd1234'
//     }))
console.log(Api.get_groups().then(res => {
    res.data.then(data => {
        console.log(data)
    })
}))