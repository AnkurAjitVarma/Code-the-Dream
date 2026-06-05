const prisma = require("../prisma-client");

async function save(credentials, client = prisma) {
    const { email, hash, id } = credentials;
    await client.credential.create({
        data: {
            email,
            hash,
            user_id: id,
        },
    });
}

async function get(email, client = prisma) {
    const record = await client.credential.findUnique({
        where: {
            email: email,
        }
    });
    return {
        email: record.email,
        hash: record.hash,
        id: record.user_id
    }
}

async function getWithUser(email, client = prisma) {
    const cred = await client.credential.findUnique({
        where: {
            email: email,
        },
        include: {
            user: true,
        }
    })
    return cred;
}

module.exports = {
    save,
    get,
    getWithUser,
}