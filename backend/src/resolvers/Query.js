import {randomShuffle} from "../utils/utils"

const Query = {
	user: async (_, { username }, { User }) => await User.findOne({ username }),
	users: async (_, {}, { User }) => {
		const result = await User.find().sort({ username: 1 });
		return result;
	},
	match: async (_, {data:{username, max_count}}, {User}) => {
		const self = await User.findOne({username:username})
		const notMatchedFilter = {username:{$nin: self.matched}}
		const notSelfFilter = {username:{$ne:username}}
		const others = await User.find({$and: [notSelfFilter, notMatchedFilter]}) // except the calling one
		return randomShuffle(others, max_count)
	}
};

export default Query;
