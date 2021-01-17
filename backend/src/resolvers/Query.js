"use strict";
const Query = {
	users: async (_, {}, { User }) => {
		const result = await User.find().sort({ username: 1 });
		return result.map((e) => e.username);
	},
	user: async (_, { username }, { User }) => {
		const result = await User.findOne({ username });
		return result ? result.username : null;
	},
};

export default Query;
