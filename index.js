require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.set('strictQuery', true);

const { connection } = require("./configs/db.connect");
const { userRouter } = require("./routes/user.route");
const { linkRouter } = require("./routes/link.route");
const { authenticate } = require("./middlewares/auth.middleware");

const app = express();
app.use(express.json());
app.use(cors());


app.get("/", (request, response) => {
    response.send("Welcome to NEM111 Evaluation-4. LinkedIn Post App");
});

app.use("/users", userRouter);
app.use(authenticate);
app.use("/posts", linkRouter);



app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log(`Server is running at port ${process.env.port}`);
    } catch (error) {
        console.log('Cannot able to start the server', 'Error: ',error);
    }
});