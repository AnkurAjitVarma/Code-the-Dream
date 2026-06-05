const prisma = require("../prisma-client");

async function save(info, client = prisma) {
    const record = await client.user.create({
        data: info,
    });
    return record;
}

async function get(id, client = prisma) {
    const record = await prisma.user.findUnique({
        where: {
            id: id,
        }
    });
    return record;
}

module.exports = {
    save,
    get,
}
