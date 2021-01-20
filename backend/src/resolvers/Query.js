import { randomShuffle } from "../utils/utils";

const Query = {
	user: async (parent, { username }, { User }) => await User.findOne({ username }),
	users: async (parent, {}, { User }) => {
		const result = await User.find().sort({ username: 1 });
		for (var x of result) console.log(x);
		return result;
	},
	chatroom: async (parent, { id }, { Chatroom }) => await Chatroom.findOne({ _id: id }),
	chatrooms: async (parent, {}, { Chatroom }) => {
		const result = await Chatroom.find();
		return result;
	},
	match: async (parent, { data: { username, max_count } }, { User }) => {
		const self = await User.findOne({ username: username });
		const notMatchedFilter = { username: { $nin: self.matched } };
		const notSelfFilter = { username: { $ne: username } };
		// except the calling one
		const others = await User.find({ $and: [notSelfFilter, notMatchedFilter] });
		return randomShuffle(others, max_count);
	},
};


export default Query;
