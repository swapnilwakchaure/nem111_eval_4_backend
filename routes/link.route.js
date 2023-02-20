const express = require("express");

const linkRouter = express.Router();

const { LinkModel } = require("../models/link.model");


// -------------------- LINKDIN DATA GET REQUEST -------------------- //
linkRouter.get("/", async (request, response) => {
    const query = request.query;

    try {
        const data = await LinkModel.find(query);
        response.send(data);
    } catch (error) {
        response.send({ "Message": "Cannot able to get the linkedIn data", "Error": error.message });
    }
});

// -------------------- LINKDIN DATA POST REQUEST -------------------- //
linkRouter.post("/addpost", async (request, response) => {
    const body = request.body;

    try {
        const post = new LinkModel(body);
        await post.save();
        response.send({ "Message": "User Successfully Post" });
    } catch (error) {
        response.send({ "Message": "Cannot able to post", "Error": error.message });
    }
});

// -------------------- LINKDIN DATA PATCH REQUEST -------------------- //
linkRouter.patch("/update/:id", async (request, response) => {
    const ID = request.params.id;
    const payload = request.body;

    try {
        await LinkModel.findByIdAndUpdate({ _id: ID }, payload);
        response.send({ "Message": `Successfully updated post of id: ${ID}` });
    } catch (error) {
        response.send({ "Message": `Cannot able to update the post of id: ${ID}`, "Error": error.message });
    }
});

// -------------------- LINKDIN DATA DELETE REQUEST -------------------- //
linkRouter.delete("/delete/:id", async (request, response) => {
    const ID = request.params.id;

    try {
        await LinkModel.findByIdAndDelete({ _id: ID });
        response.send({ "Message": `Successfully deleted post data of id: ${ID}` });
    } catch (error) {
        response.send({ "Message": `Cannot able to get the post data of id: ${ID}`, "Error": error.message });
    }
});



module.exports = { linkRouter };