const { StatusCodes } = require("http-status-codes");

const userService = require("../service/userService");

const basicAuth = async (req, res, next) => {
    const header = req.headers.authorization;
    const [type, base64String] = header.split(" ");
    if (type !== "Basic") {
        res.status(StatusCodes.UNAUTHORIZED).end();
        return;
    }
    const decoded = Buffer.from(base64String, "base64").toString("utf-8");
    const [email, password] = decoded.split(":");

    const principal = await userService.authenticateUser(email, password);
    if (!principal) {
        res.status(StatusCodes.UNAUTHORIZED).end();
        return;
    }
    req.principal = principal;
    next();
};

module.exports = basicAuth;