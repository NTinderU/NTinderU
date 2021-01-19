import React from "react";
import ReactDOM from "react-dom";
import { HttpLink } from "@apollo/client/link/http";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

const link = new HttpLink({ uri: "http://localhost:4000" });

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
