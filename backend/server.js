
const { HTTP_STATUS } = require(
  "./src/common/constants/http-status"
)
const fs = require("node:fs");
const path = require("node:path");
const swaggerPath = require("swagger-ui-dist").getAbsoluteFSPath();
const { randomUUID } = require("node:crypto");
const {users, postsU} = require(
  "./src/infrastructure/seeds/initial-data"
);
const { createUserRepository } = require(
    "./src/infrastructure/repositories/user-repository"
);
const { createPostRepository } = require(
    "./src/infrastructure/repositories/post-repository"
);
const { createGetPosts } = require (
  "./src/application/use-cases/get-posts"
);
const { initCreatePost } = require(
  "./src/application/use-cases/create-post"
);
const { createPostController } = require(
"./src/presentation/http/controllers/posts-controllers"
);
const { createPostsRouter } = require(
  "./src/presentation/http/routes/posts-routes"
)
const { createUsersControllers }= require(
  "./src/presentation/http/controllers/users-controllers"
)
const { createGetUsers } = require(
  "./src/application/use-cases/get-users"
)
const  { createUsersRouter } = require(
  "./src/presentation/http/routes/users-router"
)

const userRepository = createUserRepository(users);
const postRepository = createPostRepository(postsU);
const getPosts = createGetPosts(postRepository);
const createPost = initCreatePost(
  userRepository,
  postRepository,
  randomUUID
);
const getUsers = createGetUsers(userRepository);
const postController = createPostController(getPosts,
  createPost
);
const usersController = createUsersControllers(getUsers);
const postsRouter = createPostsRouter(postController);
const usersRouter = createUsersRouter(usersController);





const openapi = require("./openapi.json");





const http = require("node:http");

const PORT = 3000;




const server = http.createServer((req, res) => {
    
const url = new URL(req.url, "http://localhost:3000");
   


    res.setHeader("Content-Type", "text/plain; charset=utf-8");
   
    
if (req.method === "GET" && req.url === "/openapi.json") {
  res.writeHead(HTTP_STATUS.OK, {
    "Content-Type": "application/json"
  });

  return res.end(JSON.stringify(openapi));
}

if (req.method === "GET" && req.url === "/docs") {
  res.writeHead(HTTP_STATUS.OK, {
  "Content-Type": "text/html; charset=utf-8"
});

  return res.end(`
    <!DOCTYPE html>
    <html>
      <head>
  <meta charset="UTF-8">
  <title>Vynko API Docs</title>
  <link rel="stylesheet" href="/swagger-ui.css">
</head>
      <body>
        <div id="swagger-ui"></div>
        <script src="/swagger-ui-bundle.js"></script>
        <script>
          SwaggerUIBundle({
            url: "/openapi.json",
            dom_id: "#swagger-ui"
          });
        </script>
      </body>
    </html>
  `);
}

if (
  req.method === "GET" &&
  ["/swagger-ui.css", "/swagger-ui-bundle.js"].includes(req.url)
) {
  const fileName = req.url.slice(1);

res.writeHead(HTTP_STATUS.OK, {
  "Content-Type": fileName.endsWith(".css")
    ? "text/css"
    : "application/javascript"
});

  return fs.createReadStream(
    path.join(swaggerPath, fileName)
  ).pipe(res);
}


if (req.method === "GET" && req.url === "/"){
    
    res.statusCode = HTTP_STATUS.OK;
    res.end("Welcome to Vynko's API");
    return;
}
else if (usersRouter.handle(req,res,url)){
return;
}

else if(postsRouter.handle(req,res, url)){
  return;
}

else {
    res.statusCode = HTTP_STATUS.NOT_FOUND;
    res.setHeader("Content-Type", "application/json");

    return res.end(JSON.stringify({
        error: "Route not found"
    }));
}
       


});



server.listen(PORT, () =>{
    console.log(`Server Running in http://localhost:${PORT}`);

});