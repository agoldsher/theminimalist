const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    peopleInChat: {
        type: Array,
        required: true
    },
    messages: {
        type: Array,
        required: true
    }
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;