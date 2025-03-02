import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {type: String, required: true },
    receiver: {type: String, required: true},
    body: {type: String, required: true}
},{ timestamps: true })

export const Message = mongoose.model('Message', messageSchema)