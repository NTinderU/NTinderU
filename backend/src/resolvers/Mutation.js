import User from "../models/User";

const Mutation = {
    createUser: async (parent, { data }, { User }) => {
        let user = await User.findOne(data);
        if (!user) {
            data.rooms = [];
            console.log(data);
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
    createChatroom: async (parent, { data }, { User, Chatroom }) => {
		let room = new Chatroom(data);
        let un1 = data.users[0],
            un2 = data.users[1];
        let u1 = await User.findOne({ username: un1 }),
            u2 = await User.findOne({ username: un2 });
        if (!u1 || !u2) {console.log("idky"); return null;}
        if (u1.rooms.get(un2) && u2.rooms.get(un1)) {
			room._id = u1.rooms.get(un2);
			return room;
		}
        await room.save();
        await u1.rooms.set(un2, room._id);
        await u2.rooms.set(un1, room._id);
        await u1.save();
        await u2.save();
        return room;
    },
    createMessage: async (parent, { id, data }, { Chatroom, Message, pubsub }) => {
        let room = await Chatroom.findOne({ _id: id });
        if (!room) return null;
        data.timestamp = Date.now();
        // to obtain human readable format
        // let d = new Date(data.timestamp);
        // console.log(d.toLocaleString("zh-TW"));
        await room.updateOne({ $push: { messages: data } });
        await room.save();
        // pubsub.publish(`message about ${data.from}`, {
        //     message: { mutation: "CREATED", data: data },
        // });
        pubsub.publish(`message about ${data.to}`, {
            message: { mutation: "CREATED", data: data },
        });
        return data;
    },
};

export default Mutation;
