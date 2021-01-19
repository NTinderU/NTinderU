import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
	roomid: {
		type: String,
		required: [true, 'roomid field is required.']
    },
    user: {
		type: String,
		required: [true, 'user field is required.']
	},
	body: {
		type: String,
		required: [true, 'Body field is required.']
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})


const Message = model('messages', MessageSchema)
export default { Message, MessageSchema };