import React, { useContext } from "react";
import ContextStore from "../ContextStore";

const ChatPage = () => {
	const { loggedInUser } = useContext(ContextStore);
	return <h1>Logged in User: {loggedInUser}</h1>;
};

export default ChatPage;
