
const Subscription = {
  message: {
    subscribe(parent, { username }, { pubsub }, info) {
      return pubsub.asyncIterator(`message about ${username}`);
    },
  },
};

export default Subscription;
