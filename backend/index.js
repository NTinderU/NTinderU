import dotenv_defaults from "dotenv-defaults";
import { GraphQLServer, PubSub } from "graphql-yoga";
import Mongoose from "mongoose";

dotenv_defaults.config();

if (!process.env.MONGO_URL) {
	console.error("Missing MONGO_URL.");
	process.exit(1);
}

Mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = Mongoose.connection;

db.on("error", (error) => console.error(error));

db.once("open", () => {
	console.log("server connected.");
	const server = new GraphQLServer({
		schema: "./schema.graphql",
		resolvers: {},
		context: { Model, PubSub },
	});

	const PORT = process.env.PORT || 4000;

	server.start({ port: PORT }, () => console.log(`server runs at port ${PORT}.`));
});
