const express = require("express");
const userRoutes = require("./routes/userRoutes");
const prisma = require("./prisma-client");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.use("/user", userRoutes);

app.use(errorHandler);


app.listen(3000, () => {
    console.log("Listening on port 3000.")
})

async function shutdown(){
    console.log("Shutting down...");
    await prisma.$disconnect();
    process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);