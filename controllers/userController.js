const { StatusCodes } = require("http-status-codes");
const { createUserSchema } = require("../schemas/userSchema");
const UserAlreadyExists = require("../errors/UserAlreadyExists");

const userService = require("../service/userService");

const createUser = async (req, res) => {
    const { error, value } = createUserSchema.validate(req.body, {
        presence: 'required',
    });
    if (error) {
        res.status(StatusCodes.BAD_REQUEST).end();
        return;
    }
    const record = await userService.createUser(req.body);
    res.status(StatusCodes.OK).json(record);
};

const getUser = async (req, res) => {
    res.status(StatusCodes.OK).json(req.principal);
};

module.exports = {
    createUser,
    getUser,
}