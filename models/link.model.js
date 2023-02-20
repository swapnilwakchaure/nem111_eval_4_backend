const mongoose = require("mongoose");


const linkSchema = mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    device: { type: String, required: true },
    no_of_comments: { type: Number, required: true },
    userID: { type: String, required: false }
}, {
    versionKey: false
});



const LinkModel = mongoose.model("link", linkSchema);



module.exports = { LinkModel };