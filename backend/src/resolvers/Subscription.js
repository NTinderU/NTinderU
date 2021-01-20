<<<<<<< HEAD

const Subscription = {
  message: {
    subscribe(parent, { username }, { pubsub }, info) {
      return pubsub.asyncIterator(`message about ${username}`);
    },
  },
=======
const Subscription = {
	message: {
		subscribe(parent, { username }, { pubsub }) {
			return pubsub.asyncIterator(`message about ${username}`);
		},
	},
>>>>>>> ebcfde161580cfba85ba57029f14c3dcd6a84d35
};

export default Subscription;
