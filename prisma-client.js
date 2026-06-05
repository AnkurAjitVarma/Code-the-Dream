const { PrismaClient } = require("@prisma/client")
const config = require("./config");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({
    connectionString: config.connection_string,
});

const prisma = new PrismaClient({
    adapter,
});

module.exports = prisma;

