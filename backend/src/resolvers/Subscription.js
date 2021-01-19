const Subscription = {
	message: {
		subscribe(parent, { username }, { pubsub }) {
			return pubsub.asyncIterator(`message about ${username}`);
		},
	},
};

export default Subscription;
