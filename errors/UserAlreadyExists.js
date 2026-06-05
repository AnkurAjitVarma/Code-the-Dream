class UserAlreadyExists extends Error {
    constructor(email){
        super(`${email} already exists.`);
        this.user=email;
    }
}

module.exports = UserAlreadyExists;