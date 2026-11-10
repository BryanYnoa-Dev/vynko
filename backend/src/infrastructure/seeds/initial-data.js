const { randomUUID } = require("node:crypto");



const users = [
{
    "id": randomUUID(),
    "username": "Bryan",
    "displayName": "Bryan Ynoa"
},



{
    "id": randomUUID(),
    "username": "Junior",
    "displayName": "Junior Carpenter"
}
]
const postsU = [{
    "pId": 1,
    "user_id": users[0].id,
    "displayName": "Bryan Ynoa",
    "content": "Aprendiendo Node.js"
},

{
     "pId": randomUUID(),
    "user_id": users[1].id,
    "displayName": "Junior Carpenter",
    "content": "Aprendiendo SQL"
}

]


module.exports = {
    users,
    postsU
};