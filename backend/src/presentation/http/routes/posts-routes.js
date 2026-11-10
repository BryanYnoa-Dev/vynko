function createPostsRouter(postsController){
    return {
        handle(req,res,url){
if (req.method === "GET" && url.pathname === "/posts") {
 postsController.getPosts(req, res, url );
    return true;

} 
else if (req.method ==="POST" && url.pathname ==="/posts"){
    postsController.createPost(req, res);
    return true;
}  
return false;
        }
      
    };
}

module.exports = { createPostsRouter };