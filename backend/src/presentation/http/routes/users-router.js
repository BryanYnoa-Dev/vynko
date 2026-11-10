function createUsersRouter(usersController){



    return {
        handle(req,res,url){
            if (req.method === "GET" && url.pathname === "/users"){
             usersController.getUsers(req,res,url);
             return true;
}
return false;
        }
    };
}

module.exports = {createUsersRouter}