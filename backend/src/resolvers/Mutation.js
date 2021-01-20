const Mutation = {
	createUser: async (parent, { data }, { User }) => {
		let user = await User.findOne(data);
		if (!user) {
			user = new User(data);
			await user.save();
			return user;
		} else return null;
	},
	deleteUser: async (parent, { data }, { User }) => {
		const user = await User.findOne(data);
		if (user) await User.deleteOne(data);
		return user;
	},
};

export default Mutation;
