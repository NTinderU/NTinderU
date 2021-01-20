import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
<<<<<<< HEAD
    from: {
      type: String,
      required: [true, "user field is required"]
    },
    to: {
        type: String,
        required: [true, "user field is required."],
    },
    body: {
        type: String,
        required: [true, "Body field is required."],
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Message = model("messages", MessageSchema);
=======
	from: {
		type: String,
		required: [true, "user field is required"],
	},
	to: {
		type: String,
		required: [true, "user field is required."],
	},
	body: {
		type: String,
		required: [true, "Body field is required."],
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
});

const Message = model("messages", MessageSchema);

>>>>>>> ebcfde161580cfba85ba57029f14c3dcd6a84d35
export default { Message, MessageSchema };
