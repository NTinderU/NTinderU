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
	liked: [String],
	matched: [String]
});

const User = model("Users", userSchema);

export default User;
