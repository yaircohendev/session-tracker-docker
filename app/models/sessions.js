const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sessionSchema = new Schema({
        _id: String,
        sessionDate: String,
        sessions: [{
            type: {
                type: String,
                required: true,
            },
            x: {
                type: Number,
                required: true,
            },
            y: {
                type: Number,
                required: true,
            },
            time_stamp: {
                type: Number,
                required: true
            }
        }]
    })
const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
