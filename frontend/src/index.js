import React from "react";
import ReactDOM from "react-dom";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

const httpLink = new HttpLink({
	uri: "https://ntinderu-backend.herokuapp.com/",
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
	uri: `ws://ntinderu-backend.herokuapp.com/graphql`,
	options: { reconnect: true },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
	// split based on operation type
	({ query }) => {
		const definition = getMainDefinition(query);
		return definition.kind === "OperationDefinition" && definition.operation === "subscription";
	},
	wsLink,
	httpLink
);

const client = new ApolloClient({
	link,
	cache: new InMemoryCache().restore(),
});
ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById("root")
);
