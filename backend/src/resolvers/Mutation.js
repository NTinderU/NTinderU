const Mutation = {
	createUser: async (parent, { data }, { User }) => {
		let user = await User.findOne(data);
		if (!user) {
			data.liked=[]
			data.matched=[]
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
	addLikedUser: async (_, {data:{username, target}}, {User}) => {
		await User.updateOne({username: username}	// update Target
					,{$addToSet: {liked: target}},
					(err,_)=> {if(err)console.error(err)})
		const updated = User.findOne({username:username})
		return updated
	}
};

export default Mutation;
