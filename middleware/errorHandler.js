const { StatusCodes } = require("http-status-codes");
const UserAlreadyExists = require("../errors/UserAlreadyExists");

const errorHandler = (err, req, res, next) => {
    if (err instanceof UserAlreadyExists) {
        res.status(StatusCodes.CONFLICT).json({
            error: {
                message: `${err.user} already exists.`,
            }
        });
        return;
    }
    console.log(err);
    next(err);
}

module.exports = errorHandler;