
const { HTTP_STATUS } = require(
    "../../../common/constants/http-status"
);

function createPostController(getPostsUseCase, createPostUseCase) {

    return {

        getPosts(req, res, url) {

            const userId = url.searchParams.get("user_id");

            const posts = getPostsUseCase.execute(userId);

            res.statusCode = HTTP_STATUS.OK;
            res.setHeader(
                "Content-Type",
                "application/json; charset=utf-8"
            );

            return res.end(JSON.stringify(posts));
        },

        
        createPost(req, res) {

            let body = "";

            req.on("data", (chunk) => {
                body += chunk.toString();
            });

            req.on("end", () => {

                let postData;

                try {
                    postData = JSON.parse(body);

                } catch (error) {

                    res.statusCode = HTTP_STATUS.BAD_REQUEST;

                    res.setHeader(
                        "Content-Type",
                        "application/json; charset=utf-8"
                    );

                    return res.end(JSON.stringify({
                        error: "JSON invalid"
                    }));
                }

                const result = createPostUseCase.execute(postData);

                if (!result.success) {

                    res.statusCode = HTTP_STATUS.BAD_REQUEST;

                    res.setHeader(
                        "Content-Type",
                        "application/json; charset=utf-8"
                    );

                    return res.end(JSON.stringify({
                        error: result.error
                    }));
                }

                
                res.statusCode = HTTP_STATUS.CREATED;

                res.setHeader(
                    "Content-Type",
                    "application/json; charset=utf-8"
                );

                return res.end(JSON.stringify(result.data));

            });
        }
    };
}

module.exports = { createPostController };
