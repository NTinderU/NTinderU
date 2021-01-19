const Query = {
	user: async (_, { username }, { User }) => await User.findOne({ username }),
	users: async (_, {}, { User }) => {
		const result = await User.find().sort({ username: 1 });
		for (var x of result)
			console.log(x)
		return result;
	},
	chatroom: async (_, { id }, { Chatroom }) => await Chatroom.findOne({ _id: id }),
	chatrooms: async (_, {}, { Chatroom }) => {
		const result = await Chatroom.find();
		return result;
	},
};


export default Query;
