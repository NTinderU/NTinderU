const Query = {
	user: async (_, { username }, { User }) => await User.findOne({ username }),
	users: async (_, {}, { User }) => {
		const result = await User.find().sort({ username: 1 });
		return result;
	},
};

export default Query;
