const userRepo = require("../repositories/userRepo");
const credRepo = require("../repositories/credRepo");
const bcrypt = require("bcrypt");
const { Prisma } = require("@prisma/client");
const UserAlreadyExists = require("../errors/UserAlreadyExists");

const prisma = require("../prisma-client");

async function createUser({ first_name, last_name, email, password }) {
    try {
        const hash = await bcrypt.hash(password, 10);
        return await prisma.$transaction(async (tx) => {
            const record = await userRepo.save({
                first_name,
                last_name,
                email,
            }, tx);
            const credential = {
                email,
                hash,
                id: record.id,
            }
            await credRepo.save(credential, tx);
            return record;
        });

    }
    catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                throw new UserAlreadyExists(email);
            }
        }
        throw err;
    }
}

async function authenticateUser(email, password) {
    const credential = await credRepo.getWithUser(email);
    if (!credential) {
        return null;
    }
    const match = await bcrypt.compare(password, credential.hash);
    if (!match) {
        return null;
    }
    return credential.user;
}

module.exports = {
    createUser,
    authenticateUser,
}