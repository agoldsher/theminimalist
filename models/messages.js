    
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    }
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;