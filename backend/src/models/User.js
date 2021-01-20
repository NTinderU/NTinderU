import { Schema, model } from "mongoose";

const userSchema = new Schema({
	username: {
		type: String,
		required: [true, "Username field is required."],
	},
	password: {
		type: String,
		required: [true, "Password field is required."],
	},
<<<<<<< HEAD
=======
	liked: [String],
	matched: [String],
>>>>>>> ebcfde161580cfba85ba57029f14c3dcd6a84d35
	rooms: {
		type: Map,
		of: String,
		required: [false],
<<<<<<< HEAD
		default: []
	}
=======
		default: [],
	},
>>>>>>> ebcfde161580cfba85ba57029f14c3dcd6a84d35
});

const User = model("Users", userSchema);

export default User;
