const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../models/user.model");

const userRouter = express.Router();



// -------------------- USER REGISTRATION POST REQUEST -------------------- //
userRouter.post("/register", async (request, response) => {
    const { name, email, gender, password, age, city } = request.body;

    try {
        const alumni = await UserModel.find({ email: email });
        if (alumni.length > 0) {
            response.send({ "Message": "User already exist, please login" });
        } else {
            bcrypt.hash(password, 5, async (error, hash) => {
                if (error) {
                    response.send({ "Message": "Cannot able to register the user data", "Error": error.message });
                } else {
                    const user = new UserModel({ name, email, gender, password: hash, age, city });
                    await user.save();
                    response.send({ "Message": "User Successfully Register! Please Log In" });
                }
            });
        }
    } catch (error) {
        response.send({ "Message": "Something went wrong! Please try again", "Error": error.message });
    }
});

// -------------------- USER LOGIN POST REQUEST -------------------- //
userRouter.post("/login", async (request, response) => {
    const { email, password } = request.body;

    try {
        const user = await UserModel.find({ email });
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (error, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, "auth", { expiresIn: 60 * 60 });
                    response.send({ "Message": "User Successfully Logged In", "Token": token });
                } else {
                    response.send({ "Message": "Incorrect Password! Please try again", "Error": error });
                }
            });
        } else {
            response.send({ "Message": "Incorrect Email Address", "Error": error });
        }
    } catch (error) {
        response.send({ "Message": "Cannot able to log in! Please try again", "Error": error.message });
    }
});



// response.send({ "Message": "", "Error": error.message });

module.exports = { userRouter };