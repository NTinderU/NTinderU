import { Schema, model } from "mongoose";
import { MessageSchema } from "./Message";

const chatroomSchema = new Schema({
	users: {
		type: [String],
<<<<<<< HEAD
		required: [true, 'users are required']
	},
	messages: {
        type: [MessageSchema],
        required: [false]
    }
})

const Chatroom = model('chatrooms', chatroomSchema)
export default Chatroom;
=======
		required: [true, "users are required"],
	},
	messages: {
		type: [MessageSchema],
		required: [false],
	},
});

const Chatroom = model("chatrooms", chatroomSchema);

export default Chatroom;
>>>>>>> ebcfde161580cfba85ba57029f14c3dcd6a84d35
