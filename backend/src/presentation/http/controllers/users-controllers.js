const { HTTP_STATUS } = require(
    "../../../common/constants/http-status"
);

function createUsersControllers(getUsersUseCase) {
    return {
        getUsers(req, res, url) {

            const id = url.searchParams.get("id");

            const result = getUsersUseCase.execute(id);

            res.setHeader(
                "Content-Type",
                "application/json"
            );

            if (id && !result) {
                res.statusCode = HTTP_STATUS.NOT_FOUND;

                return res.end(JSON.stringify({
                    error: "User not found"
                }));
            }

            res.statusCode = HTTP_STATUS.OK;

            return res.end(JSON.stringify(result));
        }
    };
}

module.exports = { createUsersControllers };